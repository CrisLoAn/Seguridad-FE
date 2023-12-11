package com.YTnest.springboot.repository;

// import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.YTnest.springboot.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByStudentMail(String studentMail);


    Boolean existsByStudentMail(String studentMail);
}
