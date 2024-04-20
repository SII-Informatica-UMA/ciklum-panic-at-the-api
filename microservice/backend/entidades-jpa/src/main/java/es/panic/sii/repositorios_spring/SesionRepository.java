package es.panic.sii.repositorios_spring;

import org.springframework.data.jpa.repository.JpaRepository;

import es.panic.sii.entidadesjpa.SesionDTO;

public interface SesionRepository extends JpaRepository<SesionDTO, Long>{
    //SE LE PUEDEN AÑADIR METODOS AQUI, HABRÍA QUE PENSAR CUALES
    
}
