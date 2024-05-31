package es.panic.sii.entidadesjpa;

import es.panic.sii.dtos.SesionDTO;
import es.panic.sii.dtos.SesionNuevaDTO;
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
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.sql.Time;
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
	private String jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE3MTc3MjAwLCJleHAiOjE3MTcxNzc4MDB9.WwbZONcjo4BTZHUrrOApIqlkJXjJCphJnazlW1XKKE13xcR2Z4KL6wL3rtC6NPgW3wnJKCtgMCU8UXVRGBfFDg";
	private MockRestServiceServer mockServer;


	@BeforeEach
	public void init(){
		sesionRepo.deleteAll();
		mockServer = MockRestServiceServer.createServer(otrosServicios);
		//MOCK CENTROS
		mockServer.expect(
						requestTo(UriComponentsBuilder.fromUriString("http://localhost:8090/centro").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("[	" +
								"  {" +
								"    \"nombre\": \"ETSII\"," +
								"    \"direccion\": \" Blvr. Louis Pasteur, 35, Puerto de la Torre, 29071 Málaga\"," +
								"    \"idCentro\": 1" +
								"  		}" +
								"]")
				);
		//MOCK CLIENTE CENTRO
		mockServer.expect(
						requestTo(UriComponentsBuilder.fromUriString("http://localhost:8100/cliente?centro=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("["
								+ "{"
								+ "\"idUsuario\": 1,"
								+ "\"telefono\": \"string\","
								+ "\"direccion\": \"string\","
								+ "\"dni\": \"string\","
								+ "\"fechaNacimiento\": \"2024-05-28\","
								+ "\"sexo\": \"HOMBRE\","
								+ "\"id\": 1"
								+ "},"
								+ "{"
								+ "\"idUsuario\": 2,"
								+ "\"telefono\": \"string\","
								+ "\"direccion\": \"string\","
								+ "\"dni\": \"string\","
								+ "\"fechaNacimiento\": \"2024-05-28\","
								+ "\"sexo\": \"HOMBRE\","
								+ "\"id\": 2"
								+ "}"
								+ "]")
				);
		//MOCK ENTRENA CLIENTE
		mockServer.expect(
						requestTo(UriComponentsBuilder.fromUriString("http://localhost:8120/entrena?cliente=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("["
								+ "{"
								+ "\"idEntrenador\": 1,"
								+ "\"idCliente\": 1,"
								+ "\"especialidad\": \"piernas\","
								+ "\"id\": 1,"
								+ "\"planes\": ["
								+ "{"
								+ "\"fechaInicio\": \"2024-05-28\","
								+ "\"fechaFin\": \"2024-05-28\","
								+ "\"reglaRecurrencia\": \"string\","
								+ "\"idRutina\": 1,"
								+ "\"id\": 1"
								+ "}"
								+ "]"
								+ "}"
								+ "]")
				);
		//MOCK ENTRENADOR CENTRO
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8140/entrenador?centro=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("["
								+ "{"
								+ "\"idUsuario\": 1,"
								+ "\"telefono\": \"string\","
								+ "\"direccion\": \"string\","
								+ "\"dni\": \"string\","
								+ "\"fechaNacimiento\": \"2024-05-28T21:51:14.178Z\","
								+ "\"fechaAlta\": \"2024-05-28T21:51:14.178Z\","
								+ "\"fechaBaja\": \"2024-05-28T21:51:14.178Z\","
								+ "\"especialidad\": \"string\","
								+ "\"titulacion\": \"string\","
								+ "\"experiencia\": \"string\","
								+ "\"observaciones\": \"string\","
								+ "\"id\": 1"
								+ "},"
								+ "{"
								+ "\"idUsuario\": 2,"
								+ "\"telefono\": \"string\","
								+ "\"direccion\": \"string\","
								+ "\"dni\": \"string\","
								+ "\"fechaNacimiento\": \"2024-05-28T21:51:14.178Z\","
								+ "\"fechaAlta\": \"2024-05-28T21:51:14.178Z\","
								+ "\"fechaBaja\": \"2024-05-28T21:51:14.178Z\","
								+ "\"especialidad\": \"string\","
								+ "\"titulacion\": \"string\","
								+ "\"experiencia\": \"string\","
								+ "\"observaciones\": \"string\","
								+ "\"id\": 2"
								+ "}"
								+ "]")
				);

		//MOCK ENTRENA ENTRENADOR
		mockServer.expect(
				requestTo(UriComponentsBuilder.fromUriString("http://localhost:8120/entrena?entrenador=1").build().toUri()))
				.andExpect(method(HttpMethod.GET)).andRespond(withStatus(HttpStatus.OK)
						.contentType(MediaType.APPLICATION_JSON)
						.body("["
								+ "{"
								+ "\"idEntrenador\": 1,"
								+ "\"idCliente\": 1,"
								+ "\"especialidad\": \"piernas\","
								+ "\"id\": 1,"
								+ "\"planes\": ["
								+ "{"
								+ "\"fechaInicio\": \"2024-05-28\","
								+ "\"fechaFin\": \"2024-05-28\","
								+ "\"reglaRecurrencia\": \"string\","
								+ "\"idRutina\": 1,"
								+ "\"id\": 1"
								+ "}"
								+ "]"
								+ "}"
								+ "]")
				);





	}

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
				.header("Authorization", "Bearer "+jwtToken)
				.build();
		return peticion;
	}

	private RequestEntity<Void> get(String scheme, String host, int port, String path,Long idPlan) {
		URI uri = uri(scheme, host, port, path);

		HttpHeaders headers = new HttpHeaders();
		headers.setBearerAuth(jwtToken); // Añadir token de autenticación como Bearer

		String urlTemplate = UriComponentsBuilder.fromHttpUrl(uri.toString())
				.queryParam("plan", idPlan)
				.encode()
				.toUriString();

		var peticion = RequestEntity.get(urlTemplate)
				.accept(MediaType.APPLICATION_JSON)
				.headers(headers)
				.build();
		return peticion;
	}

	private RequestEntity<Void> delete(String scheme, String host, int port, String path) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.delete(uri)
				.header("Authorization", "Bearer "+jwtToken)
				.build();
		return peticion;
	}

	private <T> RequestEntity<T> post(String scheme, String host, int port, String path, T object, Long plan) {
		URI uri = uri(scheme, host,port, path);

		String urlTemplate = UriComponentsBuilder.fromHttpUrl(uri.toString())
                .queryParam("plan", plan)
                .encode()
                .toUriString();
		var peticion = RequestEntity.post(urlTemplate)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer "+jwtToken)
				.body(object);
		return peticion;
	}

	private <T> RequestEntity<T> put(String scheme, String host, int port, String path, T object) {
		URI uri = uri(scheme, host,port, path);
		var peticion = RequestEntity.put(uri)
				.contentType(MediaType.APPLICATION_JSON)
				.header("Authorization", "Bearer "+jwtToken)
				.body(object);
		return peticion;
	}

	@Nested
	@DisplayName("cuando la base de datos está vacía")
	public class BaseDatosVacia {

		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica que no existe")
		public void getSesionByIdNoExist() {
			var peticion = get("http", "localhost", port, "/sesion/1");
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<Sesion>() {
			})	;

			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica que no existe")
		public void putSesionByIdNoExist() {
			assertThat(sesionRepo.count()).isEqualTo(0L);
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

		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {
			var peticion = delete("http", "localhost", port, "/sesion/1");
			var respuesta = restTemplate.exchange(peticion, Void.class);
			assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}

		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan no válido")
		public void getSesionByPlanNoValid() {
			var peticion = get("http", "localhost", port, "/sesion", 12L);
			var respuesta = restTemplate.exchange(peticion, new ParameterizedTypeReference<List<Sesion>>() {});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
		}


		@Test
		@DisplayName("crea correctamente una sesion nueva")
		public void postSesion() {
			var sesion = new Sesion(1L, new Date(), new Date(), "Espalda", "11 largos", new ArrayList<>(), true, new ArrayList<>(), 1L);

			var peticion = post("http", "localhost", port, "/sesion", sesion, 1L);
			var respuesta = restTemplate.exchange(peticion, Void.class);

			assertThat(respuesta.getStatusCode().value()).isEqualTo(201);

		}
		
	}
	
	@Nested
	@DisplayName("cuando la base de datos tiene datos")
	public class BaseDatosLlena {

		@BeforeEach
		public void insertarDatos() {

			Sesion s1 = Sesion.builder().idPlan(1L)
							.inicio(new Date(2024, 5, 12, 10, 0)).fin(new Date(2024, 5, 12, 10, 0))
							.trabajoRealizado("muchisimo").presencial(false).descripcion("Calor").multimedia(null).datosSalud(null)
							.build();
			sesionRepo.save(s1);

			Sesion s2 = Sesion.builder().idPlan(2L)
					.inicio(new Date(2024, 5, 12, 10, 0)).fin(new Date(2024, 5, 12, 10, 0))
					.trabajoRealizado("muchisimo").presencial(false).descripcion("Calor").multimedia(null).datosSalud(null)
					.build();
			sesionRepo.save(s2);

			Sesion s3 = Sesion.builder().idPlan(3L)
					.inicio(new Date(2024, 5, 12, 10, 0)).fin(new Date(2024, 5, 12, 10, 0))
					.trabajoRealizado("muchisimo").presencial(false).descripcion("Calor").multimedia(null).datosSalud(null)
					.build();
			sesionRepo.save(s3);

		}


		@Test
		@DisplayName("obtiene correctamente una sesion especifica")
		public void getSesionById() {
			var peticion = get("http", "localhost", port, "/sesion/6");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
            
		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener una sesion especifica sin acceso autorizado")
		public void getSesionByIdNoAccess() {
			var peticion = get("http", "localhost", port, "/sesion/7");

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<Sesion>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
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
			tmp.setId(6L);
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);
			tmp.setIdPlan(1L);

			var peticion = put("http", "localhost", port, "/sesion/6", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<SesionDTO>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
			assertThat(respuesta.getBody().getDescripcion()).isEqualTo("editado con exito");
		}
		@Test
		@DisplayName("devuelve error cuando intenta modificar una sesion especifica sin acceso autorizado")
		public void putSesionByIdNoAccess() {
			Sesion tmp = new Sesion();
			tmp.setInicio(new Date(2024, 3, 5, 10, 0));
			tmp.setFin(new Date(2024, 3, 6, 11, 0));
			tmp.setDatosSalud(null);
			tmp.setDescripcion("editado con exito");
			tmp.setMultimedia(null);
			tmp.setPresencial(true);
			tmp.setTrabajoRealizado(null);
			tmp.setIdPlan(3L);

			var peticion = put("http", "localhost", port, "/sesion/8", tmp);

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<SesionDTO>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);

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
			tmp.setIdPlan(1L);

			var peticion = put("http", "localhost", port, "/sesion/10", tmp);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
    	//DELETE/sesion/{idSesion}
		@Test
		@DisplayName("elimina correctamente una sesion especifica")
		public void deleteSesionById() {
			var peticion = delete("http", "localhost", port, "/sesion/6");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}
		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica sin acceso autorizado")
		public void deleteSesionByIdNoAccess() {
			var peticion = delete("http", "localhost", port, "/sesion/7");

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<Sesion>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
		}


		@Test
		@DisplayName("devuelve error cuando intenta eliminar una sesion especifica que no existe")
		public void deleteSesionByIdNoExist() {
			var peticion = delete("http", "localhost", port, "/sesion/10");

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<Sesion>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(404);
		}
    	//GET/sesion
		@Test
		@DisplayName("obtiene correctamente las sesiones asociadas a un plan")
		public void getSesionByPlan() {
			var peticion = get("http", "localhost", port, "/sesion", 1L);

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<List<SesionDTO>>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(200);
		}

		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan sin acceso autorizado")
		public void getSesionByPlanNoAccess() {
			var peticion = get("http", "localhost", port, "/sesion", 2L);

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<List<SesionDTO>>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
		}
		@Test
		@DisplayName("devuelve error cuando intenta obtener las sesiones asociadas a un plan que no es válido")
		public void getSesionByPlanNoValid() {
			var peticion = get("http", "localhost", port, "/sesion", 12L);

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<List<SesionDTO>>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
		}

		@Test
		@DisplayName("crea correctamente una sesion nueva")
		public void postSesion() {
			var tmp = Sesion.builder().idPlan(1L).inicio(new Date())
					.fin( new Date()).descripcion("").presencial(true).trabajoRealizado("Espalda")
					.multimedia(null).datosSalud(null).build();

			var peticion = post("http", "localhost", port, "/sesion", tmp, 1L);

            var respuesta = restTemplate.exchange(peticion,
                new ParameterizedTypeReference<SesionDTO>() {
                });

            assertThat(respuesta.getStatusCode().value()).isEqualTo(201);
		}
		@Test
		@DisplayName("devuelve error cuando intenta crear una sesion nueva sin acceso autorizado")
		public void postSesionNoAccess() {
			var tmp = Sesion.builder().idPlan(3L).inicio(new Date())
					.fin( new Date()).descripcion("").presencial(true).trabajoRealizado("Espalda")
					.multimedia(null).datosSalud(null).build();

			var peticion = post("http", "localhost", port, "/sesion", tmp, 3L);

			var respuesta = restTemplate.exchange(peticion,
					new ParameterizedTypeReference<SesionDTO>() {
					});

			assertThat(respuesta.getStatusCode().value()).isEqualTo(401);
		}

		@Test
		@DisplayName("devuelve confirmación de que dos sesiones son distintas dependiendo del plan")
		public void devuelveConfirmacionSesionesDistintas(){
			SesionNuevaDTO tmp = SesionNuevaDTO.builder().idPlan(1L).build();
			tmp.equals(SesionNuevaDTO.builder().idPlan(1L).build());
			tmp.equals(SesionNuevaDTO.builder().idPlan(2L).build());

			assertThat(tmp.equals(SesionNuevaDTO.builder().idPlan(1L).build())).isEqualTo(true);
			assertThat(tmp.equals(SesionNuevaDTO.builder().idPlan(2L).build())).isEqualTo(false);
		}
	}

	 

	

}