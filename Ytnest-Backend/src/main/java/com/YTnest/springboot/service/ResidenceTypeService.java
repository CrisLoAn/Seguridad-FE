package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.ResidenceType;

public interface ResidenceTypeService {
    ResidenceType saveResidenceType(ResidenceType residenceType);

    List<ResidenceType> getAllResidenceTypes();

    ResidenceType getResidenceTypeById(long id);

    ResidenceType updateResidenceType(ResidenceType residenceType, long id);

    // void deleteResidenceType(long id);
}
