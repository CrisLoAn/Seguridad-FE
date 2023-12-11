/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.sql.Timestamp;

import lombok.Data;
@Data
@Entity
@Table(name="socioeconomic_group_residence")
public class SocioeconomicGroupResidence {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="socioeconomic_group_residence_id")
    private long socioeconomicGroupResidenceId;

    @Column(name="init_date")
    private Timestamp initDate;
    
    @Column(name="end_date")
    private Timestamp endDate;
    
    @Column(name="status")
    private String status;
    
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="residence_id")
    private Residence residence;
    
    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name="socioeconomic_group_id")
    private SocioeconomicGroup socioeconomicGroup;
    
}
