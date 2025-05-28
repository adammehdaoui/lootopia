package com.lootopia.server.config;

import com.stripe.StripeClient;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "stripe")
@Getter
@Setter
public class StripeConfig {

    private StripeClient stripeClient;
    private String key;

    @PostConstruct
    public void init() {
        if (key == null || key.isEmpty()) {
            throw new IllegalArgumentException("Stripe API key must be provided");
        }

        stripeClient = new StripeClient(key);
    }

}
