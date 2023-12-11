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

import com.YTnest.springboot.model.Solicitude;
import com.YTnest.springboot.service.SolicitudeService;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/solicitudes")

public class SolicitudeController {
    private SolicitudeService solicitudeService;

    public SolicitudeController(SolicitudeService solicitudeService) {
        super();
        this.solicitudeService = solicitudeService;
    }

    @PostMapping()
    public ResponseEntity<Solicitude> saveSolicitude(@RequestBody Solicitude solicitude) {
        return new ResponseEntity<Solicitude>(solicitudeService.saveSolicitude(solicitude), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Solicitude> getAllSolicitudes() {
        return solicitudeService.getAllSolicitude();
    }

    @GetMapping("{id}")
    public ResponseEntity<Solicitude> getSolicitudeById(@PathVariable("id") long solicitudeId) {
        return new ResponseEntity<Solicitude>(solicitudeService.getSolicitudeById(solicitudeId), HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Solicitude> updateSolicitudById(@PathVariable("id") long id,
            @RequestBody Solicitude solicitude) {
        return new ResponseEntity<Solicitude>(solicitudeService.updateSolicitude(solicitude, id), HttpStatus.OK);
    }

}
