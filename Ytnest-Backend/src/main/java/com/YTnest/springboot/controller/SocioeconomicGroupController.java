/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.YTnest.springboot.controller;

import com.YTnest.springboot.model.SocioeconomicGroup;
import com.YTnest.springboot.service.SocioeconomicGroupService;
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
@RequestMapping("/api/SG")
public class SocioeconomicGroupController {
    
    private SocioeconomicGroupService SGService;

    public SocioeconomicGroupController(SocioeconomicGroupService SGService) {
        super();
        this.SGService = SGService;
    }

    @PostMapping()
    public ResponseEntity<SocioeconomicGroup> saveSocioeconomicGroup(@RequestBody SocioeconomicGroup socioeconomicGroup) {
        return new ResponseEntity<SocioeconomicGroup>(SGService.saveSocioeconomicGroup(socioeconomicGroup), HttpStatus.CREATED);
    }

    @GetMapping
    public List<SocioeconomicGroup> getAllSocioeconomicGroups() {
        return SGService.getAllSocioeconomicGroups();
    }

    @GetMapping("{id}")
    public ResponseEntity<SocioeconomicGroup> getSocioeconomicGroupById(@PathVariable long SGid) {
        return new ResponseEntity<SocioeconomicGroup>(SGService.getSocioeconomicGroupById(SGid),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<SocioeconomicGroup> updateSocioeconomicGroup(@PathVariable("id") long id, @RequestBody SocioeconomicGroup socioeconomicGroup) {
        return new ResponseEntity<SocioeconomicGroup>(SGService.updateSocioeconomicGroup(socioeconomicGroup, id), HttpStatus.OK);
    }
    
    
    
}
