package es.panic.sii.controladores;


import java.net.URI;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import es.panic.sii.dtos.SesionDTO;
import es.panic.sii.entidades.Sesion;
import es.panic.sii.servicios.SesionService;

@RestController
@RequestMapping({"/sesion"})
public class SesionREST {

    private SesionService sesion;

    public SesionREST(SesionService sesion){
        this.sesion = sesion;
    }
    //GET
    @GetMapping("{id}")
    @ResponseStatus(code=HttpStatus.OK)
    //no estoy segura de ponerlo
    //quiero los detalles de la sesion
    public SesionDTO detallesSesionPorId(@PathVariable Long id, UriComponentsBuilder uriBuilder){
        var sesionCualquiera = sesion.obtenerSesionPorId(id);
        return SesionDTO.fromSesion(sesionCualquiera, sesionesUriBuilder(uriBuilder.build()));

    }
    public static Function<Long, URI> sesionesUriBuilder(UriComponents uriBuilder) {
        ;
		return id -> UriComponentsBuilder.newInstance().uriComponents(uriBuilder).path("/sesion")
				.path(String.format("/%d", id))
				.build()
				.toUri();
	}
    //PUT
    @PutMapping("{id}")
    public void actualizarSesion(@PathVariable Long id, @RequestBody SesionDTO sesiondesdeDto){
        Sesion entidadSesion = sesiondesdeDto.sesion();
		entidadSesion.setId(id);
		sesion.editarSesion(entidadSesion);
    }
    //DELETE
    @DeleteMapping("{id}")
    public void eliminarSesion(@PathVariable Long id){
        sesion.borrarSesion(id);
    }

    
    
    
    // GET /sesion
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<SesionDTO> obtenerTodasLasSesiones(UriComponentsBuilder uriBuilder) {
        List<Sesion> sesiones = sesion.obtenerTodasLasSesiones();
        return sesiones.stream()
                .map(s -> SesionDTO.fromSesion(s, sesionesUriBuilder(uriBuilder.build())))
                .collect(Collectors.toList());
    }

    // POST /sesion

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public SesionDTO crearSesion(@RequestBody SesionDTO nuevaSesionDTO, UriComponentsBuilder uriBuilder) {
        Sesion nuevaSesion = nuevaSesionDTO.sesion();
        Sesion sesionCreada = sesion.agregarSesion(nuevaSesion);
        return SesionDTO.fromSesion(sesionCreada, productoUriBuilder(uriBuilder.build()));
    }
    
    
}
