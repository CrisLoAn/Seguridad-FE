package com.YTnest.springboot.service;

import java.util.List;

import com.YTnest.springboot.model.Student;
import com.YTnest.springboot.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    
    
    public Student insertaStudent(Student obj);
    Student saveStudent(Student student);
    Student getStudentById(long id);
    Student updateStudent(Student student, long id);
    void deleteStudent(long id);
    public abstract List<Student> getAllStudents();
    Page<Student> getStudentPagination(Integer pageNumber, Integer pageSize);
    
}



