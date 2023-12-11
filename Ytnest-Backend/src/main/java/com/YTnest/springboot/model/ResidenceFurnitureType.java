/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
@Entity
@Table(name="residence_furniture_type")
public class ResidenceFurnitureType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="residence_furniture_type_id")
    private long id;
    
    @Column(name="description")
    private String name;

    @Column(name="init_date")
    private Timestamp initDate;
    
    @Column(name="end_date")
    private Timestamp endDate;
    
    @Column(name="status")
    private String status;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="furniture_type_id")
    private FurnitureType furnitureType;
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="residence_id")
    private Residence residence;
    
    
}
