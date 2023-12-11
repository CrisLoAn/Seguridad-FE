package com.YTnest.springboot.model;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "residenceType")

public class ResidenceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long residence_type_id;

    @Column(name = "residence_type_name")
    private String residenceTypeName;

    @Column(name = "residence_type_short_name")
    private String residenceTypeShortName;

    @Column(name = "status")
    private String status;

}
