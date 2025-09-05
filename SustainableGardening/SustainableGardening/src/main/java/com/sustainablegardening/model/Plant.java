package com.sustainablegardening.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "plants")
public class Plant {

    @Id
    private String id;
    private String name;
    private String type;
    private SeasonalGrowth seasonalGrowth;

    @Field("soil")
    private SoilRequirements soilRequirements;

    @Field("fertilizer")
    private FertilizerInfo fertilizerInfo;

    @Field("companions")
    private CompanionPlanting companionPlanting;

    @Field("pests")
    private PestsAndDiseases pestsAndDiseases;

    // Getters

    public String getId() { return id; }
    public String getName() { return name; }
    public String getType() { return type; }
    public SeasonalGrowth getSeasonalGrowth() { return seasonalGrowth; }
    public SoilRequirements getSoilRequirements() { return soilRequirements; }
    public FertilizerInfo getFertilizerInfo() { return fertilizerInfo; }
    public CompanionPlanting getCompanionPlanting() { return companionPlanting; }
    public PestsAndDiseases getPestsAndDiseases() { return pestsAndDiseases; }

    // Setters

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setType(String type) { this.type = type; }
    public void setSeasonalGrowth(SeasonalGrowth seasonalGrowth) { this.seasonalGrowth = seasonalGrowth; }
    public void setSoilRequirements(SoilRequirements soilRequirements) { this.soilRequirements = soilRequirements; }
    public void setFertilizerInfo(FertilizerInfo fertilizerInfo) { this.fertilizerInfo = fertilizerInfo; }
    public void setCompanionPlanting(CompanionPlanting companionPlanting) { this.companionPlanting = companionPlanting; }
    public void setPestsAndDiseases(PestsAndDiseases pestsAndDiseases) { this.pestsAndDiseases = pestsAndDiseases; }
}