package es.panic.sii.servicios;

import es.panic.sii.controladores.SesionREST;
import es.panic.sii.repositorios.SesionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SesionService {

    private SesionRepository repo;

    public SesionService(SesionRepository repo) { this.repo = repo; }
}
