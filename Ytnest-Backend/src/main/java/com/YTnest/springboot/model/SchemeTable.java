package com.YTnest.springboot.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "scheme_table")

public class SchemeTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private long tableId;

    @Column(name = "table_name")
    private String tableName;
    
    @Column(name = "table_description")
    private String tableDescription;

    @Column(name = "status")
    private String status;

    @JsonIgnore
    @OneToMany(mappedBy = "schemeTable")
    private List<TablesLog> tablesLog = new ArrayList<>();
}
