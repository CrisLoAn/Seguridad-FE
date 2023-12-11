package com.YTnest.springboot.model;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "setting")

public class Setting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long setting_id;

    @Column(name = "init_date")
    private Timestamp settingInitDate;

    @Column(name = "end_date")
    private Timestamp settingEndDate;

    @Column(name = "setting_description")
    private String settingDescription;

    @Column(name = "status")
    private String status;
}
