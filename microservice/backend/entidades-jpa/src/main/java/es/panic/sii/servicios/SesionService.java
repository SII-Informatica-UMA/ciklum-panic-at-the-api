package es.panic.sii.servicios;

import es.panic.sii.controladores.SesionREST;
import es.panic.sii.repositorios.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SesionService {

    private SesionRepository repo; //solo hay un repositorio porque solo hay una entidad

    public SesionService(SesionRepository repo) {
        this.repo = repo;
    } //ta perfe
}
