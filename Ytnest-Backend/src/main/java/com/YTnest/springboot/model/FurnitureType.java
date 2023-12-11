/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
@Entity
@Table(name="furniture_type")
public class FurnitureType {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="furniture_type_id")
    private long furnitureType;

    @Column(name="furniture_type_code")
    private String furnitureTypeCode;

    @Column(name="furniture_type_name")
    private String furnitureTypeName;

    @Column(name="status")
    private String status;
    
    @OneToMany(mappedBy = "furnitureType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResidenceFurnitureType> residenceFurnitureType = new ArrayList<>();

}
