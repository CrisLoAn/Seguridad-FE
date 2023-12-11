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

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/sgr")
public class SocioeconomicGroupResidenceController {
    
    private SocioeconomicGroupService SGS;

    public SocioeconomicGroupResidenceController(SocioeconomicGroupService SGS) {
        super();
        this.SGS = SGS;
    }

    @PostMapping()
    public ResponseEntity<SocioeconomicGroup> saveSocioeconomicGroup(@RequestBody SocioeconomicGroup socioeconomicGroup) {
        return new ResponseEntity<SocioeconomicGroup>(SGS.saveSocioeconomicGroup(socioeconomicGroup),HttpStatus.CREATED);
    }

    @GetMapping
    public List<SocioeconomicGroup> getAllSocioeconomicGroups() {
        return SGS.getAllSocioeconomicGroups();
    }

    @GetMapping("{id}")
    public ResponseEntity<SocioeconomicGroup> getSocioeconomicGroupById(@PathVariable("id") long socioeconomicGroupId) {
        return new ResponseEntity<SocioeconomicGroup>(SGS.getSocioeconomicGroupById(socioeconomicGroupId),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<SocioeconomicGroup> updateSocioeconomicGroup(@PathVariable long id, @RequestBody SocioeconomicGroup socioeconomicGroup) {
        return new ResponseEntity<SocioeconomicGroup>(SGS.updateSocioeconomicGroup(socioeconomicGroup, id),HttpStatus.OK);
    }
    
    
    
    
}
