package es.panic.sii;

import es.panic.sii.entidadesjpa.EntidadesJPACLR;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MainApplication {

    private static Logger LOG = LoggerFactory
            .getLogger(EntidadesJPACLR.class);
    public static void main(String[] args) {
        LOG.info("MAIN: STARTING THE APPLICATION");
        SpringApplication.run(MainApplication.class, args);
        LOG.info("MAIN: APPLICATION FINISHED");
    }
}
