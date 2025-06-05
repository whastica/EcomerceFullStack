package com.whalensoft.astrosetupsback.infra.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.whalensoft.astrosetupsback.infra.adapters")
public class RepositoryAdapterConfig {
}