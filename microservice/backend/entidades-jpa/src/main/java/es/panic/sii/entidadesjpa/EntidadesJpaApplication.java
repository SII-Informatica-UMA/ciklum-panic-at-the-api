package es.panic.sii.entidadesjpa;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EntidadesJpaApplication implements CommandLineRunner {
	//Definir el repository
	public static void main(String[] args) {
		SpringApplication.run(EntidadesJpaApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		//Aqui irán las pruebas
		//
	}
}
