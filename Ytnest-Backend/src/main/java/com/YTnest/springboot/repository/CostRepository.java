package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.YTnest.springboot.model.Cost;

public interface CostRepository extends JpaRepository<Cost, Long> {

}
