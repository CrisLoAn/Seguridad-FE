package com.YTnest.springboot.model;

import jakarta.persistence.*;
import java.util.List;

import lombok.Data;
/**
 *
 * @author crisa
 */
@Data
@Entity
@Table(name="residence")
public class Residence{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="residence_id")
    private long residenceId;

    @Column(name="residence_code")
    private String residenceCode;

    @Column(name="residence_capacity")
    private int residenceCapacity;

    @Column(name="residence_gender")
    private String residenceGender;

    @Column(name="residence_location")
    private String residenceLocation;

    @Column(name="residence_availability")
    private String residenceAvailability;

    @Column(name="residence_area")
    private double residenceArea;

    @Column(name="status")
    private String status;

    @Column(name="cost_id")
    private int cost_id;
    
    //Claves Foraneas
    /* 
    @ManyToOne
    @JoinColumn(name="residence_type_id")
    private ResidenceType residenceType;

    @JoinColumn(name="cost_id")
    private Cost cost;
    */
    
    //herencia
    @OneToMany(mappedBy = "residence", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ResidenceFurnitureType> residenceFurnitureTypes;

    @OneToMany(mappedBy = "residence", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SocioeconomicGroupResidence> socioeconomicGroupResidences;
    
    
    @OneToMany(mappedBy = "residence", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentResidence> studentResidence;
}