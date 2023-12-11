/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.service;

import com.YTnest.springboot.model.SocioeconomicGroupResidence;
import java.util.List;

/**
 *
 * @author crisa
 */

public interface SocioeconomicGroupResidenceService {
    SocioeconomicGroupResidence saveSocioeconomicGroupResidence(SocioeconomicGroupResidence socioeconomicGroupResidence);
    List<SocioeconomicGroupResidence> getAllSocioeconomicGroupResidence();
    SocioeconomicGroupResidence getSocioeconomicGroupResidenceById(long id);
    SocioeconomicGroupResidence updateSocioeconomicGroupResidence(SocioeconomicGroupResidence socioeconomicGroupResidence, long id);
}
