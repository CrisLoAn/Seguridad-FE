package com.YTnest.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.YTnest.springboot.model.Setting;

public interface SettingRepository extends JpaRepository<Setting, Long> {

}
