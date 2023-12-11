package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Setting;
import com.YTnest.springboot.repository.SettingRepository;
import com.YTnest.springboot.service.SettingService;

import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class SettingServiceImpl implements SettingService {
    private SettingRepository settingRepository;

    public SettingServiceImpl(SettingRepository settingRepository) {
        super();
        this.settingRepository = settingRepository;

    }

    @Override
    public Setting saveSettings(Setting setting) {
        return settingRepository.save(setting);
    }

    @Override
    public List<Setting> getAllSettings() {
        return settingRepository.findAll();
    }

    @Override
    public Setting getSettingById(long id) {
        return settingRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Setting", "Id", id));
    }

    @Override
    public Setting updateSetting(Setting setting, long id) {
        Setting existingSetting = settingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Setting", "Id", id));
        existingSetting.setSettingInitDate(setting.getSettingInitDate());
        existingSetting.setSettingEndDate(setting.getSettingEndDate());
        existingSetting.setSettingDescription(setting.getSettingDescription());
        existingSetting.setStatus(setting.getStatus());

        settingRepository.save(existingSetting);
        return existingSetting;
    }

    // @Override
    // public void deleteSetting(long id) {
    // settingRepository.findById(id).orElseThrow(() -> new
    // ResourceNotFoundException("Setting", "Id", id));
    // settingRepository.deleteById(id);
    // }

}
