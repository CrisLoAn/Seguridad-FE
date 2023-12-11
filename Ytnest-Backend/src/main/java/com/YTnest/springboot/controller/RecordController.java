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

import com.YTnest.springboot.model.Record;
import com.YTnest.springboot.service.RecordService;

@RestController
@RequestMapping("/api/records")
public class RecordController {
    private RecordService recordService;

    public RecordController(RecordService recordService) {
        super();
        this.recordService = recordService;

    }

    @PostMapping()
    public ResponseEntity<Record> saveRecord(@RequestBody Record record) {
        return new ResponseEntity<Record>(recordService.saveRecord(record),
                HttpStatus.CREATED);

    }

    @GetMapping
    public List<Record> getAllRecords() {
        return recordService.getAllRecords();
    }

    @GetMapping("{id}")
    public ResponseEntity<Record> getRecordById(@PathVariable("id") long recordId) {
        return new ResponseEntity<Record>(recordService.getRecordById(recordId),
                HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Record> updateRecord(@PathVariable("id") long id,
            @RequestBody Record record) {
        return new ResponseEntity<Record>(recordService.updateRecord(record, id),
                HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable("id") long id) {
        recordService.deleteRecord(id);
        return new ResponseEntity<String>("Record deleted successfully.", HttpStatus.OK);
    }

}
