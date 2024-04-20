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
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((fechaInicio == null) ? 0 : fechaInicio.hashCode());
        result = prime * result + ((fechaFin == null) ? 0 : fechaFin.hashCode());
        result = prime * result + ((reglaRecurrencia == null) ? 0 : reglaRecurrencia.hashCode());
        result = prime * result + ((sesiones == null) ? 0 : sesiones.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PlanDTO other = (PlanDTO) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (fechaInicio == null) {
            if (other.fechaInicio != null)
                return false;
        } else if (!fechaInicio.equals(other.fechaInicio))
            return false;
        if (fechaFin == null) {
            if (other.fechaFin != null)
                return false;
        } else if (!fechaFin.equals(other.fechaFin))
            return false;
        if (reglaRecurrencia == null) {
            if (other.reglaRecurrencia != null)
                return false;
        } else if (!reglaRecurrencia.equals(other.reglaRecurrencia))
            return false;
        if (sesiones == null) {
            if (other.sesiones != null)
                return false;
        } else if (!sesiones.equals(other.sesiones))
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "PlanDTO [id=" + id + ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", reglaRecurrencia="
                + reglaRecurrencia + ", sesiones=" + sesiones + "]";
    }

    
}
