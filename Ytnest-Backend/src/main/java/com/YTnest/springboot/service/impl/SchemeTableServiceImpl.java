package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.SchemeTable;
import com.YTnest.springboot.repository.SchemeTableRepository;
import com.YTnest.springboot.service.SchemeTableService;
// import java.util.HashSet;
import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class SchemeTableServiceImpl implements SchemeTableService {

    private SchemeTableRepository schemeTableRepository;

    public SchemeTableServiceImpl(SchemeTableRepository schemeTableRepository) {
        super();
        this.schemeTableRepository = schemeTableRepository;
    }

    @Override
    public SchemeTable saveSchemeTable(SchemeTable schemeTable) {
        return schemeTableRepository.save(schemeTable);
    }

    @Override
    public List<SchemeTable> getAllSchemeTables() {
        return schemeTableRepository.findAll();
    }

    @Override
    public SchemeTable getSchemeTableById(long id) {
        return schemeTableRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SchemeTable", "Id", id));
    }

    @Override
    public SchemeTable updateSchemeTable(SchemeTable schemeTable, long id) {
        SchemeTable existingSchemeTable= schemeTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("SchemeTable", "Id", id));

        
        existingSchemeTable.setTableName(schemeTable.getTableName());
        existingSchemeTable.setTableDescription(schemeTable.getTableDescription());
        existingSchemeTable.setStatus(schemeTable.getStatus());
        

        schemeTableRepository.save(existingSchemeTable);
        return existingSchemeTable;
    }

    @Override
    public void deleteSchemeTable(long id) {
        schemeTableRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SchemeTable", "Id", id));

        schemeTableRepository.deleteById(id);
    }

}
