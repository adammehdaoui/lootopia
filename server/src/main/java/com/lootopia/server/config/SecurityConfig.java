package com.lootopia.server.config;

import com.lootopia.server.filter.JwtAuthentificationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@PropertySource("classpath:application-${spring.profiles.active}.yml")
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final JwtAuthentificationFilter jwtAuthentificationFilter;

    public SecurityConfig(CorsConfig corsConfig, JwtAuthentificationFilter jwtAuthentificationFilter) {
        this.corsConfig = corsConfig;
        this.jwtAuthentificationFilter = jwtAuthentificationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers("/auth/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated()
                )
                .addFilterAfter(
                        jwtAuthentificationFilter, BasicAuthenticationFilter.class
                )
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                .csrf(csrf -> csrf
                        .ignoringRequestMatchers("/**")
                );

        return http.build();
    }

}
