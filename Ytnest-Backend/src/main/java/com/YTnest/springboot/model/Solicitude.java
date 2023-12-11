package com.YTnest.springboot.model;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;
// import java.util.List;

@Data
@Entity
@Table(name = "solicitude")

public class Solicitude {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long solicitude_id;

    @Column(name = "solicitude_date")
    private Timestamp solicitudeDate;

    @Column(name = "status")
    private String status;

    // @OneToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "student_id")
    // private Student student;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "academic_period_id")
    private AcademicPeriod academicPeriod;

}
