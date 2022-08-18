package com.example.secure_networks.backend;

import java.io.File;
import java.io.IOException;

import com.example.secure_networks.backend.data.PasswordConfig;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static PasswordConfig passwordConfig;

	public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper jackson = new ObjectMapper();
		passwordConfig = jackson.readValue(
				new File("src/main/resources/passwordConfiguration.json"),
				PasswordConfig.class);
		SpringApplication.run(Application.class, args);
	}

}