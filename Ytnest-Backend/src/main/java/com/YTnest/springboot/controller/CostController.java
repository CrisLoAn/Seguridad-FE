package com.YTnest.springboot.controller;

import java.time.Duration;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.YTnest.springboot.model.Cost;
import com.YTnest.springboot.service.CostService;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/costs")
public class CostController {

    private CostService costService;

    public CostController(CostService costService) {
        super();
        this.costService = costService;
    }

    @PostMapping()
    public ResponseEntity<Cost> saveCost(@RequestBody Cost cost) {
        return new ResponseEntity<Cost>(costService.saveCost(cost), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Cost> getAllCosts() {
        return costService.getAllCosts();
    }

    @GetMapping("{id}")
    public ResponseEntity<Cost> getCostById(@PathVariable("id") long costId) {
        return new ResponseEntity<Cost>(costService.getCostById(costId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Cost> updateCostById(@PathVariable("id") long id, @RequestBody Cost cost) {
        return new ResponseEntity<Cost>(costService.updateCost(cost, id), HttpStatus.OK);
    }

    // @DeleteMapping("{id}")
    // public ResponseEntity<String> deleteCost(@PathVariable("id") long id) {
    // costService.deleteCost(id);
    // return new ResponseEntity<String>("Student deleted successfully.",
    // HttpStatus.OK);
    // }

}
