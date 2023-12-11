package com.YTnest.springboot.controller;

import com.YTnest.springboot.mailing.EmailRequest;
import com.YTnest.springboot.mailing.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/email")
public class EmailNotificationController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendMail")
    public String sendMail(@RequestBody EmailRequest emailRequest) {
        try {
            emailService.sendHtmlEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getHtmlContent());
            return "Correo electrónico enviado exitosamente";
        } catch (Exception e) {
            return "Error al enviar el correo electrónico: " + e.getMessage();
        }
    }
}
