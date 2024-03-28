import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { GestinDeDietasYAsignacinAClientesService } from './api/gestinDeDietasYAsignacinAClientes.service';
import { GestinDeEjerciciosYRutinasService } from './api/gestinDeEjerciciosYRutinas.service';
import { GestinDeEntrenamientosService } from './api/gestinDeEntrenamientos.service';
import { GestinDeInformacinDeSesionesDeLosClientesService } from './api/gestinDeInformacinDeSesionesDeLosClientes.service';
import { GestinDeUsuariosService } from './api/gestinDeUsuarios.service';
import { GestionDeCentrosYGerentesService } from './api/gestionDeCentrosYGerentes.service';
import { GestionDeClientesYMensajesService } from './api/gestionDeClientesYMensajes.service';
import { GestionDeEntrenadoresYSusMensajesService } from './api/gestionDeEntrenadoresYSusMensajes.service';
import { GestionDelCalendarioDeEntrenadoresService } from './api/gestionDelCalendarioDeEntrenadores.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    GestinDeDietasYAsignacinAClientesService,
    GestinDeEjerciciosYRutinasService,
    GestinDeEntrenamientosService,
    GestinDeInformacinDeSesionesDeLosClientesService,
    GestinDeUsuariosService,
    GestionDeCentrosYGerentesService,
    GestionDeClientesYMensajesService,
    GestionDeEntrenadoresYSusMensajesService,
    GestionDelCalendarioDeEntrenadoresService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
