package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.ResidenceType;
import com.YTnest.springboot.repository.ResidenceTypeRepository;
import com.YTnest.springboot.service.ResidenceTypeService;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ResidenceTypeServiceImpl implements ResidenceTypeService {
    private ResidenceTypeRepository residenceTypeRepository;

    public ResidenceTypeServiceImpl(ResidenceTypeRepository residenceTypeRepository) {
        super();
        this.residenceTypeRepository = residenceTypeRepository;
    }

    @Override
    public ResidenceType saveResidenceType(ResidenceType residenceType) {
        return residenceTypeRepository.save(residenceType);
    }

    @Override
    public List<ResidenceType> getAllResidenceTypes() {
        return residenceTypeRepository.findAll();
    }

    @Override
    public ResidenceType getResidenceTypeById(long id) {
        return residenceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ResidenceType", "Id", id));
    }

    @Override
    public ResidenceType updateResidenceType(ResidenceType residenceType, long id) {
        ResidenceType existingResidenceType = residenceTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ResidenceType", "Id", id));
        existingResidenceType.setResidenceTypeName(residenceType.getResidenceTypeName());
        existingResidenceType.setResidenceTypeShortName(residenceType.getResidenceTypeShortName());
        existingResidenceType.setStatus(residenceType.getStatus());

        residenceTypeRepository.save(existingResidenceType);
        return existingResidenceType;

    }

    // @Override
    // public void deleteResidenceType(long id) {
    // residenceTypeRepository.findById(id)
    // .orElseThrow(() -> new ResourceNotFoundException("ResidenceType", "Id", id));
    // residenceTypeRepository.deleteById(id);
    // }

}
