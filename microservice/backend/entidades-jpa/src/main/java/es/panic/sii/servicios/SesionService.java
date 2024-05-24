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
//mejor borrarla dado un id
    public void borrarSesion(Long id){
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }else{
            throw new SesionNoExistente();
        }
        
    }
    //me pasan un id y una sesion y sustituyo la sesion que tenga ese id por el sesion
    public void editarSesion(Sesion s){ //quiero editar el id
        if (repo.existsById(s.getId())) {
			repo.save(s);
		} else {
			throw new SesionNoExistente();
		}
    }
    public Sesion obtenerSesionPorId(Long id){
        if(repo.existsById(id)){
            return repo.getReferenceById(id);
        }else{
            return null;
        }
    }

    public List<Sesion> obtenerTodasLasSesiones() {
        return repo.findAll();
    }

    public List<Sesion> obtenerSesionPorPlan(Long plan){
        return repo.findSesionesByPlan(plan);

    }
}
