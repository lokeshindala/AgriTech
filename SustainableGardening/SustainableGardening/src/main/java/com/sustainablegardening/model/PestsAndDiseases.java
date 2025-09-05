package com.sustainablegardening.model;

import java.util.List;

public class PestsAndDiseases {
    private List<String> common;
    private List<String> diseases;
    private List<String> remedies;

    // Getters
    public List<String> getCommon() { return common; }
    public List<String> getDiseases() { return diseases; }
    public List<String> getRemedies() { return remedies; }

    // Setters
    public void setCommon(List<String> common) { this.common = common; }
    public void setDiseases(List<String> diseases) { this.diseases = diseases; }
    public void setRemedies(List<String> remedies) { this.remedies = remedies; }
}