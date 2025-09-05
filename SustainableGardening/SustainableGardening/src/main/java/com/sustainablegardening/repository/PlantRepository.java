package com.sustainablegardening.repository;

import com.sustainablegardening.model.Plant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlantRepository extends MongoRepository<Plant, String> {
}
