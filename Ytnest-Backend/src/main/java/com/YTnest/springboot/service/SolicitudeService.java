package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.Solicitude;

public interface SolicitudeService {
    Solicitude saveSolicitude(Solicitude solicitude);

    List<Solicitude> getAllSolicitude();

    Solicitude getSolicitudeById(long id);

    Solicitude updateSolicitude(Solicitude solicitude, long id);

}
