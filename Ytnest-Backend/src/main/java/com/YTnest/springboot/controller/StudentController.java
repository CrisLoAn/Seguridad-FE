package com.YTnest.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.YTnest.springboot.model.Student;
import com.YTnest.springboot.repository.StudentRepository;

import com.YTnest.springboot.service.StudentService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;




@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    private StudentRepository studentRepository;
    
    
    public StudentController(StudentService studentService) {
        super();
        this.studentService = studentService;
    }
    
    
    @PostMapping()
    public ResponseEntity<Student> saveStudent(@RequestBody Student student)
    {
        return new ResponseEntity<Student>(studentService.saveStudent(student),HttpStatus.CREATED);
    }
    
    @GetMapping
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable("id") long studentId)
    {
        return new ResponseEntity<Student>(studentService.getStudentById(studentId), HttpStatus.OK);
    }
    
    @PutMapping("{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable("id") long id, @RequestBody Student student){
        return new ResponseEntity<Student>(studentService.updateStudent(student, id), HttpStatus.OK);
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") long id){
        studentService.deleteStudent(id);
        return new ResponseEntity<String>("Student deleted successfully.", HttpStatus.OK);
    }

    //---------------------------------------------------------------------------------------------Paginador
    
    @RequestMapping(value="/{pageNumber}/{pageSize}", method = RequestMethod.GET)
    public Page<Student> studentPagination(@PathVariable Integer pageNumber, @PathVariable Integer pageSize){
        return studentService.getStudentPagination(pageNumber,pageSize);
    }
}