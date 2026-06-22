package com.example.Libra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender sender;

    public void sendEmail(String to, String subject, String body) {
        if (sender == null) {
            System.out.println("Mail sender not configured. Skipping email to: " + to);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        sender.send(message);
    }
}