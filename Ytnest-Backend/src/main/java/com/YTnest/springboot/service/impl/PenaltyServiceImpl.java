package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Penalty;
import com.YTnest.springboot.repository.PenaltyRepository;
import com.YTnest.springboot.service.PenaltyService;
// import java.util.HashSet;
import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class PenaltyServiceImpl implements PenaltyService {

    private PenaltyRepository penaltyRepository;

    public PenaltyServiceImpl(PenaltyRepository penaltyRepository) {
        super();
        this.penaltyRepository = penaltyRepository;
    }

    @Override
    public Penalty savePenalty(Penalty penalty) {
        return penaltyRepository.save(penalty);
    }

    @Override
    public List<Penalty> getAllPenaltys() {
        return penaltyRepository.findAll();
    }

    @Override
    public Penalty getPenaltyById(long id) {
        return penaltyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Penalty", "Id", id));
    }

    @Override
    public Penalty updatePenalty(Penalty penalty, long id) {
        Penalty existingPenalty= penaltyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Penalty", "Id", id));


        existingPenalty.setPenaltyName(penalty.getPenaltyName());
        existingPenalty.setPenaltyDescription(penalty.getPenaltyDescription());
        existingPenalty.setPenaltyCost(penalty.getPenaltyCost());
        existingPenalty.setStatus(penalty.getStatus());
        

        penaltyRepository.save(existingPenalty);
        return existingPenalty;
    }

    @Override
    public void deletePenalty(long id) {
        penaltyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Penalty", "Id", id));

        penaltyRepository.deleteById(id);
    }

}
