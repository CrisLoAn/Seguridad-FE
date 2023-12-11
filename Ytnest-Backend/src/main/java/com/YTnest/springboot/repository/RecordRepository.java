package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.YTnest.springboot.model.Record;

public interface RecordRepository extends JpaRepository<Record, Long>{

}
