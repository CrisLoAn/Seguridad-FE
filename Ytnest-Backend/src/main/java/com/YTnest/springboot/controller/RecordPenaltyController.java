package com.YTnest.springboot.controller;

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

import com.YTnest.springboot.model.RecordPenalty;
import com.YTnest.springboot.service.RecordPenaltyService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/recordPenaltys")
public class RecordPenaltyController {
    
    private RecordPenaltyService recordPenaltyService;
    
    
    public RecordPenaltyController(RecordPenaltyService recordPenaltyService) {
        super();
        this.recordPenaltyService = recordPenaltyService;
    }

    @PostMapping()
    public ResponseEntity<RecordPenalty> saveRecordPenalty(@RequestBody RecordPenalty recordPenalty)
    {
        return new ResponseEntity<RecordPenalty>(recordPenaltyService.saveRecordPenalty(recordPenalty),HttpStatus.CREATED);
    }
    
    @GetMapping
    public List<RecordPenalty> getAllRecordPenaltys(){
        return recordPenaltyService.getAllRecordPenaltys();
    }
    
    @GetMapping("{id}")
    public ResponseEntity<RecordPenalty> getRecordPenaltyById(@PathVariable("id") long recordPenaltyId)
    {
        return new ResponseEntity<RecordPenalty>(recordPenaltyService.getRecordPenaltyById(recordPenaltyId), HttpStatus.OK);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<RecordPenalty> updateRecordPenalty(@PathVariable("id") long id, @RequestBody RecordPenalty recordPenalty){
        return new ResponseEntity<RecordPenalty>(recordPenaltyService.updateRecordPenalty(recordPenalty, id), HttpStatus.OK);
    }
    
}