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

import com.YTnest.springboot.model.StudentResidence;
import com.YTnest.springboot.service.StudentResidenceService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/studentsResidences")

public class StudentResidenceController {
    private StudentResidenceService studentResidenceService;

    public StudentResidenceController(StudentResidenceService studentResidenceService) {
        super();
        this.studentResidenceService = studentResidenceService;
    }

    @PostMapping()
    public ResponseEntity<StudentResidence> saveStudentResidence(@RequestBody StudentResidence studentResidence) {
        return new ResponseEntity<StudentResidence>(studentResidenceService.saveStudentResidence(studentResidence),
                HttpStatus.CREATED);
    }

    @GetMapping
    public List<StudentResidence> getAllStudentResidences() {
        return studentResidenceService.getAllStudentResidences(); //
    }

    @GetMapping("{id}")
    public ResponseEntity<StudentResidence> getStudentResidenceById(@PathVariable("id") long studentResidenceId) {
        return new ResponseEntity<StudentResidence>(studentResidenceService.getStudentResidenceById(studentResidenceId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<StudentResidence> updateStudentResidence(@PathVariable("id") long id,
            @RequestBody StudentResidence studentResidence) {
        return new ResponseEntity<StudentResidence>(
                studentResidenceService.updateStudentResidence(studentResidence, id), HttpStatus.OK);
    }

}
