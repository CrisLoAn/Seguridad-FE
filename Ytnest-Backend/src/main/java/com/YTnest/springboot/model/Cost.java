package com.YTnest.springboot.model;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "cost")

public class Cost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cost_id;

    @Column(name = "cost_description")
    private String costDescription;

    @Column(name = "cost_price")
    private double costPrice;

    @Column(name = "status")
    private String status;

}
