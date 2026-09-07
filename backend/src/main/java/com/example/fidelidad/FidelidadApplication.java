package com.example.fidelidad;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class FidelidadApplication {

	public static void main(String[] args) {
		SpringApplication.run(FidelidadApplication.class, args);
	}
}