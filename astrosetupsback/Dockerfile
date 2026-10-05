# ============================================================
# Astro Setups Backend - Multi-stage build
# Stage 1: build con Maven (caché de dependencias por capa)
# Stage 2: runtime JRE minimo
# ============================================================

FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Capa de dependencias: solo cambia si cambia pom.xml
COPY pom.xml .
RUN mvn -B -q dependency:go-offline

# Codigo fuente + tests (H2 en memoria, no requieren red ni MySQL)
COPY src ./src
RUN mvn -B -q clean package

# ------------------------------------------------------------
FROM eclipse-temurin:21-jre
WORKDIR /app

# Usuario no-root
RUN groupadd --system app && useradd --system --gid app app

COPY --from=build /app/target/app.jar app.jar

# NO usar EXPOSE: Railway lo interpreta como target port del dominio publico
# y genera x-railway-fallback 502/404 si difiere de $PORT (ver DEPLOY-STAGING.md).
# El puerto lo define Railway via PORT (server.port=${PORT:8081}).

USER app

# JAVA_OPTS permite -Xmx etc. desde la plataforma
ENTRYPOINT ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
