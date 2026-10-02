$ErrorActionPreference = 'SilentlyContinue'
$BASE = 'http://localhost:8081/api'
$RESULTS = [System.Collections.ArrayList]::new()

function Api($method, $path, $body, $token) {
  try {
    $p = @{ Uri = "$BASE$path"; Method = $method; TimeoutSec = 20; UseBasicParsing = $true }
    if ($null -ne $body) { $p.Body = ($body | ConvertTo-Json -Depth 8); $p.ContentType = 'application/json' }
    if ($token) { $p.Headers = @{ Authorization = "Bearer $token" } }
    $r = Invoke-WebRequest @p -ErrorAction Stop
    return @{ s = [int]$r.StatusCode; b = $r.Content }
  } catch {
    $resp = $_.Exception.Response
    if ($resp) {
      try { $sr = New-Object IO.StreamReader($resp.GetResponseStream()); $t = $sr.ReadToEnd() } catch { $t = '' }
      return @{ s = [int]$resp.StatusCode; b = $t }
    }
    return @{ s = 0; b = $_.Exception.Message }
  }
}
function J($txt) { try { return ($txt | ConvertFrom-Json) } catch { return $null } }
function T($id, $desc, $ok, $detail) {
  $st = if ($ok) { 'PASS' } else { 'FAIL' }
  [void]$RESULTS.Add([pscustomobject]@{ ID = $id; DESC = $desc; RESULT = $st; DETAIL = $detail })
  Write-Output ("{0} [{1}] {2} - {3}" -f $id, $st, $desc, $detail)
}

# ============ A1 AUTENTICACION ============
$adm = J ((Api POST '/auth/login' @{ email = 'admin@astrosetups.com'; password = 'Admin123*' }).b)
$cli = J ((Api POST '/auth/login' @{ email = 'cliente@astrosetups.com'; password = 'Cliente123*' }).b)
$TOK = $adm.token; $CTOK = $cli.token
T 'A1.1' 'Login admin 200 + role ADMIN' (($adm.token) -and ($adm.user.role -eq 'ADMIN')) "role=$($adm.user.role)"
T 'A1.2' 'Login cliente 200' ([bool]$CTOK) "len=$($CTOK.Length)"
$resp = Api POST '/auth/login' @{ email = 'admin@astrosetups.com'; password = 'mala' }
T 'A1.3' 'Login password incorrecta -> 401' ($resp.s -eq 401) "status=$($resp.s)"
$ts = Get-Random -Maximum 99999
$qaEmail = "qatest$ts@test.com"
$resp = Api POST '/auth/register' @{ firstName = 'Qa'; lastName = 'Test'; email = $qaEmail; phone = '3001234567'; password = 'QaTest123' }
$qaUser = J $resp.b
T 'A1.4' 'Registro usuario QA -> 2xx' ($resp.s -in 200,201) "status=$($resp.s)"
$resp2 = Api POST '/auth/register' @{ firstName = 'Qa'; lastName = 'Test'; email = $qaEmail; phone = '3001234567'; password = 'QaTest123' }
T 'A1.5' 'Registro duplicado -> 4xx (DEFECTO M1 si 500)' ($resp2.s -ge 400 -and $resp2.s -lt 500) "status=$($resp2.s)"
$resp = Api GET '/auth/me' $null $TOK
T 'A1.6' 'GET /auth/me con token admin' ($resp.s -eq 200) "status=$($resp.s)"

# ============ A2 CATALOGO PUBLICO ============
$resp = Api POST '/catalog/products/_search' @{ page = 0; size = 5 }
$j = J $resp.b
T 'A2.1' 'Products search publico total>=112' ($resp.s -eq 200 -and $j.totalElements -ge 112) "status=$($resp.s) total=$($j.totalElements)"
$resp2 = Api POST '/catalog/products/_search' @{ page = 0; size = 50; active = $false }
$j2 = J $resp2.b
$inactive = @($j2.content | Where-Object { $_.active -eq $false }).Count
T 'A2.2' 'Publico NO ve inactivos' ($resp2.s -eq 200 -and $inactive -eq 0) "status=$($resp2.s) inactivos=$inactive"
$resp = Api POST '/catalog/products/_search' @{ page = 0; size = 5; query = 'tarjeta' }
$j = J $resp.b
T 'A2.3' 'Busqueda query=tarjeta con resultados' ($resp.s -eq 200 -and $j.totalElements -gt 0) "status=$($resp.s) total=$($j.totalElements)"
$resp = Api POST '/catalog/products/_search' @{ page = 0; size = 50; hasDiscount = $true }
$j = J $resp.b
T 'A2.4' 'Filtro hasDiscount >= 12' ($resp.s -eq 200 -and $j.totalElements -ge 12) "status=$($resp.s) total=$($j.totalElements)"
$first = (J (Api POST '/catalog/products/_search' @{ page = 0; size = 1 }).b).content[0]
$resp = Api GET "/catalog/products/$($first.id)"
T 'A2.5' 'Detalle de producto' ($resp.s -eq 200) "status=$($resp.s) id=$($first.id)"
$resp = Api GET "/catalog/products/$($first.id)/related"
T 'A2.6' 'Productos relacionados' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api GET '/catalog/categories'
$cats = J $resp.b
$catId = if ($cats -is [array]) { $cats[0].id } else { $cats.id }
T 'A2.7' 'Listado de categorias' ($resp.s -eq 200 -and $catId) "status=$($resp.s) catId=$catId"

# ============ A3 CHECKOUT / PEDIDOS ============
$gAddr = @{ address = 'Calle QA 123'; city = 'Bogota'; postalCode = '110111'; country = 'Colombia'; department = 'Cundinamarca' }
$guest = @{ fullName = 'Cliente QA'; email = $qaEmail; phone = '3009998877'; shippingAddress = 'Calle QA 123'; city = 'Bogota'; postalCode = '110111' }
$orderBody = @{ guestUser = $guest; guestShippingAddress = $gAddr; paymentMethod = 'CASH_ON_DELIVERY'; orderItems = @(@{ productId = $first.id; quantity = 1 }) }
$resp = Api POST '/sales/orders' $orderBody
T 'A3.1' 'Checkout SIN token -> DEFECTO B1 si 403' ($resp.s -in 200,201) "status=$($resp.s)"
$resp = Api POST '/sales/orders' $orderBody $TOK
$ord = J $resp.b
T 'A3.2' 'Checkout CON token + guestShippingAddress -> 2xx' ($resp.s -in 200,201 -and $ord.id) "status=$($resp.s) orderId=$($ord.id)"
$resp = Api GET "/sales/orders/$($ord.id)" $null $TOK
T 'A3.3' 'Detalle del pedido creado (admin)' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api POST '/sales/orders' @{ guestUser = $guest; guestShippingAddress = $gAddr; paymentMethod = 'CASH_ON_DELIVERY'; orderItems = @(@{ productId = 999999; quantity = 1 }) } $TOK
T 'A3.4' 'Pedido con producto inexistente -> 4xx' ($resp.s -ge 400 -and $resp.s -lt 500) "status=$($resp.s)"

# ============ A4 PROMOS PUBLICAS ============
$resp = Api POST '/promotions/codes/validate' @{ promoCode = 'ASTRO15'; cartItems = @(@{ unitPrice = 100000; quantity = 1 }); hasDiscountedProducts = $false }
$j = J $resp.b
T 'A4.1' 'Validate ASTRO15 (body correcto)' ($resp.s -eq 200 -and $j.valid -eq $true) "status=$($resp.s) valid=$($j.valid)"
$resp = Api POST '/promotions/codes/validate' @{ promoCode = 'NOEXISTE999'; cartItems = @(@{ unitPrice = 100000; quantity = 1 }); hasDiscountedProducts = $false }
$j = J $resp.b
T 'A4.2' 'Validate codigo inexistente -> invalido' ($resp.s -eq 200 -and $j.valid -eq $false) "status=$($resp.s) valid=$($j.valid)"

# ============ A5 ADMIN CATALOGO ============
$resp = Api POST '/catalog/products' @{ name = 'QA Producto Test'; description = 'Producto de prueba QA'; price = 99900; categoryId = $catId; stock = 5; active = $false } $TOK
$qp = J $resp.b
T 'A5.1' 'Crear producto QA inactivo' ($resp.s -in 200,201 -and $qp.id) "status=$($resp.s) id=$($qp.id)"
$resp = Api POST '/catalog/products/_search' @{ page = 0; size = 50; active = $false } $TOK
$j = J $resp.b
$ina = @($j.content | Where-Object { $_.active -eq $false }).Count
T 'A5.2' 'Admin ve inactivos con active=false' ($resp.s -eq 200 -and $ina -gt 0) "status=$($resp.s) inactivos=$ina"
$resp = Api PUT "/catalog/products/$($qp.id)" @{ name = 'QA Producto Test v2'; price = 109900; categoryId = $catId; stock = 7; active = $true } $TOK
T 'A5.3' 'Actualizar producto QA' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api POST '/catalog/products/_search' @{ page = 0; size = 5; query = 'QA Producto' } $TOK
$j = J $resp.b
T 'A5.4' 'Producto QA visible en search' ($resp.s -eq 200 -and $j.totalElements -ge 1) "total=$($j.totalElements)"
$resp = Api DELETE "/catalog/products/$($qp.id)" $TOK
T 'A5.5' 'Eliminar producto QA' ($resp.s -in 200,204) "status=$($resp.s)"
$resp = Api DELETE '/catalog/products/999999' $TOK
T 'A5.6' 'Eliminar producto inexistente -> 404' ($resp.s -eq 404) "status=$($resp.s)"

# ============ A6 ADMIN PEDIDOS ============
$resp = Api POST '/sales/orders/search' @{ page = 0; size = 10 } $TOK
$j = J $resp.b
T 'A6.1' 'Orders search total>=25' ($resp.s -eq 200 -and $j.totalElements -ge 25) "status=$($resp.s) total=$($j.totalElements)"
$resp = Api POST '/sales/orders/search' @{ page = 0; size = 10; status = 'PENDING' } $TOK
$j = J $resp.b
$pend = @($j.orders | Where-Object { $_.status -eq 'PENDING' }).Count
T 'A6.2' 'Filtro status=PENDING' ($resp.s -eq 200 -and ($j.totalElements -eq 0 -or $pend -gt 0)) "total=$($j.totalElements) pendientes=$pend"
$pendId = ($j.orders | Where-Object { $_.status -eq 'PENDING' } | Select-Object -First 1).id
$resp = Api PUT "/sales/orders/$pendId/status" @{ status = 'IN_PREPARATION'; observation = 'QA test' } $TOK
T 'A6.3' "Transicion pedido #$pendId PENDING->IN_PREPARATION" ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api GET '/sales/stats' $TOK
$j = J $resp.b
T 'A6.4' 'Sales stats 200' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api GET '/sales/stats/series?period=7d' $TOK
$j = J $resp.b
T 'A6.5' 'Serie 7d con 7 puntos' ($resp.s -eq 200 -and $j.points.Count -eq 7) "status=$($resp.s) points=$($j.points.Count)"

# ============ A7 ADMIN CLIENTES ============
$resp = Api POST '/customers/_search' @{ page = 0; size = 10 } $TOK
$j = J $resp.b
T 'A7.1' 'Customers search total>=18' ($resp.s -eq 200 -and $j.totalElements -ge 18) "status=$($resp.s) total=$($j.totalElements)"
$resp = Api POST '/customers/_search' @{ page = 0; size = 10; role = 'ADMIN' } $TOK
$j = J $resp.b
$admins = @($j.content | Where-Object { $_.role -eq 'ADMIN' }).Count
T 'A7.2' 'Filtro role=ADMIN' ($resp.s -eq 200 -and $admins -gt 0) "admins=$admins"
$resp = Api GET '/customers/stats' $TOK
$j = J $resp.b
T 'A7.3' 'Customer stats' ($resp.s -eq 200 -and $j.totalCustomers -ge 18) "status=$($resp.s) total=$($j.totalCustomers)"
$resp = Api GET '/customers/101/profile' $TOK
T 'A7.4' 'Perfil cliente 101' ($resp.s -eq 200) "status=$($resp.s)"
$qaId = $qaUser.user.id
$resp = Api PUT "/customers/$qaId" @{ status = 'INACTIVE' } $TOK
$resp2 = Api PUT "/customers/$qaId" @{ status = 'ACTIVE' } $TOK
T 'A7.5' 'Toggle estado cliente QA' ($resp.s -eq 200 -and $resp2.s -eq 200) "put1=$($resp.s) put2=$($resp2.s)"

# ============ A8 ADMIN PROMOS ============
$resp = Api POST '/promotions/codes/search' @{ page = 0; size = 20 } $TOK
$j = J $resp.b
T 'A8.1' 'Promo search total>=6' ($resp.s -eq 200 -and $j.totalElements -ge 6) "status=$($resp.s) total=$($j.totalElements)"
$resp = Api GET '/promotions/codes/stats' $TOK
T 'A8.2' 'Promo stats 200' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api POST '/promotions/codes' @{ code = "QATEST$ts"; discountType = 'PERCENTAGE'; discountValue = 10; remainingUses = 5; active = $true } $TOK
T 'A8.3' 'Crear promo QA' ($resp.s -in 200,201) "status=$($resp.s)"
$resp = Api PUT "/promotions/codes/QATEST$ts" @{ discountValue = 15 } $TOK
T 'A8.4' 'Actualizar promo QA' ($resp.s -eq 200) "status=$($resp.s)"
$resp = Api DELETE "/promotions/codes/QATEST$ts" $TOK
T 'A8.5' 'Eliminar promo QA' ($resp.s -in 200,204) "status=$($resp.s)"

# ============ A9 GUARDS ============
$resp = Api POST '/customers/_search' @{ page = 0; size = 1 }
T 'A9.1' 'Sin token -> 401/403' ($resp.s -in 401,403) "status=$($resp.s)"
$resp = Api POST '/customers/_search' @{ page = 0; size = 1 } $CTOK
T 'A9.2' 'Token CLIENT en endpoint admin -> 403' ($resp.s -eq 403) "status=$($resp.s)"
$resp = Api GET '/sales/stats' $CTOK
T 'A9.3' 'Token CLIENT en /sales/stats -> 403' ($resp.s -eq 403) "status=$($resp.s)"
$resp = Api DELETE '/catalog/products/1' $CTOK
T 'A9.4' 'Token CLIENT borrando producto -> 403' ($resp.s -eq 403) "status=$($resp.s)"
$resp = Api GET '/sales/stats/series?period=7d'
T 'A9.5' 'Serie sin token -> 401/403' ($resp.s -in 401,403) "status=$($resp.s)"

# ============ A10 CORS ============
try {
  $r = Invoke-WebRequest -Uri "$BASE/catalog/categories" -Method Options -Headers @{ Origin = 'http://localhost:5173'; 'Access-Control-Request-Method' = 'GET' } -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
  $acao = $r.Headers['Access-Control-Allow-Origin']
  T 'A10.1' 'CORS preflight desde localhost:5173' ($r.StatusCode -in 200,204 -and $acao) "status=$($r.StatusCode) ACAO=$acao"
} catch {
  $resp = $_.Exception.Response
  $acao = if ($resp) { $resp.Headers['Access-Control-Allow-Origin'] } else { '' }
  $s = if ($resp) { [int]$resp.StatusCode } else { 0 }
  T 'A10.1' 'CORS preflight desde localhost:5173' ($s -in 200,204 -and $acao) "status=$s ACAO=$acao"
}

# ============ LIMPIEZA ============
$resp = Api PUT "/customers/$qaId" @{ status = 'DELETED' } $TOK
if ($resp.s -ne 200) { Write-Output "CLEANUP: usuario QA $qaId status=$($resp.s) (queda como dato QA)" }
$old = Api POST '/promotions/codes/search' @{ page = 0; size = 50 } $TOK
$oldCodes = (J $old.b).content | Where-Object { $_.code -like 'QATEST*' }
foreach ($c in $oldCodes) { $d = Api DELETE "/promotions/codes/$($c.code)" $TOK; Write-Output "CLEANUP promo $($c.code): $($d.s)" }
$p113 = Api DELETE '/catalog/products/113' $TOK
Write-Output "CLEANUP producto 113: $($p113.s)"

# ============ RESUMEN ============
$pass = @($RESULTS | Where-Object { $_.RESULT -eq 'PASS' }).Count
$fail = @($RESULTS | Where-Object { $_.RESULT -eq 'FAIL' }).Count
Write-Output ''
Write-Output "===== RESUMEN SUITE A: $pass PASS / $fail FAIL (total $($RESULTS.Count)) ====="
$RESULTS | Where-Object { $_.RESULT -eq 'FAIL' } | ForEach-Object { Write-Output "FAILED: $($_.ID) $($_.DESC) => $($_.DETAIL)" }
$RESULTS | Export-Csv -Path "$env:TEMP\opencode\suite-a-results.csv" -NoTypeInformation -Encoding UTF8
