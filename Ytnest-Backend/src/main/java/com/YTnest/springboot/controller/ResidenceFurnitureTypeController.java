/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.controller;

import com.YTnest.springboot.model.ResidenceFurnitureType;
import com.YTnest.springboot.service.ResidenceFurnitureTypeService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author crisa
 */
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/rft")
public class ResidenceFurnitureTypeController {

    public ResidenceFurnitureTypeController(ResidenceFurnitureTypeService RFCR) {
        this.RFCR = RFCR;
    }
    
    private ResidenceFurnitureTypeService RFCR;
    
    
    @PostMapping()
    public ResponseEntity<ResidenceFurnitureType> saveResidenceFurnitureType(@RequestBody ResidenceFurnitureType rft)
    {
        return new ResponseEntity<ResidenceFurnitureType>(RFCR.saveResidenceFurnitureType(rft),HttpStatus.CREATED);
    }
    
    @GetMapping
    public List<ResidenceFurnitureType> getAllResidenceFurnitureType(){
        return RFCR.getAllResidenceFurnitureType();
    }
    
    @GetMapping("{id}")
    public ResponseEntity<ResidenceFurnitureType> getResidenceFurnitureTypeById(@PathVariable("id") long RFTId)
    {
        return new ResponseEntity<ResidenceFurnitureType>(RFCR.getResidenceFurnitureTypeById(RFTId), HttpStatus.OK);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<ResidenceFurnitureType> updateResidenceFurnitureType(@PathVariable("id") long id, @RequestBody ResidenceFurnitureType rft){
        return new ResponseEntity<ResidenceFurnitureType>(RFCR.updateResidenceFurnitureType(rft, id), HttpStatus.OK);
    }

}
