package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
@Entity
@Table(name="socioeconomic_group")
public class SocioeconomicGroup {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="socioeconomic_group_id")
    private long socioeconomicGroupId;
    
    @Column(name="socioeconomic_group_name")
    private String socioeconomicGroupName;
    
    @Column(name="socioeconomic_group_value")
    private int socioeconomicGroupValue;
    
    @Column(name="status")
    private String status;
    
    @OneToMany(mappedBy = "socioeconomicGroup")
    private List<SocioeconomicGroupResidence> socioeconomicGroupResidences = new ArrayList<>();

}
