package com.lootopia.server.service;

import com.lootopia.server.config.StripeConfig;
import com.lootopia.server.domain.Client;
import com.lootopia.server.domain.Member;
import com.lootopia.server.repository.ClientRepository;
import com.stripe.exception.StripeException;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final ClientRepository clientRepository;
    private final AuthService authService;
    private final StripeConfig stripeConfig;

    public PaymentService(ClientRepository clientRepository,
                          AuthService authService,
                          StripeConfig stripeConfig) {
        this.clientRepository = clientRepository;
        this.authService = authService;
        this.stripeConfig = stripeConfig;
    }

    public void pay(String token) throws StripeException {
        Member member = authService.getMemberFromToken(token);

        if (member == null) {
            throw new IllegalArgumentException("Member not found");
        }

        if (member.getClient() == null) {
            CustomerCreateParams params = CustomerCreateParams
                    .builder()
                    .setEmail(member.getEmail())
                    .setPaymentMethod("pm_card_visa")
                    .build();

            stripeConfig
                    .getStripeClient()
                    .customers()
                    .create(params);

            Client client = new Client();
            client.setMember(member);

            clientRepository.save(client);
        }

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(1000L)
                .setCurrency("eur")
                .build();

        stripeConfig
                .getStripeClient()
                .paymentIntents()
                .create(params);
    }

}
