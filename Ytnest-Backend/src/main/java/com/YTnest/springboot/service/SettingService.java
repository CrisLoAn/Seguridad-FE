package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.Setting;

public interface SettingService {
    Setting saveSettings(Setting setting);

    List<Setting> getAllSettings();

    Setting getSettingById(long id);

    Setting updateSetting(Setting setting, long id);

    // void deleteSetting(long id);

}
