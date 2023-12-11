package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.SocioeconomicGroupResidence;
import com.YTnest.springboot.repository.SocioeconomicGroupResidenceRepository;
import com.YTnest.springboot.service.SocioeconomicGroupResidenceService;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class SocioeconomicGroupResidenceServiceImpl implements SocioeconomicGroupResidenceService{
    
    private SocioeconomicGroupResidenceRepository SGRRepository;
    
    public SocioeconomicGroupResidenceServiceImpl(SocioeconomicGroupResidenceRepository SGRRepository) {
        super();
        this.SGRRepository = SGRRepository;
    }

    @Override
    public SocioeconomicGroupResidence saveSocioeconomicGroupResidence(SocioeconomicGroupResidence socioeconomicGroupResidence) {
        return SGRRepository.save(socioeconomicGroupResidence);
    }

    @Override
    public List<SocioeconomicGroupResidence> getAllSocioeconomicGroupResidence() {
        return SGRRepository.findAll();
    }

    @Override
    public SocioeconomicGroupResidence getSocioeconomicGroupResidenceById(long id) {
        return SGRRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("SocioeconomicGroupResidence", "Id", id));
    }

    @Override
    public SocioeconomicGroupResidence updateSocioeconomicGroupResidence(SocioeconomicGroupResidence socioeconomicGroupResidence, long id) {
        SocioeconomicGroupResidence existingSGR = SGRRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("SocioeconomicGroupResidence", "Id", id));
        existingSGR.setInitDate(socioeconomicGroupResidence.getInitDate());
        existingSGR.setEndDate(socioeconomicGroupResidence.getEndDate());
        existingSGR.setStatus(socioeconomicGroupResidence.getStatus());
        
        existingSGR.setResidence(socioeconomicGroupResidence.getResidence());
        existingSGR.setSocioeconomicGroup(socioeconomicGroupResidence.getSocioeconomicGroup());
        
        SGRRepository.save(existingSGR);
        return existingSGR;
    }
    
    
}
