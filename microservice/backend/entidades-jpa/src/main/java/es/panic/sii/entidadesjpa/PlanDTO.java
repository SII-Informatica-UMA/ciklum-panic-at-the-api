package es.panic.sii.entidadesjpa;


import jakarta.persistence.*;
import  java.util.Date;
import java.util.Calendar;
import java.util.List;

@Entity
@Table(name="plan")
public class PlanDTO {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicio;
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFin;
    private String reglaRecurrencia;

    /*
    private Long idRutina ?
    */

    //Si no queremos que la relación sea unidireccional hay que poner lo siguiente:
    @OneToMany (mappedBy = "plan")
    private List<SesionDTO> sesiones;

    public PlanDTO(){}
    public PlanDTO(Long id, Date fechaInicio, Date fechaFin, String reglaRecurrencia){
        this.id = id;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.reglaRecurrencia = reglaRecurrencia;
    }

    public Long getId(){ return this.id; }

    public Date getFechaInicio() { return fechaInicio; }

    public void setFechaInicio(Date fechaInicio) { this.fechaInicio = fechaInicio; }

    public Date getFechaFin() { return fechaFin; }

    public void setFechaFin(Date fechaFin) { this.fechaFin = fechaFin; }

    public String getReglaRecurrencia() { return reglaRecurrencia; }

    public void setReglaRecurrencia(String reglaRecurrencia) { this.reglaRecurrencia = reglaRecurrencia; }


}
