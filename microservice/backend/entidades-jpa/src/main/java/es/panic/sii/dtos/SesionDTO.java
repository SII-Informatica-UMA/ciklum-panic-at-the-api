package es.panic.sii.dtos;

import es.panic.sii.entidades.Sesion;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class SesionDTO extends SesionNuevaDTO {
    public Long id;

    public SesionDTO(Long id, Long plan, Timestamp inicio, Timestamp fin, String trabajoRealizado, List<String> multimedia, String descripcion, Boolean presencial, List<String> datosSalud) {
        super(plan, inicio, fin, trabajoRealizado,descripcion, multimedia, presencial, datosSalud);
        this.id = id;
    }


    //Métodos que podrían servir para el controlador REST
    public Sesion convertToSesion(){
        Sesion s = new Sesion();
        s.setId(this.getId());
        s.setInicio(this.getInicio());
        s.setFin((Timestamp) this.getFin()); //Probablemente no funcione, esto es una prueba
        s.setTrabajoRealizado(this.getTrabajoRealizado());
        s.setDescripcion(this.getDescripcion());
        s.setMultimedia(this.getMultimedia());
        s.setPresencial(this.getPresencial());
        s.setDatosSalud(this.getDatosSalud());
        s.setIdPlan(this.getIdPlan());
        return s;
    }
    public static SesionDTO convertirSesionToDTO(Sesion s){
        var dto = new SesionDTO();
        dto.setId(s.getId());
        dto.setInicio((Timestamp) s.getInicio());
        dto.setFin((Timestamp) s.getFin()); //Probablemente no funcione, esto es una prueba
        dto.setTrabajoRealizado(s.getTrabajoRealizado());
        dto.setDescripcion(s.getDescripcion());
        dto.setMultimedia(s.getMultimedia());
        dto.setPresencial(s.getPresencial());
        dto.setDatosSalud(s.getDatosSalud());
        dto.setIdPlan(s.getIdPlan());
        return dto;
    }

}
