package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.StudentResidence;
import com.YTnest.springboot.repository.StudentResidenceRepository;
import com.YTnest.springboot.service.StudentResidenceService;

import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class StudentResidenceServiceImpl implements StudentResidenceService {
    private StudentResidenceRepository studentResidenceRepository;

    public StudentResidenceServiceImpl(StudentResidenceRepository studentResidenceRepository) {
        super();
        this.studentResidenceRepository = studentResidenceRepository;
    }

    @Override
    public StudentResidence saveStudentResidence(StudentResidence studentResidence) {
        return studentResidenceRepository.save(studentResidence);
    }

    @Override
    public List<StudentResidence> getAllStudentResidences() {
        return studentResidenceRepository.findAll();
    }

    @Override
    public StudentResidence getStudentResidenceById(long id) {
        return studentResidenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StudentResidence", "Id", id));
    }

    @Override
    public StudentResidence updateStudentResidence(StudentResidence studentResidence, long id) {
        StudentResidence existingStudentResidence = studentResidenceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("StudentResidence", "Id", id));
        existingStudentResidence.setInitDateDeal(studentResidence.getInitDateDeal());
        existingStudentResidence.setEdnDateDeal(studentResidence.getEdnDateDeal());

        studentResidenceRepository.save(existingStudentResidence);
        return existingStudentResidence;

    }
}
