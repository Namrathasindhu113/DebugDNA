package com.debugdna.server.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendHighSeverityAlert(
            String title,
            String severity,
            String analysis) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(
                "namrathasindhu113@gmail.com");

        message.setSubject(
                "🚨 DebugDNA High Severity Alert");

        message.setText(
                "Issue: " + title +
                        "\nSeverity: " + severity +
                        "\n\nAI Analysis:\n" +
                        analysis);

        System.out.println("DEBUGDNA EMAIL ALERT SENT");

        mailSender.send(message);
    }
}