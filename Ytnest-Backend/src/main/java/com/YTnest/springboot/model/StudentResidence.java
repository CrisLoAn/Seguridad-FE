/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name="student_residence")
public class StudentResidence {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="student_residence_id")
    private long studentResidenceId;
    
    @Column(name="init_date_deal")
    private Timestamp initDateDeal;
    
    @Column(name="end_date_deal")
    private Timestamp ednDateDeal;
    
    //Foreing keys
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="student_id")
    private Student student;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="residence_id")
    private Residence residence;

    // new campos
    @JsonProperty("student_id")
    public Long getStudentId() {
        if (student != null) {
            return student.getStudent_id();
        }
        return null;
    }

    @JsonProperty("residenceId")
    public Long getResidenceId() {
        if (residence != null) {
            return residence.getResidenceId();
        }
        return null;
    }
    
}
