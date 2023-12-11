package com.YTnest.springboot.controller;

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

import com.YTnest.springboot.model.AcademicPeriod;
import com.YTnest.springboot.service.AcademicPeriodService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/academicPeriods")
public class AcademicPeriodController {
    private AcademicPeriodService academicPeriodService;

    public AcademicPeriodController(AcademicPeriodService academicPeriodService) {
        super();
        this.academicPeriodService = academicPeriodService;

    }

    @PostMapping()
    public ResponseEntity<AcademicPeriod> saveAcademicPeriod(@RequestBody AcademicPeriod academicPeriod) {
        return new ResponseEntity<AcademicPeriod>(academicPeriodService.saveAcademicPeriod(academicPeriod),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<AcademicPeriod> getAllAcademicPeriods() {
        return academicPeriodService.getAllAcademicPeriods();
    }

    @GetMapping("{id}")
    public ResponseEntity<AcademicPeriod> getAcademicPeriodById(@PathVariable("id") long academicPeriodId) {
        return new ResponseEntity<AcademicPeriod>(academicPeriodService.getAcademicPeriodById(academicPeriodId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<AcademicPeriod> updateAcademicPeriod(@PathVariable("id") long id,
            @RequestBody AcademicPeriod academicPeriod) {
        return new ResponseEntity<AcademicPeriod>(academicPeriodService.updateAcademicPeriod(academicPeriod, id),
                HttpStatus.OK);
    }

    // @DeleteMapping("{id}")
    // public ResponseEntity<String> deleteAcademicPeriod(@PathVariable("id") long
    // id) {
    // academicPeriodService.deleteAcademicPeriod(id);
    // return new ResponseEntity<String>("Academic Period deleted successfully.",
    // HttpStatus.OK);
    // }

}
