package com.YTnest.springboot.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "penalty")

public class Penalty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="penalty_id")
    private long penaltyId;

    @Column(name = "penalty_name")
    private String penaltyName;
    
    @Column(name = "penalty_description")
    private String penaltyDescription;

    @Column(name = "penalty_cost")
    private int penaltyCost;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "penalty_id")
    private List<RecordPenalty> recordPenalty;
    
}
