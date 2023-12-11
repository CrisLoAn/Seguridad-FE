/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.Data;

/**
 *
 * @author crisa
 */
@Data
@Entity
@Table(name="student_residence")
public class SR {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="student_residence_id")
    private Long studentResidenceId;
    
    @Column(name="init_date_deal")
    private Timestamp initDateDeal;
    
    @Column(name="end_date_deal")
    private Timestamp ednDateDeal;
    
    @Column(name="student_id")
    private Long student_id;

    @Column(name="residence_id")
    private Long residenceId;
    
}
