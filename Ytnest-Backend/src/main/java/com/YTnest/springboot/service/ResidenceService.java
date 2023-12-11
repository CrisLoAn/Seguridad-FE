/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.service;

import com.YTnest.springboot.model.Residence;
import java.util.List;

import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author crisa
 */

public interface ResidenceService {
    @Query("SELECT r FROM Residence r WHERE r.residenceGender = :gender")
    List<Residence> findResidencesByGender(String gender);
    Residence saveResidence(Residence residence);
    List<Residence> getAllResidences();
    Residence getResidenceById(long id);
    Residence updateResidence(Residence residence, long id);
}
