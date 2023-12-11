/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import com.YTnest.springboot.security.services.CustomUserDetails;
import com.YTnest.springboot.security.services.SimpleSha256PasswordEncoder;

import jakarta.persistence.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import lombok.Data;
@Data
@Entity
@Table(name="promoters")

public class Promoter implements CustomUserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long promoter_id;

    @Column(name = "promoter_ci")
    private String promoterCi;

    @Column(name = "promoter_first_name")
    private String promoterFirstName;
    
    @Column(name = "promoter_middle_name")
    private String promoterMiddleName;
    
    @Column(name = "promoter_last_name")
    private String promoterLastName;

    @Column(name = "promoter_surname")
    private String promoterSurname;
    
    @Column(name = "promoter_mail")
    private String promoterMail;

    @Column(name = "promoter_admin")
    private Boolean promoterAdmin;


    //----------------------------------------------------------------

    
    @Override
    public String getPassword() {
        PasswordEncoder passwordEncoder = new SimpleSha256PasswordEncoder();
        return passwordEncoder.encode(this.getPromoterCi());
    }

    @Override
    public String getEmail() {
        return this.getPromoterMail();
    }

    @Override
    public Long getId() {
        return this.getPromoter_id();
    }
}
