/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.service;

import com.YTnest.springboot.model.FurnitureType;
import java.util.List;


/**
 *
 * @author crisa
 */

public interface FurnitureTypeService {
    FurnitureType saveFurnitureType(FurnitureType furitureType);
    List<FurnitureType> getAllFurnitureType();
    FurnitureType getFurnitureTypeById(long id); 
    FurnitureType updateFurnitureTypeById(FurnitureType furnitureType, long id);
}
