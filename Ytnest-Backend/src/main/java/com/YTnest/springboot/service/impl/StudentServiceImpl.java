package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Student;
import com.YTnest.springboot.repository.StudentRepository;
import com.YTnest.springboot.service.StudentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class StudentServiceImpl implements StudentService{
    @Autowired
    private StudentRepository studentRepository;
    //private RecordRepository recordRepository;/////

    public StudentServiceImpl(StudentRepository studentRepository) {/////////
        super();
        this.studentRepository = studentRepository;
    }
    
    @Override
    public Student saveStudent(Student student)
    {
        return studentRepository.save(student);
    }
    
//    @Override
//    public List<Student> getAllStudents(Integer pageNo, Integer pageSize, String sortBy)
//    {
//        return studentRepository.findAll();
//    }

    @Override
    public Student getStudentById(long id) {
        return studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student", "Id", id));
    }

    @Override
    public Student updateStudent(Student student, long id) {
        Student existingStudent = studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student", "Id", id));
        existingStudent.setStudentCedula(student.getStudentCedula());
        existingStudent.setStudentFirstName(student.getStudentFirstName());
        existingStudent.setStudentMiddleName(student.getStudentMiddleName());
        existingStudent.setStudentLastName(student.getStudentLastName());
        existingStudent.setStudentSecondSurname(student.getStudentSecondSurname());
        existingStudent.setStudentProvince(student.getStudentProvince());
        existingStudent.setStudentSemester(student.getStudentSemester());
        existingStudent.setStudentMail(student.getStudentMail());
        existingStudent.setStudentPhone(student.getStudentPhone());
        existingStudent.setStatus(student.getStatus());
        existingStudent.setStudentGSEC(student.getStudentGSEC());
        existingStudent.setStudentRepresentative(student.isStudentRepresentative());
        
        studentRepository.save(existingStudent);
        return existingStudent;
    }

    @Override
    public void deleteStudent(long id) {
        studentRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Student", "Id", id));
        
        studentRepository.deleteById(id);
    }

    @Override
    public Student insertaStudent(Student obj) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insertaStudent'");
    }

    //----------------------------------------------------
    @Override
    public Page<Student> getStudentPagination(Integer pageNumber, Integer pageSize)
    {
        Sort sort = Sort.by(Sort.Direction.ASC, "studentLastName");
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        return studentRepository.findAll(pageable);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
}
