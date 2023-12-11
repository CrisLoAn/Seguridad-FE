package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.YTnest.springboot.model.Penalty;

public interface PenaltyRepository extends JpaRepository<Penalty, Long>{

}
