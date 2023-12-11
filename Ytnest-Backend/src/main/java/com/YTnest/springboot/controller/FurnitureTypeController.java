package com.YTnest.springboot.controller;

import com.YTnest.springboot.model.FurnitureType;
import com.YTnest.springboot.service.FurnitureTypeService;
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
@RequestMapping("/api/furnitureType")
public class FurnitureTypeController {
    
    private FurnitureTypeService furnitureTypeService;

    
    public FurnitureTypeController(FurnitureTypeService furnitureTypeService) {
        super();
        this.furnitureTypeService = furnitureTypeService;
    }

    @PostMapping()
    public ResponseEntity<FurnitureType> saveFurnitureType(FurnitureType furitureType) {
        return new ResponseEntity<FurnitureType>(furnitureTypeService.saveFurnitureType(furitureType), HttpStatus.CREATED);
    }

    @GetMapping
    public List<FurnitureType> getAllFurnitureType() {
        return furnitureTypeService.getAllFurnitureType();
    }

    @GetMapping("{id}")
    public ResponseEntity<FurnitureType> getFurnitureTypeById(@PathVariable("id") long furnitureId) {
        return new ResponseEntity<FurnitureType>(furnitureTypeService.getFurnitureTypeById(furnitureId),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<FurnitureType> updateFurnitureTypeById(@PathVariable("id") long id, @RequestBody FurnitureType furnitureType) {
                return new ResponseEntity<FurnitureType>(furnitureTypeService.updateFurnitureTypeById(furnitureType, id), HttpStatus.OK);

    }
    
    
    
}
