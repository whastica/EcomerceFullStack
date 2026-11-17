# ============================================================
# Import del dump completo a TiDB Cloud Starter (MySQL-compat)
# Uso:
#   .\import-tidb.ps1 -TiDBHost gateway01.xxxx.prod.aws.tidbcloud.com `
#                     -User "xxxxxx.root" -DbPassword "<password>"
#   (opcional) -Database astrosetupsdb  -Port 4000  -CaPath .\isrgrootx1.pem
#
# TiDB exige TLS. Con -CaPath usa --ssl-mode=VERIFY_CA (verificado);
# sin -CaPath usa --ssl-mode=REQUIRED (cifrado sin verificar CA).
# El usuario de TiDB INCLUYE prefijo de cluster (ej. ab12cd34.root) - usar tal cual.
# ============================================================
param(
    [Parameter(Mandatory = $true)]
    [string]$TiDBHost,           # host tipo gateway01.<region>.prod.aws.tidbcloud.com

    [Parameter(Mandatory = $true)]
    [string]$User,               # usuario con prefijo, ej. ab12cd34.root

    [Parameter(Mandatory = $true)]
    [string]$DbPassword,         # password generado en TiDB Console

    [int]$Port = 4000,
    [string]$Database = "astrosetupsdb",
    [string]$CaPath = "",        # ruta a ISRG Root X1 (letsencrypt) para VERIFY_CA
    [string]$MysqlExe = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"
)

$ErrorActionPreference = "Stop"
$dump = Join-Path $PSScriptRoot "astrosetups_full_dump.sql"

if (-not (Test-Path $MysqlExe)) { throw "mysql.exe no encontrado en $MysqlExe" }
if (-not (Test-Path $dump))     { throw "Dump no encontrado en $dump" }

$env:MYSQL_PWD = $DbPassword   # password fuera de la linea de comandos

$sslArgs = @("--ssl-mode=REQUIRED")
$sslText = "--ssl-mode=REQUIRED"
if ($CaPath -ne "") {
    if (-not (Test-Path $CaPath)) { throw "CA no encontrado en $CaPath" }
    $sslArgs = @("--ssl-mode=VERIFY_CA", "--ssl-ca=$CaPath")
    $sslText = "--ssl-mode=VERIFY_CA --ssl-ca=`"$CaPath`""
}

try {
    Write-Host "==> Creando schema si no existe: ${TiDBHost}:${Port}/$Database ..."
    & $MysqlExe -h $TiDBHost -P $Port -u $User @sslArgs --default-character-set=utf8mb4 `
        -e "CREATE DATABASE IF NOT EXISTS $Database DEFAULT CHARACTER SET utf8mb4;"
    if ($LASTEXITCODE -ne 0) { throw "CREATE DATABASE fallo (revisa host/usuario/TLS)" }

    Write-Host "==> Importando dump a ${TiDBHost}:${Port}/$Database ..."
    $cmd = "`"$MysqlExe`" -h $TiDBHost -P $Port -u $User $sslText --default-character-set=utf8mb4 $Database < `"$dump`""
    cmd /c $cmd
    if ($LASTEXITCODE -ne 0) { throw "Import fallo con exit code $LASTEXITCODE (ver 'Solucion de problemas' en docs/DEPLOY-VERCEL.md)" }

    Write-Host "==> Verificando conteos..." -ForegroundColor Green
    $verify = @"
SELECT
  (SELECT COUNT(*) FROM users)           AS users,
  (SELECT COUNT(*) FROM products)        AS products,
  (SELECT COUNT(*) FROM categories)      AS categories,
  (SELECT COUNT(*) FROM orders)          AS orders,
  (SELECT COUNT(*) FROM order_items)     AS order_items,
  (SELECT COUNT(*) FROM promo_codes)     AS promo_codes,
  (SELECT COUNT(*) FROM cities)          AS cities,
  (SELECT COUNT(*) FROM postal_codes)    AS postal_codes;
SELECT user_id, email, role, status FROM users WHERE email LIKE '%@astrosetups.com' ORDER BY user_id;
"@
    & $MysqlExe -h $TiDBHost -P $Port -u $User @sslArgs --default-character-set=utf8mb4 $Database -e $verify
    if ($LASTEXITCODE -ne 0) { throw "Verificacion fallo" }
    Write-Host "==> Import OK" -ForegroundColor Green
}
finally {
    Remove-Item Env:\MYSQL_PWD -ErrorAction SilentlyContinue
}
