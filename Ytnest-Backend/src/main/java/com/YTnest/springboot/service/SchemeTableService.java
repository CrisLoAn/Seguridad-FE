package com.YTnest.springboot.service;

import java.util.List;

import com.YTnest.springboot.model.SchemeTable;

public interface SchemeTableService {
    SchemeTable saveSchemeTable(SchemeTable schemeTable);
    List<SchemeTable> getAllSchemeTables();
    SchemeTable getSchemeTableById(long id);
    SchemeTable updateSchemeTable(SchemeTable schemeTable, long id);
    void deleteSchemeTable(long id);
}
