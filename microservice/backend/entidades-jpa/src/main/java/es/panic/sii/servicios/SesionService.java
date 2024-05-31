package es.panic.sii.servicios;

import es.panic.sii.entidades.Sesion;
import es.panic.sii.repositorios.SesionRepository;
import es.panic.sii.security.JwtUtil;
import es.panic.sii.security.SecurityConfguration;
import es.panic.sii.servicios.excepciones.AccesoNoAutorizado;
import es.panic.sii.servicios.excepciones.SesionNoExiste;
import jakarta.transaction.Transactional;

import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriBuilderFactory;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@Transactional
public class SesionService {

    private SesionRepository repo; //solo hay un repositorio porque solo hay una entidad
    private JwtUtil jwtUtil;
    @Autowired
	private RestTemplate restTemplate;

    public SesionService(SesionRepository repo) {
        this.repo = repo;
        this.jwtUtil = new JwtUtil();
    }


    public Sesion agregarSesion(Sesion s){
        checkSeguridad(s.getIdPlan());
		repo.save(s);
		return s;
    }
//mejor borrarla dado un id
    public void borrarSesion(Long id){
        if (repo.existsById(id)) {
            checkSeguridad(repo.getReferenceById(id).getIdPlan());
            repo.deleteById(id);
        }else{
            throw new SesionNoExiste();
        }

    }
    //me pasan un id y una sesion y sustituyo la sesion que tenga ese id por el sesion
    public Sesion editarSesion(Sesion s){ //quiero editar el id
        checkSeguridad(s.getIdPlan());
        if (repo.existsById(s.getId())) {
			repo.save(s);
            return s;
		} else {
			throw new SesionNoExiste();
		}
    }
    public Optional<Sesion> obtenerSesionPorId(Long id){
        if(repo.existsById(id)){
            checkSeguridad(repo.getReferenceById(id).getIdPlan());
            return repo.findById(id);
        }else{
            throw new SesionNoExiste();
        }
    }
    /*
   public List<Sesion> obtenerTodasLasSesiones() {
        return repo.findAll();
    }
     */

    public List<Sesion> obtenerSesionPorPlan(Long plan){
        checkSeguridad(plan);
        List<Sesion> lista = repo.findSesionesByIdPlan(plan);
        return lista;

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

    private RequestEntity<Void> get(String scheme, String host, int port, String path, String jwtToken) {
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

    private RequestEntity<Void> get(String scheme, String host, int port, String path, String jwtToken, String query ,Long queryVal) {
		URI uri = uri(scheme, host,port, path);
		String urlTemplate = UriComponentsBuilder.fromHttpUrl(uri.toString()).queryParam(query, queryVal).encode().toUriString();
		var peticion = RequestEntity.get(urlTemplate)
				.accept(MediaType.APPLICATION_JSON)
				.build();
		return peticion;
	}

    public void checkSeguridad(Long idPlan){


            Set<Long> planesRel = new HashSet<>();
            Optional<UserDetails> usuario = SecurityConfguration.getAuthenticatedUser();
            String jwtToken = jwtUtil.generateToken(usuario.get());

            var petCentros = get("http","localhost",8090,"/centro",jwtToken);

            restTemplate.exchange(petCentros,
                    new ParameterizedTypeReference<List<Map<String, Object>>>() {}).getBody().stream().forEach(centro -> {
                Long idCentro = Long.parseLong(centro.get("idCentro").toString());
                
                addPlanesCliente(planesRel,jwtToken, idCentro, usuario);
                addPlanesEntrenador(planesRel,jwtToken, idCentro, usuario);
            });

            if (!planesRel.contains(idPlan)) throw new AccesoNoAutorizado();
        }

    private void addPlanesEntrenador(Set<Long> planesRel, String jwtToken, Long idCentro, Optional<UserDetails> usuario) {
        var petClientes = get("http","localhost",8100,"/cliente",jwtToken, "centro", idCentro);

                restTemplate.exchange(petClientes,
                        new ParameterizedTypeReference<List<Map<String, Object>>>(){}).getBody().stream().forEach(cliente -> {
                    if(Long.valueOf(cliente.get("idUsuario").toString()).equals(Long.valueOf(usuario.get().getUsername()))){
                        Long idCliente = Long.parseLong(cliente.get("id").toString());

                        var petEntrena = get("http","localhost",8120,"/entrena",jwtToken, "cliente", idCliente);

                        restTemplate.exchange(petEntrena, new ParameterizedTypeReference<List<Map<String,Object>>>() {
                        }).getBody().stream().forEach(entrena -> {
                            @SuppressWarnings("unchecked")
                            List<Map<String, Object>> listaPlanes = (List<Map<String, Object>>) entrena.get("planes");
                            listaPlanes.stream().forEach(plan -> {
                                planesRel.add(Long.valueOf(plan.get("id").toString()));
                            });
                        });
                    }
                });
    }

    private void addPlanesCliente(Set<Long> planesRel, String jwtToken, Long idCentro, Optional<UserDetails> usuario) {
        var petEntrenadores = get("http","localhost",8140,"/entrenador",jwtToken, "centro", idCentro);

                restTemplate.exchange(petEntrenadores,
                        new ParameterizedTypeReference<List<Map<String, Object>>>(){}).getBody().stream().forEach(entrenador -> {

                    if(Long.valueOf(entrenador.get("idUsuario").toString()).equals(Long.valueOf(usuario.get().getUsername()))){
                        Long idEntrenador = Long.parseLong(entrenador.get("id").toString());

                        var petEntrena = get("http","localhost",8120,"/entrena",jwtToken, "entrenador", idEntrenador);

                        restTemplate.exchange(petEntrena, new ParameterizedTypeReference<List<Map<String,Object>>>() {
                        }).getBody().stream().forEach(entrena -> {
                            @SuppressWarnings("unchecked")
                            List<Map<String, Object>> listaPlanes = (List<Map<String, Object>>) entrena.get("planes");
                            listaPlanes.stream().forEach(plan -> {
                                planesRel.add(Long.valueOf(plan.get("id").toString()));
                            });
                        });
                    }
                });
    }
}