package com.toilamanh.toilamanh;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LearningApp {
	public static void main(String[] args) {
		SpringApplication.run(LearningApp.class, args);
	}
}
