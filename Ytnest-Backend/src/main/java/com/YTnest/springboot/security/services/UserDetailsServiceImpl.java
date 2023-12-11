package com.YTnest.springboot.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.YTnest.springboot.model.Student;
import com.YTnest.springboot.model.Promoter;
import com.YTnest.springboot.repository.StudentRepository;
import com.YTnest.springboot.repository.PromoterRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private PromoterRepository promoterRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Student student = studentRepository.findByStudentMail(email);

        Promoter promoter = promoterRepository.findByPromoterMail(email);
        
        UserDetailsImpl userDetails = null;

        if (student != null) {
            // System.out.println("Student found for email: " + email);
            // System.out.println(student.getPassword());
            userDetails = new UserDetailsImpl(student.getId(), student.getEmail(), student.getPassword(), null,
                    "Student");
        } else if (promoter != null) {
            // System.out.println(promoter.getPassword());
            // System.out.println("Promoter found for email: " + email);
            if (promoter.getPromoterAdmin()) {
                // System.out.println("Promter is ADMON");
                userDetails = new UserDetailsImpl(promoter.getId(), promoter.getEmail(), promoter.getPassword(), null,
                        "Admin");
            } else {
                userDetails = new UserDetailsImpl(promoter.getId(), promoter.getEmail(), promoter.getPassword(), null,
                        "Promoter");
            }
        } else {
            throw new UsernameNotFoundException("User Not Found with username: " + email);
        }

        return userDetails;
    }
}
