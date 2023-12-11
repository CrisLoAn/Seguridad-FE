package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.YTnest.springboot.model.StudentResidence;

public interface StudentResidenceRepository extends JpaRepository<StudentResidence, Long> {

}
