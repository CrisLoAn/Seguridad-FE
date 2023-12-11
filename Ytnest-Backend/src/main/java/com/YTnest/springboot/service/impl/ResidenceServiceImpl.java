/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Residence;
import com.YTnest.springboot.repository.ResidenceRepository;
import com.YTnest.springboot.service.ResidenceService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ResidenceServiceImpl implements ResidenceService{
    
    private ResidenceRepository residenceRepository;

    public ResidenceServiceImpl(ResidenceRepository residenceRepository) {
        super();
        this.residenceRepository = residenceRepository;
    }

    @Override
    public Residence saveResidence(Residence residence) {
        return residenceRepository.save(residence);
    }

    @Override
    public List<Residence> getAllResidences() {
        return residenceRepository.findAll();
    }

    @Override
    public Residence getResidenceById(long id) {
        return residenceRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student", "Id", id));
    }

    @Override
    public Residence updateResidence(Residence residence, long id) {
        Residence exisitingResidence = residenceRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Residence", "Id", id));
        exisitingResidence.setResidenceCode(residence.getResidenceCode());
        exisitingResidence.setResidenceCapacity(residence.getResidenceCapacity());
        exisitingResidence.setResidenceGender(residence.getResidenceGender());
        exisitingResidence.setResidenceLocation(residence.getResidenceLocation());
        exisitingResidence.setResidenceAvailability(residence.getResidenceAvailability());
        exisitingResidence.setResidenceArea(residence.getResidenceArea());
        exisitingResidence.setStatus(residence.getStatus());
        //exisitingResidence.setResidenceTypeId(residence.getResidenceTypeId);
        //exisitingResidence.setCostId(residence.getCostId);
        
        residenceRepository.save(exisitingResidence);
        return exisitingResidence;
    }

    @Override
    public List<Residence> findResidencesByGender(String gender) {
        return residenceRepository.findResidencesByGender(gender);
    }
    
    
    
}
