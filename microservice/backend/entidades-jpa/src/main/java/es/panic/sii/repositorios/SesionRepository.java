package es.panic.sii.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import es.panic.sii.entidades.Sesion;
import org.springframework.stereotype.Repository;

@Repository
public interface SesionRepository extends JpaRepository<Sesion, Long>{

}
