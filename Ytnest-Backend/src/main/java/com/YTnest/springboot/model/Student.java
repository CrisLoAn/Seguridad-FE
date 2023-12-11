/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.YTnest.springboot.security.services.CustomUserDetails;
import com.YTnest.springboot.security.services.SimpleSha256PasswordEncoder;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

/**
 *
 * @author crisa
 */
@Data
@Entity
@Table(name = "student")

public class Student implements CustomUserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long student_id;

    @Column(name = "student_ci")
    private String studentCedula;

    @Column(name = "student_first_name")
    private String studentFirstName;

    @Column(name = "student_middle_name")
    private String studentMiddleName;

    @Column(name = "student_last_name")
    private String studentLastName;

    @Column(name = "student_second_surname")
    private String studentSecondSurname;

    @Column(name = "student_gender")
    private String studentGender;

    @Column(name = "student_province")
    private String studentProvince;

    @Column(name = "student_semester")
    private int studentSemester;

    @Column(name = "student_mail")
    private String studentMail;

    @Column(name = "student_phone")
    private String studentPhone;

    @Column(name = "status")
    private String status;

    @Column(name = "student_gsec")
    private int studentGSEC;

    @Column(name = "student_representative")
    private boolean studentRepresentative;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentResidence> studentResidences;

    @JsonIgnoreProperties("student")
    @OneToOne(mappedBy = "student")
    private Record record;

    // ----------------------------------------------------------------


      @Override
    public String getPassword() {
        PasswordEncoder passwordEncoder = new SimpleSha256PasswordEncoder();
        return passwordEncoder.encode(this.getStudentCedula());
    }

    @Override
    public String getEmail() {
        return this.getStudentMail();
    }

    // @Override
    // public String getFirstName() {
    //     return this.getStudentFirstName();
    // }

    // @Override
    // public String getMiddleName() {
    //     return this.getStudentMiddleName();
    // }


    @Override
    public Long getId() {
        return this.getStudent_id();
    }

    

    public void setPassword(Object object) {
    }
}
