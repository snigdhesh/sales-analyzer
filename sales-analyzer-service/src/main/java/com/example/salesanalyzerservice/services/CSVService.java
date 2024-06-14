package com.example.salesanalyzerservice.services;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class CSVService {

    @Autowired
    private ResourceLoader resourceLoader;

    public CSVParser readFromCSV(String fileName) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(this.getClass().getResourceAsStream("/" + fileName), StandardCharsets.UTF_8));
        return new CSVParser(bufferedReader, CSVFormat.RFC4180.builder().setHeader().setSkipHeaderRecord(true).build());
    }

    public String readFromTXT(String fileName) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + fileName);
        BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        String data = reader.readLine();
        reader.close();
        return data;
    }

}