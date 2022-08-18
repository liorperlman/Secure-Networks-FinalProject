package com.example.secure_networks.backend.Logic;

public interface EmailService {
    
    /**
     * Sends a mail to the specified recipient 
     * @param recipient The email address of the recipient
     * @param subject The subject of the mail
     * @param body The body of the mail
     */
    public void sendMail(String recipient, String subject, String body);

    /**
     * Sends a mail with a specified attachment
     * @param recipient The email address of the recipient
     * @param subject The subject of the mail
     * @param body The body of the mail
     * @param attachment A attachment to send
     */
    public void sendMailWithAttachment(String recipient, String subject, String body, String attachment);

}
