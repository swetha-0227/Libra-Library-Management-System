package com.example.Libra.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.Libra.services.EmailService;

@Component
public class EmailRem {

    @Autowired(required = false)
    private EmailService emailService;

    @Scheduled(fixedRate = 86400000) // daily
    public void sendReminder() {
        if (emailService == null) {
            return;
        }

        // Example (you can connect DB later)
        emailService.sendEmail(
                "test@gmail.com",
                "Library Reminder",
                "Return your book on time!"
        );
    }
}