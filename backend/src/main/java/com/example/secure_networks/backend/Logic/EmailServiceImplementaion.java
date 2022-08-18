package com.example.secure_networks.backend.Logic;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImplementaion implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") 
    private String sender;

    @Override
    public void sendMail(String recipient, String subject, String body) {
        // Creating a simple mail message
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        // Setting up necessary details
        mailMessage.setFrom(sender);
        mailMessage.setTo(recipient);
        mailMessage.setText(body);
        mailMessage.setSubject(subject);

        // Sending the mail
        javaMailSender.send(mailMessage);
    }

    @Override
    public void sendMailWithAttachment(String recipient, String subject, String body, String attachment) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            // Mail setup
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
            mimeMessageHelper.setFrom(sender);
            mimeMessageHelper.setTo(recipient);
            mimeMessageHelper.setText(body);
            mimeMessageHelper.setSubject(subject);

            // Adding the attachment
            FileSystemResource file = new FileSystemResource(new File(attachment));
            mimeMessageHelper.addAttachment(file.getFilename(), file);
 
            // Sending the mail
            javaMailSender.send(mimeMessage);
        } 
        catch (MessagingException e) {
            System.out.println("Mail Error: " + e.getMessage());
        }
    }
    
}
