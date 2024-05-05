package es.panic.sii.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import es.panic.sii.entidades.Sesion;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SesionRepository extends JpaRepository<Sesion, Long>{
    List<Sesion> findSesionesByPlan(Long idPlan);
}
