package es.panic.sii.dtos;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode
public class SesionNuevaDTO {
    private Long plan;
    private Date inicio;
    private Date fin;
    private String trabajoRealizado;
    private String descripcion;
    private List<String> multimedia;
    private Boolean presencial;
    private List<String> datosSalud;
}
