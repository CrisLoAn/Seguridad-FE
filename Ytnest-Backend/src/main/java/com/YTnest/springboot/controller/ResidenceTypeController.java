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

import com.YTnest.springboot.model.ResidenceType;
import com.YTnest.springboot.service.ResidenceTypeService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/residenceTypes")
public class ResidenceTypeController {
    private ResidenceTypeService residenceTypeService;

    public ResidenceTypeController(ResidenceTypeService residenceTypeService) {
        super();
        this.residenceTypeService = residenceTypeService;

    }

    @PostMapping()
    public ResponseEntity<ResidenceType> saveResidenceType(@RequestBody ResidenceType residenceType) {
        return new ResponseEntity<ResidenceType>(residenceTypeService.saveResidenceType(residenceType),
                HttpStatus.CREATED);

    }

    @GetMapping
    public List<ResidenceType> getAllResidenceTypes() {
        return residenceTypeService.getAllResidenceTypes();
    }

    @GetMapping("{id}")
    public ResponseEntity<ResidenceType> getResidenceTypeById(@PathVariable("id") long residenceTypeId) {
        return new ResponseEntity<ResidenceType>(residenceTypeService.getResidenceTypeById(residenceTypeId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ResidenceType> updateResidenceType(@PathVariable("id") long id,
            @RequestBody ResidenceType residenceType) {
        return new ResponseEntity<ResidenceType>(residenceTypeService.updateResidenceType(residenceType, id),
                HttpStatus.OK);
    }

    // @DeleteMapping("{id}")
    // public ResponseEntity<String> deleteResidenceType(@PathVariable("id") long
    // id) {
    // residenceTypeService.deleteResidenceType(id);
    // return new ResponseEntity<String>("Residence Type deleted successfully.",
    // HttpStatus.OK);
    // }

}
