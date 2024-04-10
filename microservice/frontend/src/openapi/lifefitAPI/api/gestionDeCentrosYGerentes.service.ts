/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { CentroDTO } from '../model/centroDTO';
import { CentroNuevoDTO } from '../model/centroNuevoDTO';
import { GerenteDTO } from '../model/gerenteDTO';
import { GerenteNuevoDTO } from '../model/gerenteNuevoDTO';
import { IdGerenteDTO } from '../model/idGerenteDTO';
import { MensajeDTO } from '../model/mensajeDTO';
import { MensajeNuevoDTO } from '../model/mensajeNuevoDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GestionDeCentrosYGerentesService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Actualiza un centro
     * @param body 
     * @param idCentro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarCentro(body: CentroDTO, idCentro: number, observe?: 'body', reportProgress?: boolean): Observable<CentroDTO>;
    public actualizarCentro(body: CentroDTO, idCentro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CentroDTO>>;
    public actualizarCentro(body: CentroDTO, idCentro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CentroDTO>>;
    public actualizarCentro(body: CentroDTO, idCentro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling actualizarCentro.');
        }

        if (idCentro === null || idCentro === undefined) {
            throw new Error('Required parameter idCentro was null or undefined when calling actualizarCentro.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<CentroDTO>('put',`${this.basePath}/centro/${encodeURIComponent(String(idCentro))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Actualiza un gerente
     * @param body 
     * @param idGerente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarGerente(body: GerenteDTO, idGerente: number, observe?: 'body', reportProgress?: boolean): Observable<GerenteDTO>;
    public actualizarGerente(body: GerenteDTO, idGerente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GerenteDTO>>;
    public actualizarGerente(body: GerenteDTO, idGerente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GerenteDTO>>;
    public actualizarGerente(body: GerenteDTO, idGerente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling actualizarGerente.');
        }

        if (idGerente === null || idGerente === undefined) {
            throw new Error('Required parameter idGerente was null or undefined when calling actualizarGerente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<GerenteDTO>('put',`${this.basePath}/gerente/${encodeURIComponent(String(idGerente))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite añadir una asociación entre un centro y un gerente.
     * @param body 
     * @param idCentro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public asociarCentroGerente(body: IdGerenteDTO, idCentro: number, observe?: 'body', reportProgress?: boolean): Observable<CentroDTO>;
    public asociarCentroGerente(body: IdGerenteDTO, idCentro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CentroDTO>>;
    public asociarCentroGerente(body: IdGerenteDTO, idCentro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CentroDTO>>;
    public asociarCentroGerente(body: IdGerenteDTO, idCentro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling asociarCentroGerente.');
        }

        if (idCentro === null || idCentro === undefined) {
            throw new Error('Required parameter idCentro was null or undefined when calling asociarCentroGerente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<CentroDTO>('put',`${this.basePath}/centro/${encodeURIComponent(String(idCentro))}/gerente`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite crear un centro nuevo a un administrador. 
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearCentro(body: CentroNuevoDTO, observe?: 'body', reportProgress?: boolean): Observable<CentroDTO>;
    public crearCentro(body: CentroNuevoDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CentroDTO>>;
    public crearCentro(body: CentroNuevoDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CentroDTO>>;
    public crearCentro(body: CentroNuevoDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearCentro.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<CentroDTO>('post',`${this.basePath}/centro`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Crea un nuevo gerente en el sistema. Tiene que existir un usuario ya creado para este gerente.
     * @param body 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearGerente(body: GerenteNuevoDTO, observe?: 'body', reportProgress?: boolean): Observable<GerenteDTO>;
    public crearGerente(body: GerenteNuevoDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GerenteDTO>>;
    public crearGerente(body: GerenteNuevoDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GerenteDTO>>;
    public crearGerente(body: GerenteNuevoDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearGerente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<GerenteDTO>('post',`${this.basePath}/gerente`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite crear un mensaje nuevo a un gerente del centro (para ser enviado). 
     * @param body 
     * @param centro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearMensaje2(body: MensajeNuevoDTO, centro: number, observe?: 'body', reportProgress?: boolean): Observable<MensajeDTO>;
    public crearMensaje2(body: MensajeNuevoDTO, centro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MensajeDTO>>;
    public crearMensaje2(body: MensajeNuevoDTO, centro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MensajeDTO>>;
    public crearMensaje2(body: MensajeNuevoDTO, centro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearMensaje2.');
        }

        if (centro === null || centro === undefined) {
            throw new Error('Required parameter centro was null or undefined when calling crearMensaje2.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (centro !== undefined && centro !== null) {
            queryParameters = queryParameters.set('centro', <any>centro);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<MensajeDTO>('post',`${this.basePath}/mensaje/centro`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite eliminar una asociación entre un centro y un gerente.
     * @param idCentro 
     * @param gerente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarAsociacionCentroGerente(idCentro: number, gerente?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarAsociacionCentroGerente(idCentro: number, gerente?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarAsociacionCentroGerente(idCentro: number, gerente?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarAsociacionCentroGerente(idCentro: number, gerente?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCentro === null || idCentro === undefined) {
            throw new Error('Required parameter idCentro was null or undefined when calling eliminarAsociacionCentroGerente.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (gerente !== undefined && gerente !== null) {
            queryParameters = queryParameters.set('gerente', <any>gerente);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/centro/${encodeURIComponent(String(idCentro))}/gerente`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Elimina el centro.
     * @param idCentro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarCentro(idCentro: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarCentro(idCentro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarCentro(idCentro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarCentro(idCentro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCentro === null || idCentro === undefined) {
            throw new Error('Required parameter idCentro was null or undefined when calling eliminarCentro.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/centro/${encodeURIComponent(String(idCentro))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Elimina el gerente.
     * @param idGerente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarGerente(idGerente: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarGerente(idGerente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarGerente(idGerente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarGerente(idGerente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idGerente === null || idGerente === undefined) {
            throw new Error('Required parameter idGerente was null or undefined when calling eliminarGerente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/gerente/${encodeURIComponent(String(idGerente))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Elimina el mensaje.
     * @param idMensaje 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarMensaje2(idMensaje: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarMensaje2(idMensaje: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarMensaje2(idMensaje: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarMensaje2(idMensaje: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMensaje === null || idMensaje === undefined) {
            throw new Error('Required parameter idMensaje was null or undefined when calling eliminarMensaje2.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/mensaje/centro/${encodeURIComponent(String(idMensaje))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Obtiene un centro concreto
     * @param idCentro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCentro(idCentro: number, observe?: 'body', reportProgress?: boolean): Observable<CentroDTO>;
    public getCentro(idCentro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CentroDTO>>;
    public getCentro(idCentro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CentroDTO>>;
    public getCentro(idCentro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCentro === null || idCentro === undefined) {
            throw new Error('Required parameter idCentro was null or undefined when calling getCentro.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<CentroDTO>('get',`${this.basePath}/centro/${encodeURIComponent(String(idCentro))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Obtiene un gerente concreto
     * @param idGerente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getGerente(idGerente: number, observe?: 'body', reportProgress?: boolean): Observable<GerenteDTO>;
    public getGerente(idGerente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GerenteDTO>>;
    public getGerente(idGerente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GerenteDTO>>;
    public getGerente(idGerente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idGerente === null || idGerente === undefined) {
            throw new Error('Required parameter idGerente was null or undefined when calling getGerente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<GerenteDTO>('get',`${this.basePath}/gerente/${encodeURIComponent(String(idGerente))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Obtiene un mensaje de centro concreto
     * @param idMensaje 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMensajeCentro(idMensaje: number, observe?: 'body', reportProgress?: boolean): Observable<MensajeDTO>;
    public getMensajeCentro(idMensaje: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MensajeDTO>>;
    public getMensajeCentro(idMensaje: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MensajeDTO>>;
    public getMensajeCentro(idMensaje: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMensaje === null || idMensaje === undefined) {
            throw new Error('Required parameter idMensaje was null or undefined when calling getMensajeCentro.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<MensajeDTO>('get',`${this.basePath}/mensaje/centro/${encodeURIComponent(String(idMensaje))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite consultar todos los centros a un adminitrador, opcionalmente regentados por un gerente. Esta última opción también se permite al usuario asociado al gerente.
     * @param gerente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerCentros(gerente?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<CentroDTO>>;
    public obtenerCentros(gerente?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CentroDTO>>>;
    public obtenerCentros(gerente?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CentroDTO>>>;
    public obtenerCentros(gerente?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (gerente !== undefined && gerente !== null) {
            queryParameters = queryParameters.set('gerente', <any>gerente);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<CentroDTO>>('get',`${this.basePath}/centro`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Obtiene la lista de gerentes del sistema. Solo para administradores.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerGerentes(observe?: 'body', reportProgress?: boolean): Observable<Array<GerenteDTO>>;
    public obtenerGerentes(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<GerenteDTO>>>;
    public obtenerGerentes(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<GerenteDTO>>>;
    public obtenerGerentes(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<GerenteDTO>>('get',`${this.basePath}/gerente`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Permite consultar todos los mensajes de un centro.
     * @param centro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerMensajesCentro(centro: number, observe?: 'body', reportProgress?: boolean): Observable<Array<MensajeDTO>>;
    public obtenerMensajesCentro(centro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MensajeDTO>>>;
    public obtenerMensajesCentro(centro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MensajeDTO>>>;
    public obtenerMensajesCentro(centro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (centro === null || centro === undefined) {
            throw new Error('Required parameter centro was null or undefined when calling obtenerMensajesCentro.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (centro !== undefined && centro !== null) {
            queryParameters = queryParameters.set('centro', <any>centro);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<MensajeDTO>>('get',`${this.basePath}/mensaje/centro`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
