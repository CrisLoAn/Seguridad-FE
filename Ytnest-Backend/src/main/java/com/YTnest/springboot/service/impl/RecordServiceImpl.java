package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Record;
import com.YTnest.springboot.repository.RecordRepository;
import com.YTnest.springboot.service.RecordService;

// import java.util.HashSet;
import java.util.List;
// import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecordServiceImpl implements RecordService {
    @Autowired
    private RecordRepository recordRepository;

    public RecordServiceImpl(RecordRepository recordRepository) {
        super();
        this.recordRepository = recordRepository;
    }

    @Override
    public Record saveRecord(Record record) {
        return recordRepository.save(record);
    }

    @Override
    public List<Record> getAllRecords() {
        return recordRepository.findAll();
    }

    @Override
    public Record getRecordById(long id) {
        return recordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Record", "Id", id));
    }

    @Override
    public Record updateRecord(Record record, long id) {
        Record existingRecord = recordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Record", "Id", id));

        //existingRecord.setStudent(record.getStudent());

        //existingRecord.setRecordPenalty(record.getRecordPenalty());

        existingRecord.setRecordDescription(record.getRecordDescription());
        existingRecord.setStatus(record.getStatus());
        existingRecord.setScore(record.getScore());

        recordRepository.save(existingRecord);
        return existingRecord;
    }

    @Override
    public void deleteRecord(long id) {
        recordRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Record", "Id", id));
        recordRepository.deleteById(id);
    }

    @Override
    public Record insertaRecord(Record obj) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'insertaRecord'");
    }
}
