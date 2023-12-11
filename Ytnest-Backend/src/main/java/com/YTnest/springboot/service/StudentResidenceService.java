package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.StudentResidence;

public interface StudentResidenceService {
    StudentResidence saveStudentResidence(StudentResidence studentResidence);

    List<StudentResidence> getAllStudentResidences();

    StudentResidence getStudentResidenceById(long id);

    StudentResidence updateStudentResidence(StudentResidence studentResidence, long id);
}
