package es.panic.sii.dtos;

import lombok.*;
import lombok.experimental.SuperBuilder;
import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@ToString
@EqualsAndHashCode
public class SesionNuevaDTO {
    private Long idPlan;
    private Timestamp inicio;
    private Timestamp fin;
    private String trabajoRealizado;
    private String descripcion;
    private List<String> multimedia;
    private Boolean presencial;
    private List<String> datosSalud;
}
