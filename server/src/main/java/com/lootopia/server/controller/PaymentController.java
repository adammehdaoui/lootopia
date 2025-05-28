package com.lootopia.server.controller;

import com.lootopia.server.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping()
    public ResponseEntity<Object> createPayment(@RequestHeader("Authorization") String token) throws StripeException {
        paymentService.pay(token);

        return ResponseEntity.ok().build();
    }

}
