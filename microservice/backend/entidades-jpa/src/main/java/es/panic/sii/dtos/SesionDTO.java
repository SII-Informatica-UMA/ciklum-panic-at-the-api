package es.panic.sii.dtos;

import es.panic.sii.entidades.Sesion;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.util.List;

import java.util.function.Function;

@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class SesionDTO extends SesionNuevaDTO {
    public Long id;
    //Añadí todas estas variables para poder llamarlas desde sesion
    //No pueden ser privadas o daría problemas con el superBuilder
    /*
    public Timestamp inicio;
    public Timestamp fin;
    public String trabajoRealizado;
    public List<String> multimedia;
    public String descripcion;
    public Boolean presencial;
    public List<String> datosSalud;
*/
    /*
    Si @SuperBuilder da problemas, eliminar annotation en ambos DTO y añadir aqui @Builder
     */
    public SesionDTO(Long id, Long plan, Timestamp inicio, Timestamp fin, String trabajoRealizado, List<String> multimedia, String descripcion, Boolean presencial, List<String> datosSalud) {
        super(plan, inicio, fin, trabajoRealizado,descripcion, multimedia, presencial, datosSalud);
        this.id = id;
    }


    //Métodos que podrían servir para el controlador REST
    public static SesionDTO fromSesion (Sesion s, Function<Long, URI> uriBuilder){
        var dto = new SesionDTO();
        dto.setId(s.getId());
        dto.setInicio((Timestamp) s.getInicio());
        dto.setFin((Timestamp) s.getFin()); //Probablemente no funcione, esto es una prueba
        dto.setTrabajoRealizado(s.getTrabajoRealizado());
        dto.setDescripcion(s.getDescripcion());
        dto.setMultimedia(s.getMultimedia());
        dto.setPresencial(s.getPresencial());
        dto.setDatosSalud(s.getDatosSalud());
        dto.setPlan(s.getPlan());
        return dto;
    }
/* 
    //creo que aquí hay que hacer un Sesion sesion o algo
    //Añadí sesion para poder llamarlo desde SesionREST
    public Sesion sesion() {
		var ses = new Sesion();
		ses.setInicio(inicio);
        ses.setFin(fin);
		ses.setId(id);
		ses.setDescripcion(descripcion);
        ses.setDatosSalud(datosSalud);
        ses.setPresencial(presencial);
        ses.setTrabajoRealizado(trabajoRealizado);
		ses.setMultimedia(multimedia);
		return ses;
	}

*/
}
