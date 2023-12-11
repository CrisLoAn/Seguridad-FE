package com.YTnest.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.YTnest.springboot.model.SchemeTable;
import com.YTnest.springboot.service.SchemeTableService;
@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/schemeTables")
public class SchemeTableController {
    private SchemeTableService schemeTableService;

    public SchemeTableController(SchemeTableService schemeTableService) {
        super();
        this.schemeTableService = schemeTableService;

    }

    @PostMapping()
    public ResponseEntity<SchemeTable> saveSchemeTable(@RequestBody SchemeTable schemeTable) {
        return new ResponseEntity<SchemeTable>(schemeTableService.saveSchemeTable(schemeTable),
                HttpStatus.CREATED);

    }

    @GetMapping
    public List<SchemeTable> getAllSchemeTables() {
        return schemeTableService.getAllSchemeTables();
    }

    @GetMapping("{id}")
    public ResponseEntity<SchemeTable> getSchemeTableById(@PathVariable("id") long schemeTableId) {
        return new ResponseEntity<SchemeTable>(schemeTableService.getSchemeTableById(schemeTableId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<SchemeTable> updateSchemeTable(@PathVariable("id") long id,
            @RequestBody SchemeTable schemeTable) {
        return new ResponseEntity<SchemeTable>(schemeTableService.updateSchemeTable(schemeTable, id),
                HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSchemeTable(@PathVariable("id") long id) {
        schemeTableService.deleteSchemeTable(id);
        return new ResponseEntity<String>("Scheme Table deleted successfully.", HttpStatus.OK);
    }

}
