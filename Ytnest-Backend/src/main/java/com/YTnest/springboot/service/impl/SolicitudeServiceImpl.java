package com.YTnest.springboot.service.impl;

import java.util.List;
// import java.util.Optional;
import com.YTnest.springboot.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.YTnest.springboot.service.SolicitudeService;

import com.YTnest.springboot.model.Solicitude;
import com.YTnest.springboot.repository.SolicitudeRepository;

@Service
public class SolicitudeServiceImpl implements SolicitudeService {
    private SolicitudeRepository solicitudeRepository;

    public SolicitudeServiceImpl(SolicitudeRepository solicitudeRepository) {
        super();
        this.solicitudeRepository = solicitudeRepository;
    }

    @Override
    public Solicitude saveSolicitude(Solicitude solicitude) {
        return solicitudeRepository.save(solicitude);
    }

    @Override
    public List<Solicitude> getAllSolicitude() {
        return solicitudeRepository.findAll();
    }

    @Override
    public Solicitude getSolicitudeById(long id) {
        return solicitudeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitude", "Id", id));
    }

    @Override
    public Solicitude updateSolicitude(Solicitude solicitude, long id) {
        Solicitude existingSolicitude = solicitudeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitude", "Id", id));
        existingSolicitude.setSolicitudeDate(solicitude.getSolicitudeDate());
        existingSolicitude.setStatus(solicitude.getStatus());

        solicitudeRepository.save(existingSolicitude);
        return existingSolicitude;
    }

}
