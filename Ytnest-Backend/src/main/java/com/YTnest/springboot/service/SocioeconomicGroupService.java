/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.YTnest.springboot.service;

import com.YTnest.springboot.model.SocioeconomicGroup;
import java.util.List;

/**
 *
 * @author crisa
 */

public interface SocioeconomicGroupService {
    SocioeconomicGroup saveSocioeconomicGroup(SocioeconomicGroup socioeconomicGroup);
    List<SocioeconomicGroup> getAllSocioeconomicGroups();
    SocioeconomicGroup getSocioeconomicGroupById(long id);
    SocioeconomicGroup updateSocioeconomicGroup(SocioeconomicGroup socioeconomicGroup, long id);
}
