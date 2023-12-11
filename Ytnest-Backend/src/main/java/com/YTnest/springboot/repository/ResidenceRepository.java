/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.repository;

import com.YTnest.springboot.model.Residence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 *
 * @author crisa
 */
public interface ResidenceRepository extends JpaRepository<Residence,Long> {
    @Query("SELECT r FROM Residence r WHERE r.residenceGender = :gender")
    List<Residence> findResidencesByGender(String gender);
}
