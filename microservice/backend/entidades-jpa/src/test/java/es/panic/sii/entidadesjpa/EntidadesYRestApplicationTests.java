package es.panic.sii.entidadesjpa;

import es.panic.sii.dtos.SesionDTO;
import es.panic.sii.entidades.Sesion;
import es.panic.sii.repositorios.SesionRepository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;


import es.panic.sii.servicios.excepciones.SesionNoExiste;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.test.annotation.DirtiesContext;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.*;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@DisplayName("En el servicio de sesiones")
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
class EntidadesYRestApplicationTests {
	@Autowired
	private TestRestTemplate restTemplate;
	@Autowired
	private RestTemplate otrosServicios;
	@Value(value="${local.server.port}")
	private int port;
	@Autowired
	private SesionRepository sesionRepo;
	private String jwtToken;

	private MockRestServiceServer mockServer;
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
		URI uri = UriComponentsBuilder.newInstance()
				.scheme(scheme)
				.host(host)
				.port(port)
				.path(path)
				.build()
				.toUri();
		var peticion = RequestEntity.get(uri).header("Authorization", "Bearer "+jwtToken)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		return peticion;
	}
	
	private RequestEntity<Void> get(String scheme, String host, int port, String path, Long plan) {
		URI uri = uri(scheme, host,port, path);
		String urlTemplate = UriComponentsBuilder.fromHttpUrl(uri.toString()).queryParam("plan", plan).encode().toUriString();
		var peticion = RequestEntity.get(urlTemplate)
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
		assertThat(actual.getId()).isEqualTo(expected.getId());
		assertThat(actual.getInicio()).isEqualTo(expected.getInicio());
		assertThat(actual.getFin()).isEqualTo(expected.getFin());
		assertThat(actual.getTrabajoRealizado()).isEqualTo(expected.getTrabajoRealizado());
		assertThat(actual.getDescripcion()).isEqualTo(expected.getDescripcion());
	}

	@BeforeEach
	public void init(){
		sesionRepo.deleteAll();

		mockServer = MockRestServiceServer.createServer(otrosServicios);

		//MOCK ENTRENADOR
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8080/entrenador?centro=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[\n" +
								"  {\n" +
								"    \"idUsuario\": 1,\n" +
								"    \"telefono\": \"123456789\",\n" +
								"    \"direccion\": \"Corregidor Francisco\",\n" +
								"    \"dni\": \"454545458\",\n" +
								"    \"fechaNacimiento\": \"2024-05-30T17:00:48.131Z\",\n" +
								"    \"fechaAlta\": \"2024-05-30T17:00:48.131Z\",\n" +
								"    \"fechaBaja\": \"2024-05-30T17:00:48.131Z\",\n" +
								"    \"especialidad\": \"Cardio\",\n" +
								"    \"titulacion\": \"Grado Superior de Deporte\",\n" +
								"    \"experiencia\": \"2 años\",\n" +
								"    \"observaciones\": \"Ninguna\",\n" +
								"    \"id\": 1\n" +
								"  }\n" +
								"]")
		);
		//MOCK CLIENTE
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8080/cliente?centro=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[\n" +
								"  	{\n" +
								"    \"idUsuario\": 2,\n" +
								"    \"telefono\": \"987654321\",\n" +
								"    \"direccion\": \"Alameda Principal, 5 \",\n" +
								"    \"dni\": \"12345678V\",\n" +
								"    \"fechaNacimiento\": \"2024-05-30T17:15:13.717Z\",\n" +
								"    \"sexo\": \"HOMBRE\",\n" +
								"    \"id\": 2\n" +
								"  }\n" +
								"]")
				);
		//MOCK ENTRENA
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8080/entrena?entrenador=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[\n" +
								"  {\n" +
								"    \"idEntrenador\": 1,\n" +
								"    \"idCliente\": 2,\n" +
								"    \"especialidad\": \"Cardio\",\n" +
								"    \"id\": 1,\n" +
								"    \"planes\": [\n" +
								"      {\n" +
								"        \"fechaInicio\": \"2024-05-30T17:18:52.551Z\",\n" +
								"        \"fechaFin\": \"2024-05-30T17:18:52.551Z\",\n" +
								"        \"reglaRecurrencia\": \"Fines de semana\",\n" +
								"        \"idRutina\": 1,\n" +
								"        \"id\": 1\n" +
								"      }\n" +
								"    ]\n" +
								"  }\n" +
								"]")
				);

		mockServer.expect(
						requestTo(UriComponentsBuilder.fromUriString("http://localhost:8080/entrena?cliente=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[\n" +
								"  {\n" +
								"    \"idEntrenador\": 1,\n" +
								"    \"idCliente\": 2,\n" +
								"    \"especialidad\": \"Cardio\",\n" +
								"    \"id\": 1,\n" +
								"    \"planes\": [\n" +
								"      {\n" +
								"        \"fechaInicio\": \"2024-05-30T17:18:52.551Z\",\n" +
								"        \"fechaFin\": \"2024-05-30T17:18:52.551Z\",\n" +
								"        \"reglaRecurrencia\": \"Fines de semana\",\n" +
								"        \"idRutina\": 1,\n" +
								"        \"id\": 1\n" +
								"      }\n" +
								"    ]\n" +
								"  }\n" +
								"]")
				);

		//MOCK CENTROS
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8080/centro").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[	\n" +
									 "  {\n" +
								"    \"nombre\": \"ETSII\",\n" +
								"    \"direccion\": \" Blvr. Louis Pasteur, 35, Puerto de la Torre, 29071 Málaga\",\n" +
								"    \"idCentro\": 1\n" +
								"  		}\n" +
									  "]")
				);

	}

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
			var peticion = get("http", "localhost", port, "/sesion/1");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<Sesion>() {
			})	;

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
    	//PUT/sesion/{idSesion}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica sin acceso autorizado")
		public void putSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica que no existe")
		public void putSesionByIdNoExist() {
			var sesion = SesionDTO.builder()
					.id(1L)
					.idPlan(1L)
					.inicio(new Timestamp(2024, 5, 12, 13, 41, 50, 10))
					.fin(new Timestamp(2024, 5, 12, 14, 41, 0, 20))
					.trabajoRealizado("Espalda")
					.descripcion("Peso muerto")
					.multimedia(new ArrayList<String>())
					.presencial(true)
					.datosSalud(new ArrayList<String>())
					.build();

			var peticion = put("http", "localhost", port, "/sesion/1", sesion);
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<Sesion>() {
			});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
			//new SesionNoExiste();
		}
    	//DELETE/sesion/{idSesion}
		@Disabled
		@Test
		@DisplayName("elimina correctamente una sesion")
		public void deleteSesion(){
			var peticion = delete("http", "localhost", port, "/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica sin acceso autorizado")
		public void deleteSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {
			var peticion = delete("http", "localhost", port, "/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
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
		@Disabled
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan que no existe")
		public void getSesionByPlanNoExist() {
			var peticion = get("http", "localhost", port, "/sesion");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
			assertThat(respuesta.getBody()).isEmpty();
		}

    	//POST/sesion
		@Disabled
		@Test
		@DisplayName("crea correctamente una sesion nueva")
		public void postSesion() {
			var sesion = new Sesion(1L, new Date(), new Date(), "Espalda", "11 largos", new ArrayList<>(), true, new ArrayList<>(), 1L);

			var peticion = post("http", "localhost", port, "/sesion", sesion);
			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode().value()).isEqualTo(201);

			assertThat(respuesta.getHeaders().get("location").get(0)).startsWith("http://localhost:"+port+"sesion");
			List<Sesion> bd = sesionRepo.findAll();
			assertThat(bd).hasSize(1);
			assertThat(respuesta.getHeaders().get("location").get(0)).endsWith("/"+bd.get(0).getId());

			assertThat(sesion.getId().equals(bd.get(0).getId()));

		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion nueva sin acceso autorizado")
		public void postSesionNoAccess() {

		}
	}
	/*
	@Nested
	@DisplayName("cuando la base de datos tiene datos")
	public class BaseDatosLlena {

		@BeforeEach
		public void insertarDatos() {
			Sesion ses1 = new Sesion();
			ses1.setInicio(new Date(2024, 5, 12, 10, 0));
			ses1.setFin(new Date(2024, 5, 12, 11, 0));
			ses1.setDatosSalud(null);
			ses1.setDescripcion("esta es la primera sesion");
			ses1.setId(1L);
			ses1.setMultimedia(null);
			ses1.setPresencial(true);
			ses1.setTrabajoRealizado(null);
			ses1.setIdPlan(1L);
			Sesion ses2 = new Sesion();
			ses2.setInicio(new Date(2024, 8, 20, 10, 0));
			ses2.setFin(new Date(2024, 8, 20, 11, 0));
			ses2.setDatosSalud(null);
			ses2.setDescripcion(null);
			ses2.setId(2L);
			ses2.setMultimedia(null);
			ses2.setPresencial(true);
			ses2.setTrabajoRealizado(null);
			ses2.setIdPlan(2L);
			Sesion ses3 = new Sesion();
			ses3.setInicio(new Date(2024, 12, 25, 12, 0));
			ses3.setFin(new Date(2024, 12, 25, 15, 0));
			ses3.setDatosSalud(null);
			ses3.setDescripcion(null);
			ses3.setId(3L);
			ses3.setMultimedia(null);
			ses3.setPresencial(true);
			ses3.setTrabajoRealizado(null);
			ses3.setIdPlan(3L);
			
			sesionRepo.save(ses1);
			sesionRepo.save(ses2);
			sesionRepo.save(ses3);
		}

		//GET/sesion/{idSesion}
		@Test
		@DisplayName("obtiene correctamente una sesion especifica")
		public void getSesionById() {
			var peticion = get("http", "localhost", port, "/sesion/1");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(respuesta.getBody().getDescripcion()).isEqualTo("esta es la primera sesion");
		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica sin acceso autorizado")
		public void getSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica que no existe")
		public void getSesionByIdNoExist() {
			var peticion = get("http", "localhost", port, "/sesion/5");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
    	//PUT/sesion/{idSesion}
		@Test
		@DisplayName("modifica correctamente una sesion especifica")
		public void putSesionById() {
			Sesion tmp = new Sesion();
			tmp.setInicio(new Date(2024, 3, 5, 10, 0));
			tmp.setFin(new Date(2024, 3, 6, 11, 0));
			tmp.setDatosSalud(null);
			tmp.setDescripcion("editado con exito");
			tmp.setId(1L);
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);

			var peticion = put("http", "localhost", port, "/sesion/1", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("editado con exito");
		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica sin acceso autorizado")
		public void putSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica que no existe")
		public void putSesionByIdNoExist() {
			Sesion tmp = new Sesion();
			tmp.setInicio(new Date(2024, 3, 5, 10, 0));
			tmp.setFin(new Date(2024, 3, 6, 11, 0));
			tmp.setDatosSalud(null);
			tmp.setDescripcion("editado con exito");
			tmp.setId(1L);
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);

			var peticion = put("http", "localhost", port, "/sesion/6", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
    	//DELETE/sesion/{idSesion}
		@Test
		@DisplayName("elimina correctamente una sesion especifica")
		public void deleteSesionById() {
			var peticion = delete("http", "localhost", port, "/sesion/1");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            assertThat(sesionRepo.count()).isEqualTo(2);
		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica sin acceso autorizado")
		public void deleteSesionByIdNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {
			var peticion = delete("http", "localhost", port, "/sesion/8");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
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
			Sesion tmp = new Sesion();
			tmp.setInicio(new Date(2024, 3, 5, 10, 0));
			tmp.setFin(new Date(2024, 3, 6, 11, 0));
			tmp.setDatosSalud(null);
			tmp.setDescripcion("hellooo");
			tmp.setId(4L);
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);

			var peticion = post("http", "localhost", port, "/sesion", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("hellooo");
		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion nueva sin acceso autorizado")
		public void postSesionNoAccess() {

		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion que ya existe")
		public void postSesionNoExist() {
			Sesion tmp = new Sesion();
			tmp.setInicio(new Date(2024, 5, 12, 10, 0));
			tmp.setFin(new Date(2024, 5, 12, 11, 0));
			tmp.setDatosSalud(null);
			tmp.setDescripcion("esta es la primera sesion");
			tmp.setId(1L);
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);

			var peticion = post("http", "localhost", port, "/sesion", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("hellooo");
		}
	}

	 */

	
}
