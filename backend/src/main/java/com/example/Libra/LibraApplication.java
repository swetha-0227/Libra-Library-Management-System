package com.example.Libra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LibraApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibraApplication.class, args);
	}

}