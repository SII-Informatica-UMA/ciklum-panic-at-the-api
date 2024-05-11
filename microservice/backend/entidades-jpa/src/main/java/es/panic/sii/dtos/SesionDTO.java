package es.panic.sii.dtos;

import es.panic.sii.entidades.Sesion;
import jakarta.persistence.*;
import lombok.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SesionDTO extends SesionNuevaDTO {
    public Long idSesion;

    public SesionDTO(Long idSesion, Long plan, Date inicio, Date fin, String trabajoRealizado, List<String> multimedia, String descripcion, Boolean presencial, List<String> datosSalud) {
        super(plan, inicio, fin, trabajoRealizado,descripcion, multimedia, presencial, datosSalud);
        this.idSesion = idSesion;
    }


    //Métodos que podrían servir para el controlador REST
    public static SesionDTO fromSesion (Sesion s, Function<Long, URI> uriBuilder){
        var dto = new SesionDTO();
        dto.setIdSesion(s.getIdSesion());
        dto.setInicio(s.getInicio());
        dto.setFin(s.getFin());
        dto.setTrabajoRealizado(s.getTrabajoRealizado());
        dto.setDescripcion(s.getDescripcion());
        dto.setMultimedia(s.getMultimedia());
        dto.setPresencial(s.getPresencial());
        dto.setDatosSalud(s.getDatosSalud());
        dto.setPlan(s.getPlan());
        return dto;
    }

}
