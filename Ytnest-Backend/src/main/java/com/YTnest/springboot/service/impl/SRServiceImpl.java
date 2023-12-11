/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.model.SR;
import com.YTnest.springboot.repository.SRRepository;
import com.YTnest.springboot.service.SRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author crisa
 */
@Service
public class SRServiceImpl implements SRService{

    @Autowired
    private SRRepository srRepository;

    public SRServiceImpl(SRRepository studentResidenceRepository) {
        super();
        this.srRepository =  studentResidenceRepository;
    }
    
    @Override
    public SR saveSR(SR estudianteResidencia) {
        return srRepository.save(estudianteResidencia);
    }
    
}
