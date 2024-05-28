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


    //GET ID
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
    @GetMapping
    public List<SesionDTO> obtenerSesionesPorPlan(@RequestParam Long plan){
        return this.sesionService.obtenerSesionPorPlan(plan)
                .stream()
                .map(SesionDTO::convertirSesionToDTO)
                .toList();
    }


    //POST
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ResponseEntity<SesionDTO> crearSesion(@RequestBody SesionDTO nuevaSesionDTO, @PathVariable Long idSesion) {
        //tengo que del sesionService sacar la sesion
       /* Optional<Sesion> nuevaSesion = this.sesionService.obtenerSesionPorId(idSesion);  
        Sesion nuevaSesionDTO.convertirSesionToDTO(nuevaSesion);
        Sesion sesionCreada = sesionService.agregarSesion(nuevaSesion);
        return SesionDTO.convertirSesionToDTO(sesionCreada);
*/
        nuevaSesionDTO.setId(idSesion);
        Sesion s = this.sesionService.agregarSesion(nuevaSesionDTO.convertToSesion());
        return ResponseEntity.ok(SesionDTO.convertirSesionToDTO(s));
    }
    
    
}
