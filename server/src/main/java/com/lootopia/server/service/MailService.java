package com.lootopia.server.service;

<<<<<<< HEAD
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.UUID;

=======
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

>>>>>>> a603abb (WIP: send email after register)
@Service
@PropertySource("classpath:application-${spring.profiles.active}.yml")
public class MailService {

    JavaMailSender emailSender;
<<<<<<< HEAD
    Logger LOGGER = LoggerFactory.getLogger(MailService.class);
=======
>>>>>>> a603abb (WIP: send email after register)

    @Value("${mail.domain}")
    private String username;

    @Value("${register.confirm.url}")
    private String activationUrl;

    public MailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public UUID sendMessage(String to) {
        UUID generatedUUID = UUID.randomUUID();
        String uuid = generatedUUID.toString();
        String subject = "Account activation";

        String htmlContent = String.format(
                """
                        <div style='font-family: Arial, sans-serif; padding: 20px; text-align: center;'>
                            <img src='cid:logoImage' alt='lootopia' style='width:20em; margin-bottom: 20px;'/>
                            <h2 style='color: #333;'>Welcome to Lootopia!</h2>
                            <p style='font-size: 16px; color: #555;'>Hello <strong>%s</strong>,</p>
                            <p style='font-size: 16px; color: #555;'>Thank you for signing up! Use the URL below to confirm your email:</p>
                            <p style='font-size: 14px; color: #888;'>This code is valid for a limited time.</p>
                            <p>
                                <a href='%s?code=%s&mail=%s' style='display: inline-block; padding: 10px 20px; background-color: #2C89F7;
                                color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;'>Activate Now</a>
                            </p>
                            <p style='font-size: 12px; color: #999;'>If you did not request this email, please ignore it.</p>
                        </div>
                        """,
                to, activationUrl, uuid, to
        );

        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    true,
                    "UTF-8"
            );
            helper.setFrom(username);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            ClassPathResource logo = new ClassPathResource("static/images/lootopia.png");
            helper.addInline("logoImage", logo);

            emailSender.send(message);

        } catch (MessagingException e) {
            LOGGER.error("""
                    Error while sending email: {}
                    """, e.getMessage());
        }

        return generatedUUID;
    }
}
