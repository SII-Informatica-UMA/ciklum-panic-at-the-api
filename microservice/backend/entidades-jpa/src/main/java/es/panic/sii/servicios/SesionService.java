package es.panic.sii.servicios;

import es.panic.sii.entidades.Sesion;
import es.panic.sii.repositorios.SesionRepository;
import es.panic.sii.servicios.excepciones.SesionNoExiste;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
@Transactional
public class SesionService {

    private SesionRepository repo; //solo hay un repositorio porque solo hay una entidad

    public SesionService(SesionRepository repo) {
        this.repo = repo;
    }


    public Sesion agregarSesion(Sesion s){
			repo.save(s);
			return s;
    }
//mejor borrarla dado un id
    public void borrarSesion(Long id){
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }else{
            throw new SesionNoExiste();
        }
        
    }
    //me pasan un id y una sesion y sustituyo la sesion que tenga ese id por el sesion
    public void editarSesion(Sesion s){ //quiero editar el id
        if (repo.existsById(s.getId())) {
			repo.save(s);
		} else {
			throw new SesionNoExiste();
		}
    }
    public Optional<Sesion> obtenerSesionPorId(Long id){
        if(repo.existsById(id)){
            return repo.findById(id);
        }else{
            throw new SesionNoExiste();
        }
    }

    public List<Sesion> obtenerTodasLasSesiones() {
        return repo.findAll();
    }

    public List<Sesion> obtenerSesionPorPlan(Long plan){
        return repo.findSesionesByIdPlan(plan);

    }
}
