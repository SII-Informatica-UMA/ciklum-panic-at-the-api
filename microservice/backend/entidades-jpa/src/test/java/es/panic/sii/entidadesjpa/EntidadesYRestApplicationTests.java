package es.panic.sii.entidadesjpa;

import es.panic.sii.controladores.SesionREST;
import es.panic.sii.repositorios.SesionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

@SpringBootTest
class EntidadesYRestApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;
	@Autowired
	private SesionRepository sesionRepo;
	@Test
	void contextLoads() {
	}

}
