package com.YTnest.springboot.service;

import java.util.List;

import com.YTnest.springboot.model.TablesLog;

public interface TablesLogService {
    TablesLog saveTablesLog(TablesLog tablesLog);
    List<TablesLog> getAllTablesLogs();
    TablesLog getTablesLogById(long id);
    TablesLog updateTablesLog(TablesLog tablesLog, long id);
    void deleteTablesLog(long id);
}
