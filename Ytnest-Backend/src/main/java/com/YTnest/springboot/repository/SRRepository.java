/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.repository;

import com.YTnest.springboot.model.SR;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author crisa
 */
public interface SRRepository extends JpaRepository<SR, Long>{
    
}
