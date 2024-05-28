package es.panic.sii.controladores;


import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import es.panic.sii.dtos.SesionDTO;
import es.panic.sii.entidades.Sesion;
import es.panic.sii.servicios.SesionService;

@RestController
@RequestMapping({"/sesion"})
public class SesionREST {

    private SesionService sesionService;

    public SesionREST(SesionService sesion){
        this.sesionService = sesion;
    }


    //GET
    @GetMapping("/{idSesion}")
    public ResponseEntity<SesionDTO> detallesSesionPorId(@PathVariable Long idSesion) {
        Optional<SesionDTO> sesionCualquiera = this.sesionService.obtenerSesionPorId(idSesion).map(SesionDTO ::convertirSesionToDTO);
        return ResponseEntity.of(sesionCualquiera);
    }


    public static Function<Sesion, URI> sesionUriBuilder(UriComponents uriBuilder) {
		return sesion -> UriComponentsBuilder.newInstance().uriComponents(uriBuilder)
                .path("/sesion")
				.path(String.format("/%d", sesion.getId()))
				.build()
				.toUri();
	}


    //PUT
    @PutMapping("/{idSesion}")
    public ResponseEntity<SesionDTO> actualizarSesion(@PathVariable Long idSesion, @RequestBody SesionDTO sesion){
        sesion.setId(idSesion);
        Sesion ses = this.sesionService.agregarSesion(sesion.convertToSesion());
        return ResponseEntity.ok(SesionDTO.convertirSesionToDTO(ses));
    }
    //DELETE
    @DeleteMapping("/{idSesion}")
    public void eliminarSesion(@PathVariable Long idSesion){
        sesionService.borrarSesion(idSesion);
    }


    // GET /sesion
    /*
    @GetMapping
    public List<SesionDTO> obtenerLasSesionesPorPlan(@RequestParam Long plan) {
        List<Sesion> sesiones = sesionRepository.obtenerSesiones(plan);
        return sesiones.stream()
                .map(s -> SesionDTO.fromSesion(s, productoUriBuilder(uriBuilder.build())))
                .collect(Collectors.toList());
    }
    */

    @GetMapping
    public List<SesionDTO> obtenerSesionesPorPlan(@RequestParam Long plan){
        return this.sesionService.obtenerSesionPorPlan(plan).stream().map(SesionDTO::convertirSesionToDTO).toList();
    }


    // POST /sesion
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public SesionDTO crearSesion(@RequestBody SesionDTO nuevaSesionDTO, UriComponentsBuilder uriBuilder) {
        Sesion nuevaSesion = nuevaSesionDTO.convertirSesionToDTO();
        Sesion sesionCreada = sesionService.agregarSesion(nuevaSesion);
        return SesionDTO.convertirSesionToDTO(sesionCreada);
    }
    
    
}
