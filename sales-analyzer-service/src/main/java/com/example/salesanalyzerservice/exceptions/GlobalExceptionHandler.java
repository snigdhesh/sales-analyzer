package com.example.salesanalyzerservice.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(value = {Exception.class})
    public void handleGenericExceptions(Exception ex) {
        log.info("EXCEPTION={}||EXCEPTION_MESSAGE={}", ex.getClass().getSimpleName(), ex.getMessage());
    }
}
