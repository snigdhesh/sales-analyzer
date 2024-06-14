package com.example.salesanalyzerservice.models;

import lombok.Data;

import java.util.Set;

@Data
public class ProductSales {
    private String productName;
    private Set<Double> saleAmount;
}
