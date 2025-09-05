package com.sustainablegardening.model;

import java.util.List;

public class SoilRequirements {
    private String type;
    private String pH;
    private List<String> nutrients;

    // Getters
    public String getType() { return type; }
    public String getPH() { return pH; }
    public List<String> getNutrients() { return nutrients; }

    // Setters
    public void setType(String type) { this.type = type; }
    public void setPH(String pH) { this.pH = pH; }
    public void setNutrients(List<String> nutrients) { this.nutrients = nutrients; }
}