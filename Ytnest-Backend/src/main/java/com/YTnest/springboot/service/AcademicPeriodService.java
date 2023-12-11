package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.AcademicPeriod;

public interface AcademicPeriodService {
    AcademicPeriod saveAcademicPeriod(AcademicPeriod academicPeriod);

    List<AcademicPeriod> getAllAcademicPeriods();

    AcademicPeriod getAcademicPeriodById(long id);

    AcademicPeriod updateAcademicPeriod(AcademicPeriod academicPeriod, long id);

    // void deleteAcademicPeriod(long id);

}
