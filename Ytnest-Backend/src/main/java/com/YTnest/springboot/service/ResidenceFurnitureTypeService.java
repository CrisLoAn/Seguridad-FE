/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.service;

import com.YTnest.springboot.model.ResidenceFurnitureType;
import java.util.List;

/**
 *
 * @author crisa
 */

public interface ResidenceFurnitureTypeService {
    ResidenceFurnitureType saveResidenceFurnitureType(ResidenceFurnitureType residenceFurnitureType);
    List<ResidenceFurnitureType> getAllResidenceFurnitureType();
    ResidenceFurnitureType getResidenceFurnitureTypeById(long Id);
    ResidenceFurnitureType updateResidenceFurnitureType(ResidenceFurnitureType residenceFurnitureType, long id);
}
