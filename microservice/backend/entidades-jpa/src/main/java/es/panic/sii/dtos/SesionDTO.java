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
public class SesionDTO {
    private Long idSesion;
    private Date inicio;
    private Date fin;
    private String trabajoRealizado;
    private String descripcion;
    private List<String> multimedia;
    private Boolean presencial;
    private List<String> datosSalud;
    //private Long idPlan;

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

        return dto;
    }

    public Sesion sesion(){
        var s = new Sesion();
        
        s.setIdSesion(idSesion);
        s.setInicio(inicio);
        s.setFin(fin);
        s.setTrabajoRealizado(trabajoRealizado);
        s.setDescripcion(descripcion);
        s.setMultimedia(multimedia);
        s.setPresencial(presencial);
        s.setDatosSalud(datosSalud);

        return s;
    }
}
