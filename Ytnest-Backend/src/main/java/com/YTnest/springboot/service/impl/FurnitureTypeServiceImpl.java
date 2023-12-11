/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.FurnitureType;
import com.YTnest.springboot.repository.FurnitureTypeRepository;
import com.YTnest.springboot.service.FurnitureTypeService;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author crisa
 */
@Service
public class FurnitureTypeServiceImpl implements FurnitureTypeService{
    
    private FurnitureTypeRepository ftrRepository;

    public FurnitureTypeServiceImpl(FurnitureTypeRepository ftrRepository) {
        super();
        this.ftrRepository = ftrRepository;
    }
    
    @Override
    public FurnitureType saveFurnitureType(FurnitureType furnitureType) {
        return ftrRepository.save(furnitureType);
    }

    @Override
    public List<FurnitureType> getAllFurnitureType() {
        return ftrRepository.findAll();
    }

    @Override
    public FurnitureType getFurnitureTypeById(long id) {
        return ftrRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("FurnitureType ", "Id", id));
    }

    @Override
    public FurnitureType updateFurnitureTypeById(FurnitureType furnitureType, long id) {
        FurnitureType existingFurnitureType = ftrRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("FurnitureType", "Id", id));
        existingFurnitureType.setFurnitureTypeCode(furnitureType.getFurnitureTypeCode());
        existingFurnitureType.setFurnitureTypeName(furnitureType.getFurnitureTypeName());
        existingFurnitureType.setStatus(furnitureType.getStatus());
        
        ftrRepository.save(existingFurnitureType);
        return existingFurnitureType;
    }
    
    
    
}
