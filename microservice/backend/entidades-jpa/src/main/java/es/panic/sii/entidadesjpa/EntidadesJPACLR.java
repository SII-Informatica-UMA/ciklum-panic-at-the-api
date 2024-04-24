package es.panic.sii.entidadesjpa;

import es.panic.sii.repositorios_spring.SesionRepository;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;


@Component
public class EntidadesJPACLR implements CommandLineRunner {

	@Autowired
	private SesionRepository repository;
	public EntidadesJPACLR(SesionRepository repository){ this.repository = repository; }
	private static Logger LOG = LoggerFactory
			.getLogger(EntidadesJPACLR.class);


	@Override
	@Transactional
	public void run(String... args) throws Exception {

		LOG.info("RUN: EJECUTANDO COMMAND LINE RUNNER");

		for(Long i = 1L; i <= 5L; i++){
			SesionDTO s = new SesionDTO(i, new Date(), new Date(), "trabajo " + i, "desc " + i, new ArrayList<String>(), false, new ArrayList<String>());
			repository.save(s);
		}
		Iterable<SesionDTO> sesiones = repository.findAll();
		Iterator<SesionDTO> itSesiones = sesiones.iterator();
		while(itSesiones.hasNext())
			LOG.info("Sesiones actuales {}", itSesiones.next().toString());
		//repository.save(new SesionDTO(1L, new Date(), new Date(), "2", "3", new ArrayList<String>(), false, new ArrayList<String>()));
		LOG.info("Número de sesiones: {} ", repository.count());

		repository.deleteById(1L);
		LOG.info("Número de sesiones tras borrar la primera: {} ", repository.count());

		LOG.info("RUN: TERMINANDO COMMAND LINE RUNNER");
	}
}