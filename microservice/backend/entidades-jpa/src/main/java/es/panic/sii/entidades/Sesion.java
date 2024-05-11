package es.panic.sii.entidades;

import jakarta.persistence.*;
import java.util.ArrayList;
import  java.util.Date;
import java.util.List;

@Entity
@Table(name="sesion")
public class Sesion {


    @Id @GeneratedValue
    public Long idSesion;
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date inicio;
    @Column(nullable=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date fin;
    private String trabajoRealizado;
    private String descripcion;
    @ElementCollection
    @CollectionTable(
            joinColumns = @JoinColumn(
                    foreignKey = @ForeignKey(name = "FK_multimedia_idSesion")
            )
    )

    private List<String> multimedia = new ArrayList<String>(2);
    private Boolean presencial;
    @ElementCollection
    @CollectionTable(
            joinColumns = @JoinColumn(
                    foreignKey = @ForeignKey(name = "FK_datosSesion_idSesion")
            )
    )
    private List<String> datosSalud = new ArrayList<String>(3);
    private Long plan;

    public Sesion(){}

    public Sesion(Long idSesion, Date inicio, Date fin, String trabajoRealizado, String descripcion,
                  List<String> multimedia, Boolean presencial, List<String> datosSalud){
        this.idSesion = idSesion;
        this.inicio = inicio;
        this.fin = fin;
        this.trabajoRealizado = trabajoRealizado;
        this.descripcion = descripcion;
        this.multimedia = multimedia;
        this.presencial = presencial;
        this.datosSalud = datosSalud;
    }

    public Long getIdSesion(){ return this.idSesion; }
    public Date getInicio(){ return this.inicio; }
    public Date getFin(){ return this.fin; }

    public void setInicio(Date nueva){ this.inicio = nueva; }
    public void setFin(Date nueva){ this.fin = nueva; }

    public String getTrabajoRealizado() { return trabajoRealizado; }

    public void setIdSesion(Long idSesion) {
        this.idSesion = idSesion;
    }

    public void setTrabajoRealizado(String trabajoRealizado) { this.trabajoRealizado = trabajoRealizado; }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Boolean getPresencial() { return presencial; }

    public void setPresencial(Boolean presencial) { this.presencial = presencial; }

    public List<String> getMultimedia() { return multimedia; }

    public void setMultimedia(List<String> multimedia) { this.multimedia = multimedia; }

    public List<String> getDatosSalud() { return datosSalud; }

    public void setDatosSalud(List<String> datosSalud) { this.datosSalud = datosSalud; }

    public Long getPlan() {
        return plan;
    }

    public void setPlan(Long plan) {
        this.plan = plan;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idSesion == null) ? 0 : idSesion.hashCode());
        result = prime * result + ((inicio == null) ? 0 : inicio.hashCode());
        result = prime * result + ((fin == null) ? 0 : fin.hashCode());
        result = prime * result + ((trabajoRealizado == null) ? 0 : trabajoRealizado.hashCode());
        result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
        result = prime * result + ((multimedia == null) ? 0 : multimedia.hashCode());
        result = prime * result + ((presencial == null) ? 0 : presencial.hashCode());
        result = prime * result + ((datosSalud == null) ? 0 : datosSalud.hashCode());
        result = prime * result + ((plan == null) ? 0 : plan.hashCode());
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
        Sesion other = (Sesion) obj;
        if (idSesion == null) {
            if (other.idSesion != null)
                return false;
        } else if (!idSesion.equals(other.idSesion))
            return false;
        if (inicio == null) {
            if (other.inicio != null)
                return false;
        } else if (!inicio.equals(other.inicio))
            return false;
        if (fin == null) {
            if (other.fin != null)
                return false;
        } else if (!fin.equals(other.fin))
            return false;
        if (trabajoRealizado == null) {
            if (other.trabajoRealizado != null)
                return false;
        } else if (!trabajoRealizado.equals(other.trabajoRealizado))
            return false;
        if (descripcion == null) {
            if (other.descripcion != null)
                return false;
        } else if (!descripcion.equals(other.descripcion))
            return false;
        if (multimedia == null) {
            if (other.multimedia != null)
                return false;
        } else if (!multimedia.equals(other.multimedia))
            return false;
        if (presencial == null) {
            if (other.presencial != null)
                return false;
        } else if (!presencial.equals(other.presencial))
            return false;
        if (datosSalud == null) {
            if (other.datosSalud != null)
                return false;
        } else if (!datosSalud.equals(other.datosSalud))
            return false;
        if (plan == null) {
            if (other.plan != null)
                return false;
        } else if (!plan.equals(other.plan))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Sesion [idSesion=" + idSesion + ", inicio=" + inicio + ", fin=" + fin + ", trabajoRealizado="
                + trabajoRealizado + ", descripcion=" + descripcion + ", multimedia=" + multimedia + ", presencial="
                + presencial + ", datosSalud=" + datosSalud + ", plan=" + plan + "]";
    }

    
    
}
