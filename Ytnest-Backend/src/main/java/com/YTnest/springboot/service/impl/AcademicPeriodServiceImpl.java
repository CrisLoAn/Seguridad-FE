package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.AcademicPeriod;
import com.YTnest.springboot.repository.AcademicPeriodRepository;
import com.YTnest.springboot.service.AcademicPeriodService;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AcademicPeriodServiceImpl implements AcademicPeriodService {
    private AcademicPeriodRepository academicPeriodRepository;

    public AcademicPeriodServiceImpl(AcademicPeriodRepository academicPeriodRepository) {
        super();
        this.academicPeriodRepository = academicPeriodRepository;
    }

    @Override
    public AcademicPeriod saveAcademicPeriod(AcademicPeriod academicPeriod) {
        return academicPeriodRepository.save(academicPeriod);
    }

    @Override
    public List<AcademicPeriod> getAllAcademicPeriods() {
        return academicPeriodRepository.findAll();
    }

    @Override
    public AcademicPeriod getAcademicPeriodById(long id) {
        return academicPeriodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AcademicPeriod", "Id", id));
    }

    @Override
    public AcademicPeriod updateAcademicPeriod(AcademicPeriod academicPeriod, long id) {
        AcademicPeriod existingAcademicPeriod = academicPeriodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AcademicPeriod", "Id", id));
        existingAcademicPeriod.setAcademicPeriodCode(academicPeriod.getAcademicPeriodCode());
        existingAcademicPeriod.setAcademicPeriodName(academicPeriod.getAcademicPeriodName());
        existingAcademicPeriod.setStatus(academicPeriod.getStatus());

        academicPeriodRepository.save(existingAcademicPeriod);
        return existingAcademicPeriod;
    }

    // @Override
    // public void deleteAcademicPeriod(long id) {
    // academicPeriodRepository.findById(id)
    // .orElseThrow(() -> new ResourceNotFoundException("AcademicPeriod", "Id",
    // id));
    // academicPeriodRepository.deleteById(id);
    // }

}
