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

import com.YTnest.springboot.model.TablesLog;
import com.YTnest.springboot.service.TablesLogService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/tablesLogs")
public class TablesLogController {
    private TablesLogService tablesLogService;

    public TablesLogController(TablesLogService tablesLogService) {
        super();
        this.tablesLogService = tablesLogService;

    }

    @PostMapping()
    public ResponseEntity<TablesLog> saveTablesLog(@RequestBody TablesLog tablesLog) {
        return new ResponseEntity<TablesLog>(tablesLogService.saveTablesLog(tablesLog),
                HttpStatus.CREATED);

    }

    @GetMapping
    public List<TablesLog> getAllTablesLogs() {
        return tablesLogService.getAllTablesLogs();
    }

    @GetMapping("{id}")
    public ResponseEntity<TablesLog> getTablesLogById(@PathVariable("id") long tablesLogId) {
        return new ResponseEntity<TablesLog>(tablesLogService.getTablesLogById(tablesLogId),
                HttpStatus.OK);
    }


    @PutMapping("{id}")
    public ResponseEntity<TablesLog> updateTablesLog(@PathVariable("id") long id,
            @RequestBody TablesLog tablesLog) {
        return new ResponseEntity<TablesLog>(tablesLogService.updateTablesLog(tablesLog, id),
                HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTablesLog(@PathVariable("id") long id) {
        tablesLogService.deleteTablesLog(id);
        return new ResponseEntity<String>("Table deleted successfully.", HttpStatus.OK);
    }

}
