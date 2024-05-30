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


    //Métodospara el controlador REST
    @Override
    public Sesion convertToSesion(){
        return Sesion.builder().id(this.getId()).idPlan(this.getIdPlan()).inicio(this.getInicio()).fin(this.getFin()).trabajoRealizado(this.getTrabajoRealizado())
                .descripcion(this.getDescripcion()).multimedia(this.getMultimedia()).presencial(this.getPresencial())
                .datosSalud(this.getDatosSalud()).build();
    }

    public static SesionDTO convertirSesionToDTO(Sesion s){
        return builder().id(s.getId()).idPlan(s.getIdPlan()).inicio( (Timestamp) s.getInicio()).fin( (Timestamp) s.getFin()).trabajoRealizado(s.getTrabajoRealizado())
                .descripcion(s.getDescripcion()).multimedia(s.getMultimedia()).presencial(s.getPresencial())
                .datosSalud(s.getDatosSalud()).build();
    }


}
