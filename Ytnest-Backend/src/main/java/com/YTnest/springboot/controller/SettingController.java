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

import com.YTnest.springboot.model.Setting;
import com.YTnest.springboot.service.SettingService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/settings")
public class SettingController {
    private SettingService settingService;

    public SettingController(SettingService settingService) {
        super();
        this.settingService = settingService;
    }

    @PostMapping()
    public ResponseEntity<Setting> saveSetting(@RequestBody Setting setting) {
        return new ResponseEntity<Setting>(settingService.saveSettings(setting), HttpStatus.CREATED);

    }

    @GetMapping
    public List<Setting> getAllSettings() {
        return settingService.getAllSettings();
    }

    @GetMapping("{id}")
    public ResponseEntity<Setting> getSettingById(@PathVariable("id") long settingId) {
        return new ResponseEntity<Setting>(settingService.getSettingById(settingId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Setting> updateSettingById(@PathVariable("id") long id, @RequestBody Setting setting) {
        return new ResponseEntity<Setting>(settingService.updateSetting(setting, id), HttpStatus.OK);
    }

    // @DeleteMapping("{id}")
    // public ResponseEntity<String> deleteSetting(@PathVariable("id") long id) {
    // settingService.deleteSetting(id);
    // return new ResponseEntity<String>("Setting deleted successfully.",
    // HttpStatus.OK);
    // }

}
