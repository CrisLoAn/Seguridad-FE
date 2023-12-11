/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.ResidenceFurnitureType;
import com.YTnest.springboot.repository.ResidenceFurnitureTypeRepository;
import com.YTnest.springboot.service.ResidenceFurnitureTypeService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ResidenceFurnitureTypeServiceImpl implements ResidenceFurnitureTypeService{
    
    private ResidenceFurnitureTypeRepository RFTRepository;

    public ResidenceFurnitureTypeServiceImpl(ResidenceFurnitureTypeRepository RFTRepository) {
        super();
        this.RFTRepository = RFTRepository;
    }
    
    @Override
    public ResidenceFurnitureType saveResidenceFurnitureType(ResidenceFurnitureType residenceFurnitureType) {
        return RFTRepository.save(residenceFurnitureType);
    }

    @Override
    public List<ResidenceFurnitureType> getAllResidenceFurnitureType() {
        return RFTRepository.findAll();
    }

    @Override
    public ResidenceFurnitureType getResidenceFurnitureTypeById(long Id) {
        return RFTRepository.findById(Id).orElseThrow(()-> new ResourceNotFoundException("ResidenceFurnitureType", "Id", Id));
    }

    @Override
    public ResidenceFurnitureType updateResidenceFurnitureType(ResidenceFurnitureType residenceFurnitureType, long id) {
        ResidenceFurnitureType existingResidenceFurnitureType = RFTRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("ResidenceFurnitureType", "Id", id));
        existingResidenceFurnitureType.setName(residenceFurnitureType.getName());
        existingResidenceFurnitureType.setInitDate(residenceFurnitureType.getInitDate());
        existingResidenceFurnitureType.setEndDate(residenceFurnitureType.getEndDate());
        existingResidenceFurnitureType.setStatus(residenceFurnitureType.getStatus());
        existingResidenceFurnitureType.setResidence(residenceFurnitureType.getResidence());
        existingResidenceFurnitureType.setFurnitureType(residenceFurnitureType.getFurnitureType());
        
        RFTRepository.save(existingResidenceFurnitureType);
        return existingResidenceFurnitureType;
    }
    
}
