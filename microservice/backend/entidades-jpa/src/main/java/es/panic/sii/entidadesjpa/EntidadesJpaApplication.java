package es.panic.sii.entidadesjpa;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import es.panic.sii.repositorios_spring.SesionRepository;

@SpringBootApplication
public class EntidadesJpaApplication implements CommandLineRunner {
	private SesionRepository repository;

	/*Da error el constructor, mirarlo mejor
	public EntidadesJpaApplication(SesionRepository repository){
		this.repository = repository;
	}*/
	public static void main(String[] args) {
		System.out.println("STARTING THE APPLICATION");
		SpringApplication.run(EntidadesJpaApplication.class, args);
		System.out.println("APPLICATION FINISHED");
	}

	@Override
	public void run(String... args) throws Exception {
		//Aqui irán las pruebas
		//
		if(args.length > 0){	//Test, probar, no es definitivo
			SesionDTO s = repository.findById(Long.parseLong(args[0])).get();
			System.out.println(s);
		}
	}
}