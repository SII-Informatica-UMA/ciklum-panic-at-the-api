package es.panic.sii.servicios.excepciones;

public class SesionNoExiste extends RuntimeException {
    //404 según OpenAPI
    public SesionNoExiste() {}
}
