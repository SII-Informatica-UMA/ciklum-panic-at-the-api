package es.panic.sii.entidadesjpa;

import jakarta.persistence.*;
import java.util.ArrayList;
import  java.util.Date;
import java.util.List;
import es.panic.sii.entidadesjpa.PlanDTO;

@Entity
@Table(name="sesion")
public class SesionDTO {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
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
    @Column(length = 1024)
    private List<String> multimedia = new ArrayList<>(); //No sé si hace falta inicializar las listas
    private Boolean presencial;
    @ElementCollection
    @Column(length = 11)
    private List<String> datosSalud = new ArrayList<>();

    @ManyToOne //Muchas sesiones pertenecen a un mismo plan
    @JoinColumn(name ="idPlan")
    private PlanDTO plan;

    public SesionDTO(){}

    //Tal vez este constructor no sea necesario
    public SesionDTO(Long idSesion, Date inicio, Date fin, String trabajoRealizado, String descripcion,
                     List<String> multimedia, Boolean presencial, List<String> datosSalud){
        this.idSesion = idSesion;
        this.inicio = inicio;
        this.fin = fin;
        this.trabajoRealizado = trabajoRealizado;
        this.descripcion = descripcion;
        this.multimedia = multimedia;
        this.presencial = presencial;
        this.datosSalud = datosSalud;
        //No sé si los arrays dan problemas de esta manera, si los diera habría que copiarlos y ya
    }

    public Long getIdSesion(){ return this.idSesion; }
    public Date getInicio(){ return this.inicio; }
    public Date getFin(){ return this.fin; }

    public void setInicio(Date nueva){ this.inicio = nueva; }
    public void setFin(Date nueva){ this.fin = nueva; }

    public String getTrabajoRealizado() { return trabajoRealizado; }

    public void setTrabajoRealizado(String trabajoRealizado) { this.trabajoRealizado = trabajoRealizado; }

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Boolean getPresencial() { return presencial; }

    public void setPresencial(Boolean presencial) { this.presencial = presencial; }

    public List<String> getMultimedia() { return multimedia; }

    public void setMultimedia(List<String> multimedia) { this.multimedia = multimedia; }

    public List<String> getDatosSalud() { return datosSalud; }

    public void setDatosSalud(List<String> datosSalud) { this.datosSalud = datosSalud; }

}
