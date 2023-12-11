package com.YTnest.springboot.service.impl;

import com.YTnest.springboot.exception.ResourceNotFoundException;
import com.YTnest.springboot.model.Cost;
import com.YTnest.springboot.repository.CostRepository;
import com.YTnest.springboot.service.CostService;

// import java.util.HashSet;
import java.util.List;
// import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CostServiceImpl implements CostService {
    private CostRepository costRepository;

    public CostServiceImpl(CostRepository costRepository) {
        super();
        this.costRepository = costRepository;
    }

    @Override
    public Cost saveCost(Cost cost) {
        return costRepository.save(cost);
    }

    @Override
    public List<Cost> getAllCosts() {
        return costRepository.findAll();
    }

    @Override
    public Cost getCostById(long id) {
        return costRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cost", "Id", id));
    }

    @Override
    public Cost updateCost(Cost cost, long id) {
        Cost existingCost = costRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cost", "Id", id));
        existingCost.setCostDescription(cost.getCostDescription());
        existingCost.setCostPrice(cost.getCostPrice());
        existingCost.setStatus(cost.getStatus());

        costRepository.save(existingCost);
        return existingCost;
    }

    // @Override
    // public void deleteCost(long id) {
    // costRepository.findById(id).orElseThrow(() -> new
    // ResourceNotFoundException("Cost", "Id", id));
    // costRepository.deleteById(id);
    // }
}
