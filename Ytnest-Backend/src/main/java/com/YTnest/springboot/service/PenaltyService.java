package com.YTnest.springboot.service;

import java.util.List;

import com.YTnest.springboot.model.Penalty;

public interface PenaltyService {
    Penalty savePenalty(Penalty penalty);
    List<Penalty> getAllPenaltys();
    Penalty getPenaltyById(long id);
    Penalty updatePenalty(Penalty penalty, long id);
    void deletePenalty(long id);
}
