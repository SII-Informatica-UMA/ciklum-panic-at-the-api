package es.panic.sii.controladores;


import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import es.panic.sii.dtos.SesionNuevaDTO;
import es.panic.sii.servicios.excepciones.AccesoNoAutorizado;
import es.panic.sii.servicios.excepciones.SesionNoExiste;
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

    @GetMapping
    public List<SesionDTO> obtenerSesionesPorPlan(@RequestParam(name="plan") Long idPlan){
        return this.sesionService.obtenerSesionPorPlan(idPlan)
                .stream()
                .map(SesionDTO::convertirSesionToDTO)
                .toList();
    }

    //POST
    @PostMapping
    public ResponseEntity<SesionDTO> crearSesion(@RequestParam(name="plan",required = true) Long idPlan, @RequestBody SesionNuevaDTO nueva, UriComponentsBuilder uriBuilder) {
        Sesion s = nueva.convertToSesion();
        s.setIdPlan(idPlan);
        Sesion ses = this.sesionService.agregarSesion(s);
        return ResponseEntity.ok(SesionDTO.convertirSesionToDTO(ses));
    }

    //GET ID
    @GetMapping("/{idSesion}")
    public ResponseEntity<SesionDTO> detallesSesionPorId(@PathVariable Long idSesion) {
        Optional<SesionDTO> sesionCualquiera = this.sesionService.obtenerSesionPorId(idSesion).map(SesionDTO ::convertirSesionToDTO);
        return ResponseEntity.of(sesionCualquiera);
    }

    public static Function<Sesion, URI> sesionUriBuilder(UriComponents uriBuilder) {
		return (s) -> UriComponentsBuilder.newInstance().uriComponents(uriBuilder)
                .path("/sesion")
				.path(String.format("/%d", s.getId()))
				.build()
				.toUri();
	}


    //PUT ID
    @PutMapping("/{idSesion}")
    public ResponseEntity<SesionDTO> actualizarSesion(@PathVariable Long idSesion, @RequestBody SesionDTO sesion){
        sesion.setId(idSesion);
        Sesion ses = this.sesionService.agregarSesion(sesion.convertToSesion());
        return ResponseEntity.ok(SesionDTO.convertirSesionToDTO(ses));
    }
    //DELETE ID
    @DeleteMapping("/{idSesion}")
    public void eliminarSesion(@PathVariable Long idSesion){
        sesionService.borrarSesion(idSesion);
    }


    /*
    @GetMapping
    public List<SesionDTO> obtenerLasSesionesPorPlan(@RequestParam Long plan) {
        List<Sesion> sesiones = sesionRepository.obtenerSesiones(plan);
        return sesiones.stream()
                .map(s -> SesionDTO.fromSesion(s, sesionesUriBuilder(uriBuilder.build())))
                .collect(Collectors.toList());
    }
    */
    //GET



    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({SesionNoExiste.class})
    public void handleSesionNoExiste(SesionNoExiste e) {
    }

    @ExceptionHandler({AccesoNoAutorizado.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public void handleAccesoNoAutorizado(AccesoNoAutorizado e) {
    }
    
}
