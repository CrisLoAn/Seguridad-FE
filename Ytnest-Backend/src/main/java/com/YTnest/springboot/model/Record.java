package com.YTnest.springboot.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "record")

public class Record {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Long recordId;

    @Column(name = "record_description")
    private String recordDescription;

    @Column(name = "status")
    private String status;

    @Column(name = "score")
    private int score;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "record_id")
    private List<RecordPenalty> recordPenalty; 
      
    @OneToOne
    @JoinColumn(name = "student_id")
    @JsonIgnoreProperties("record") // Evita la serialización en bucle
    private Student student;

    @JsonProperty("student_id")
    public Long getStudentId() {
        if (student != null) {
            return student.getStudent_id();
        }
        return null;
    }
}
