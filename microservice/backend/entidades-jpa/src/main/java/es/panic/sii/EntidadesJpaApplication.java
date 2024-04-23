package es.panic.sii;

import es.panic.sii.entidadesjpa.SesionDTO;
import es.panic.sii.repositorios_spring.SesionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication(scanBasePackageClasses = {SesionRepository.class})
public class EntidadesJpaApplication implements CommandLineRunner {
	@Autowired
	private SesionRepository repository;


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
			SesionDTO s1 = new SesionDTO(47L, new Date(), new Date(), "2", "3", new ArrayList<String>(), false, new ArrayList<String>());
			repository.save(s1);
			//SesionDTO s = repository.findById(Long.parseLong(args[0])).get();

			System.out.println(repository.findAll());
		}
	}
}
