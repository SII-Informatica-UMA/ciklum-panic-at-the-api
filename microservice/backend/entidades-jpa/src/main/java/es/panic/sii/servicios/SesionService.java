package es.panic.sii.servicios;

import es.panic.sii.controladores.SesionREST;
import es.panic.sii.entidades.Sesion;
import es.panic.sii.repositorios.SesionRepository;
import es.panic.sii.servicios.excepciones.SesionNoExistente;
import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;
import es.panic.sii.entidades.Sesion;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
@Transactional
public class SesionService {

    private SesionRepository repo; //solo hay un repositorio porque solo hay una entidad

    public SesionService(SesionRepository repo) {
        this.repo = repo;
    } //ta perfe


    public Sesion agregarSesion(Sesion s){
        if (repo.existsById(s.getId())) {
			repo.save(s);
			return s;
		} else {
            return null;
		}
    }

    public Sesion borrarSesion(Sesion s){
        if (repo.existsById(s.getId())) {
            repo.delete(s);
            return s;
        }else{
            return null;
        }
        
    }
    public Sesion editarSesion(Sesion s, Long id){ //quiero editar el id
        if(repo.existsById(s.getId())){
            s.id = id;
            return s;
        }else{
            return null;
        }
    }
    public Sesion obtenerSesionPorId(Long id){
        if(repo.existsById(id)){
            return repo.getReferenceById(id);
        }else{
            return null;
        }
    }

    public List<Sesion> obtenerSesionPorPlan(Long plan){
        return repo.findSesionesByPlan(plan);

    }
}
