package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.YTnest.springboot.model.AcademicPeriod;

public interface AcademicPeriodRepository extends JpaRepository<AcademicPeriod, Long> {

}
