package com.sustainablegardening.model;

import java.util.List;

public class CompanionPlanting {
    private List<String> good;
    private List<String> bad;

    // Getters
    public List<String> getGood() { return good; }
    public List<String> getBad() { return bad; }

    // Setters
    public void setGood(List<String> good) { this.good = good; }
    public void setBad(List<String> bad) { this.bad = bad; }
}