/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.controller;

import com.YTnest.springboot.model.Residence;
import com.YTnest.springboot.repository.ResidenceRepository;
import com.YTnest.springboot.service.ResidenceService;
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
@RequestMapping("/api/residences")
public class ResidenceController {
    
    private ResidenceService residenceService;

    public ResidenceController(ResidenceService residenceService) {
        super();
        this.residenceService = residenceService;
    }

    @PostMapping()
    public ResponseEntity<Residence> saveResidence(@RequestBody Residence residence) {
        return new ResponseEntity<Residence>(residenceService.saveResidence(residence),HttpStatus.CREATED);
    }

    @GetMapping
    public List<Residence> getAllResidences() {
        return residenceService.getAllResidences();
    }

    @GetMapping("{id}")
    public ResponseEntity<Residence> getResidenceById(@PathVariable("id") long residenceId) {
        return new ResponseEntity<Residence>(residenceService.getResidenceById(residenceId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Residence> updateResidence(@PathVariable("id") long id, @RequestBody Residence residence) {
        return new ResponseEntity<Residence>(residenceService.updateResidence(residence, id), HttpStatus.OK);
    }

    @GetMapping("/filterByGender/{gender}")
    public List<Residence> filterResidencesByGender(@PathVariable String gender) {
        return residenceService.findResidencesByGender(gender);
    }
    
}
