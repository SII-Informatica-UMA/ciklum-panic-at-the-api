package es.panic.sii.repositorios_spring;

import org.springframework.data.jpa.repository.JpaRepository;

import es.panic.sii.entidadesjpa.SesionDTO;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SesionRepository extends JpaRepository<SesionDTO, Long>{

}
