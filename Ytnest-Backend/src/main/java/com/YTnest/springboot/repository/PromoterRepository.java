package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.YTnest.springboot.model.Promoter;

public interface PromoterRepository extends JpaRepository<Promoter, Long> {
    Promoter findByPromoterMail(String promoterMail);

    Boolean existsByPromoterMail(String promoterMail);
}
