/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.controller;

import com.YTnest.springboot.model.SR;
import com.YTnest.springboot.service.SRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author crisa
 */
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/SR")
public class SRController {
    
    @Autowired
    private SRService srService;
    
    public SRController(SRService sRService) {
        super();
        this.srService = sRService;
    }
    
    
    @PostMapping()
    public ResponseEntity<SR> saveStudent(@RequestBody SR sr)
    {
        System.out.println("\n \n \n \n");
        System.out.println(" estudiante residencia pasada desde el front end : \n"+sr);
        System.out.println("\n \n \n \n");
        return new ResponseEntity<SR>(srService.saveSR(sr),HttpStatus.CREATED);
    }

}
