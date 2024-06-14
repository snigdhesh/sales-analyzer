package com.example.salesanalyzerservice.controllers;

import com.example.salesanalyzerservice.models.ProductSales;
import com.example.salesanalyzerservice.models.SalesDetail;
import com.example.salesanalyzerservice.services.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class SalesController {

    @Autowired
    private SalesService salesService;

    @GetMapping("/sales/monthly")
    public List<SalesDetail> getMonthlySales() throws IOException {
        return salesService.getMonthlySales();
    }

    //Best-selling product by quantity - first in the list.
    @GetMapping("/quantity")
    public List<SalesDetail> getProductsAndQuantities() throws IOException {
        return salesService.getProductsAndQuantities();
    }

    @GetMapping("/sales")
    public List<ProductSales> getProductsAndSales() throws IOException {
        return salesService.getProductsAndSales();
    }

    @GetMapping("/sales/total")
    public SalesDetail getTotalSales() throws IOException {
        return salesService.getTotalSales();
    }
}
