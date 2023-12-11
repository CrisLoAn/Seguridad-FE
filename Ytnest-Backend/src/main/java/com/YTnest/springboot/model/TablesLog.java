package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "tables_log")
public class TablesLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private long logId;

    @Column(name = "log_date")
    private Timestamp logDate;

    @Column(name = "log_user")
    private String logUser;

    @Column(name = "log_terminal")
    private String logTerminal;

    @Column(name = "log_observations")
    private String logObservations;

    @Column(name = "log_procedure_name")
    private String logProcedureName;

    @ManyToOne
    @JoinColumn(name="table_id") 
    private SchemeTable schemeTable;

    public long getLogId() {
        return logId;
    }

    public void setLogId(long logId) {
        this.logId = logId;
    }

    public Timestamp getLogDate() {
        return logDate;
    }

    public void setLogDate(Timestamp logDate) {
        this.logDate = logDate;
    }

    public String getLogUser() {
        return logUser;
    }

    public void setLogUser(String logUser) {
        this.logUser = logUser;
    }

    public String getLogTerminal() {
        return logTerminal;
    }

    public void setLogTerminal(String logTerminal) {
        this.logTerminal = logTerminal;
    }

    public String getLogObservations() {
        return logObservations;
    }

    public void setLogObservations(String logObservations) {
        this.logObservations = logObservations;
    }

    public String getLogProcedureName() {
        return logProcedureName;
    }

    public void setLogProcedureName(String logProcedureName) {
        this.logProcedureName = logProcedureName;
    }

    public SchemeTable getSchemeTable() {
        return schemeTable;
    }

    public void setSchemeTable(SchemeTable schemeTable) {
        this.schemeTable = schemeTable;
    }
}

