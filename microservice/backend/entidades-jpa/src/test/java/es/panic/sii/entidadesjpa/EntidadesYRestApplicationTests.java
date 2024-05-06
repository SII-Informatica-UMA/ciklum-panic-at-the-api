package es.panic.sii.entidadesjpa;

import es.panic.sii.controladores.SesionREST;
import es.panic.sii.entidades.Sesion;
import es.panic.sii.repositorios.SesionRepository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;

import java.net.URI;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.annotation.DirtiesContext.ClassMode;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DisplayName("En el servicio de sesiones")
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class EntidadesYRestApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;
	@Value(value="${local.server.port}")
	private int port;
	@Autowired
	private SesionRepository sesionRepo;
	private URI uri(String scheme, String host, int port, String ...paths) {
		UriBuilderFactory ubf = new DefaultUriBuilderFactory();
		UriBuilder ub = ubf.builder()
				.scheme(scheme)
				.host(host).port(port);
		for (String path: paths) {
			ub = ub.path(path);
		}
		return ub.build();
	}

	private RequestEntity<Void> get(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.get(uri)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		return peticion;
	}

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.delete(uri)
				.build();
		return peticion;
	}

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.post(uri)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.put(uri)
				.contentType(MediaType.APPLICATION_JSON)
				.body(object);
		return peticion;
	}
	
	private void compruebaCampos(Sesion expected, Sesion actual) {	
		assertThat(actual.getIdSesion()).isEqualTo(expected.getIdSesion());
		assertThat(actual.getInicio()).isEqualTo(expected.getInicio());
		assertThat(actual.getFin()).isEqualTo(expected.getFin());
		assertThat(actual.getTrabajoRealizado()).isEqualTo(expected.getTrabajoRealizado());
		assertThat(actual.getDescripcion()).isEqualTo(expected.getDescripcion());
	}

	@Test
	void contextLoads() {}

	@Nested
	@DisplayName("cuando la base de datos está vacía")
	public class BaseDatosVacia {

		//GET/sesion/{idSesion}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica sin acceso autorizado")
		public void getSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica que no existe")
		public void getSesionByIdNoExist() {

		}
    	//PUT/sesion/{idSesion}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica sin acceso autorizado")
		public void putSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica que no existe")
		public void putSesionByIdNoExist() {

		}
    	//DELETE/sesion/{idSesion}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica sin acceso autorizado")
		public void deleteSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {

		}
    	//GET/sesion
		@Test
		@DisplayName("obtiene correctamente las sesiones asociadas a un plan")
		public void getSesionByPlan() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan sin acceso autorizado")
		public void getSesionByPlanNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan que no existe")
		public void getSesionByPlanNoExist() {

		}

    	//POST/sesion
		@Test
		@DisplayName("crea correctamente una sesion nueva")
		public void postSesion() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion nueva sin acceso autorizado")
		public void postSesionNoAccess() {

		}
	}

	@Nested
	@DisplayName("cuando la base de datos tiene datos")
	public class BaseDatosLlena {

		@BeforeEach
		public void insertarDatos() {

		}

		//GET/sesion/{idSesion}
		@Test
		@DisplayName("obtiene correctamente una sesion especifica")
		public void getSesionById() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica sin acceso autorizado")
		public void getSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica que no existe")
		public void getSesionByIdNoExist() {

		}
    	//PUT/sesion/{idSesion}
		@Test
		@DisplayName("modifica correctamente una sesion especifica")
		public void putSesionById() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica sin acceso autorizado")
		public void putSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica que no existe")
		public void putSesionByIdNoExist() {

		}
    	//DELETE/sesion/{idSesion}
		@Test
		@DisplayName("elimina correctamente una sesion especifica")
		public void deleteSesionById() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica sin acceso autorizado")
		public void deleteSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {

		}
    	//GET/sesion
		@Test
		@DisplayName("obtiene correctamente las sesiones asociadas a un plan")
		public void getSesionByPlan() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan sin acceso autorizado")
		public void getSesionByPlanNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan que no existe")
		public void getSesionByPlanNoExist() {

		}

    	//POST/sesion
		@Test
		@DisplayName("crea correctamente una sesion nueva")
		public void postSesion() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion nueva sin acceso autorizado")
		public void postSesionNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion que ya existe")
		public void postSesionNoExist() {

		}
	}
}
