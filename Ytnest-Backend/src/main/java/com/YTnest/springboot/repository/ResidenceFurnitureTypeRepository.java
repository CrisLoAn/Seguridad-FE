/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.YTnest.springboot.model.ResidenceFurnitureType;

@Repository
public interface ResidenceFurnitureTypeRepository extends JpaRepository<ResidenceFurnitureType, Long>{
    
}
