package com.YTnest.springboot.model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "record_penalty")

public class RecordPenalty {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_penalty_id")
    private Long recordPenaltyId;
    
    @Column(name = "status")
    private String status;

    @Column(name = "penalty_date")
    private Timestamp penaltyDate;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "penalty_id")
    private Penalty penalty;

    @ManyToOne
    @JoinColumn(name = "record_id")
    private Record record;
    

    public Long getRecordPenaltyId() {
        return recordPenaltyId;
    }

    public void setRecordId(Long recordId) {
        this.recordPenaltyId = recordId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Timestamp getPenaltyDate() {
        return penaltyDate;
    }

    public void setPenaltyDate(Timestamp penaltyDate) {
        this.penaltyDate = penaltyDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Penalty getPenalty() {
        return penalty;
    }

    public void setPenalty(Penalty penalty) {
        this.penalty = penalty;
    }


    public Record getRecord() {
        return record;
    }

    public void setRecord(Record record) {
        this.record = record;
    }
}
