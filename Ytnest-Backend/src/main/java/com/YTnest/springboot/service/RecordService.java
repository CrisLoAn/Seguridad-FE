package com.YTnest.springboot.service;

import java.util.List;

import com.YTnest.springboot.model.Record;


public interface RecordService {

    public Record insertaRecord(Record obj);
    Record saveRecord(Record record);
    public abstract List<Record> getAllRecords();
    Record getRecordById(long id);
    Record updateRecord(Record record, long id);
    void deleteRecord(long id);
}
