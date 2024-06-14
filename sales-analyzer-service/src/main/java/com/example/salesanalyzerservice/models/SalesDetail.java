package com.example.salesanalyzerservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class SalesDetail {
    private int itemId;
    private String itemDescription;
    private double quantity;
    private String saleDate;
    private double salesAmount;

    private double totalSales;

    public SalesDetail(){};

    public SalesDetail(String saleDate, double salesAmount, String itemDescription, double quantity) {
        this.saleDate = saleDate;
        this.salesAmount = salesAmount;
        this.itemDescription = itemDescription;
        this.quantity = quantity;
    }
}
