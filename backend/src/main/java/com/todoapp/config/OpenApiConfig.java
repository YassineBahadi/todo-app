package com.todoapp.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author pc
 **/
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI todoOpenAPI() {
        final String securitySchemeName = "bearerAuth"; // Nom simple et sans espace

        return new OpenAPI()
                .info(new Info()
                        .title("Todo Task Manager API")
                        .description("API for managing tasks with JWT authentication")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Yassine Bahadi")
                                .email("yassinebahadi04@gmail.com")
                        )
                )
                // Ajout de la sécurité globalement pour toutes les routes
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        )
                );
    }
}
