package com.YTnest.springboot.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "academicPeriod")
public class AcademicPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long academic_period_id;

    @Column(name = "academicPeriod_code")
    private String academicPeriodCode;

    @Column(name = "academicPeriod_name")
    private String academicPeriodName;

    @Column(name = "status")
    private String status;

}
