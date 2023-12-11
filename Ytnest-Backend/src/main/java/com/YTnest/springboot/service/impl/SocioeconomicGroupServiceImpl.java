/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.SocioeconomicGroup;
import com.YTnest.springboot.repository.SocioeconomicGroupRepository;
import com.YTnest.springboot.service.SocioeconomicGroupService;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SocioeconomicGroupServiceImpl implements SocioeconomicGroupService {

    private SocioeconomicGroupRepository SEGSRepository;

    public SocioeconomicGroupServiceImpl(SocioeconomicGroupRepository SEGSRepository) {
        super();
        this.SEGSRepository = SEGSRepository;
    }
       
    @Override
    public SocioeconomicGroup saveSocioeconomicGroup(SocioeconomicGroup socioeconomicGroup) {
        return SEGSRepository.save(socioeconomicGroup);
    }

    @Override
    public List<SocioeconomicGroup> getAllSocioeconomicGroups() {
        return SEGSRepository.findAll();
    }

    @Override
    public SocioeconomicGroup getSocioeconomicGroupById(long id) {
        return SEGSRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student", "Id", id));
    }

    @Override
    public SocioeconomicGroup updateSocioeconomicGroup(SocioeconomicGroup socioeconomicGroup, long id) {
        SocioeconomicGroup existingSocioeconomicGroup = SEGSRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("SocioeconomicGroup", "Id", id));
        existingSocioeconomicGroup.setSocioeconomicGroupName(socioeconomicGroup.getSocioeconomicGroupName());
        existingSocioeconomicGroup.setSocioeconomicGroupValue(socioeconomicGroup.getSocioeconomicGroupValue());
        existingSocioeconomicGroup.setStatus(socioeconomicGroup.getStatus());
        SEGSRepository.save(existingSocioeconomicGroup);
        return existingSocioeconomicGroup;
    }
    
}
