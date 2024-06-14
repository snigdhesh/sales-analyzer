package com.example.salesanalyzerservice.services;

import com.example.salesanalyzerservice.models.ProductSales;
import com.example.salesanalyzerservice.models.SalesDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SalesService {
    @Autowired
    private CSVService csvService;

    public List<SalesDetail> getMonthlySales() throws IOException {
        List<SalesDetail> salesDetails = new ArrayList<>();
        csvService.readFromCSV("monthlySalesTrend.csv").stream().forEach(row -> salesDetails.add(new SalesDetail(row.get("SaleDate"), Double.parseDouble(row.get("SalesAmt")), "", 0)));
        return salesDetails;
    }

    public List<SalesDetail> getProductsAndQuantities() throws IOException {
        List<SalesDetail> salesDetails = new ArrayList<>();
        csvService.readFromCSV("totalQuantityByProduct.csv").stream().forEach(row -> salesDetails.add(new SalesDetail(row.get("SaleDate"), 0, row.get("ItemDescription").trim(), Double.parseDouble(row.get("Quantity")))));
        return salesDetails.stream().limit(10).collect(Collectors.toList());
    }

    public List<ProductSales> getProductsAndSales() throws IOException {
        List<SalesDetail> salesDetails = new ArrayList<>();
        csvService.readFromCSV("totalSalesByProduct.csv").stream().forEach(row -> salesDetails.add(new SalesDetail(null, Double.parseDouble(row.get("SalesAmt")), row.get("ItemDescription").trim(), 0)));

        List<ProductSales> productSales = new ArrayList<>();

        Map<String, Set<Double>> salesMap = new HashMap<>();

        salesDetails.forEach(salesDetail -> {
            salesMap.computeIfAbsent(salesDetail.getItemDescription(), k -> new HashSet<>()).add(salesDetail.getSalesAmount());
        });

        salesMap.forEach((key, value) -> {
            ProductSales p = new ProductSales();
            p.setProductName(key);
            p.setSaleAmount(value);
            productSales.add(p);
        });

        return productSales;
    }

    public SalesDetail getTotalSales() throws IOException {
        String totalSales = csvService.readFromTXT("totalSalesAmount.txt");
        SalesDetail salesDetail = new SalesDetail();
        salesDetail.setTotalSales(Double.parseDouble(totalSales));
        return salesDetail;
    }

}
