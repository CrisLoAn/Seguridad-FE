package com.YTnest.springboot.service;

import java.util.List;
import com.YTnest.springboot.model.Cost;

public interface CostService {
    Cost saveCost(Cost cost);

    List<Cost> getAllCosts();

    Cost getCostById(long id);

    Cost updateCost(Cost cost, long id);

    // void deleteCost(long id);

}
