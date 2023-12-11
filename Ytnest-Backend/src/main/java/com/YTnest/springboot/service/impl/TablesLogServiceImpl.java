package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.TablesLog;
import com.YTnest.springboot.repository.TablesLogRepository;
import com.YTnest.springboot.service.TablesLogService;
// import java.util.HashSet;
import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class TablesLogServiceImpl implements TablesLogService {

    private TablesLogRepository tablesLogRepository;

    public TablesLogServiceImpl(TablesLogRepository tablesLogRepository) {
        super();
        this.tablesLogRepository = tablesLogRepository;
    }

    @Override
    public TablesLog saveTablesLog(TablesLog tablesLog) {
        return tablesLogRepository.save(tablesLog);
    }

    @Override
    public List<TablesLog> getAllTablesLogs() {
        return tablesLogRepository.findAll();
    }

    @Override
    public TablesLog getTablesLogById(long id) {
        return tablesLogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TablesLog", "Id", id));
    }

    @Override
    public TablesLog updateTablesLog(TablesLog tablesLog, long id) {
        TablesLog existingTablesLog= tablesLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TablesLog", "Id", id));

        
        existingTablesLog.setLogDate(tablesLog.getLogDate());
        existingTablesLog.setLogUser(tablesLog.getLogUser());
        existingTablesLog.setLogTerminal(tablesLog.getLogTerminal());
        existingTablesLog.setLogObservations(tablesLog.getLogObservations());
        existingTablesLog.setLogProcedureName(tablesLog.getLogProcedureName());
        existingTablesLog.setSchemeTable(tablesLog.getSchemeTable());
    
        tablesLogRepository.save(existingTablesLog);
        return existingTablesLog;
    }

    @Override
    public void deleteTablesLog(long id) {
        tablesLogRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("TablesLog", "Id", id));

        tablesLogRepository.deleteById(id);
    }

}
