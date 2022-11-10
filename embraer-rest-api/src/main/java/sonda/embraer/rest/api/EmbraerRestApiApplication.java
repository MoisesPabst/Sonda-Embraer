package sonda.embraer.rest.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"sonda.embraer.rest.api"})
@SpringBootApplication
public class EmbraerRestApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmbraerRestApiApplication.class, args);
	}

}
