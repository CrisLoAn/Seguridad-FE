package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.RecordPenalty;

public interface RecordPenaltyService {
    RecordPenalty saveRecordPenalty(RecordPenalty recordPenalty);

    List<RecordPenalty> getAllRecordPenaltys();

    RecordPenalty getRecordPenaltyById(long id);

    RecordPenalty updateRecordPenalty(RecordPenalty recordPenalty, long id);
}
