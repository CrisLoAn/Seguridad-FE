package com.YTnest.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.YTnest.springboot.model.Penalty;
import com.YTnest.springboot.service.PenaltyService;

@RestController
@RequestMapping("/api/penaltys")
public class PenaltyController {
    private PenaltyService penaltyService;

    public PenaltyController(PenaltyService penaltyService) {
        super();
        this.penaltyService = penaltyService;

    }

    @PostMapping()
    public ResponseEntity<Penalty> savePenalty(@RequestBody Penalty penalty) {
        return new ResponseEntity<Penalty>(penaltyService.savePenalty(penalty),
                HttpStatus.CREATED);

    }

    @GetMapping
    public List<Penalty> getAllPenaltys() {
        return penaltyService.getAllPenaltys();
    }

    @GetMapping("{id}")
    public ResponseEntity<Penalty> getPenaltyById(@PathVariable("id") long penaltyId) {
        return new ResponseEntity<Penalty>(penaltyService.getPenaltyById(penaltyId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Penalty> updatePenalty(@PathVariable("id") long id,
            @RequestBody Penalty penalty) {
        return new ResponseEntity<Penalty>(penaltyService.updatePenalty(penalty, id),
                HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePenalty(@PathVariable("id") long id) {
        penaltyService.deletePenalty(id);
        return new ResponseEntity<String>("Penalty deleted successfully.", HttpStatus.OK);
    }

}
