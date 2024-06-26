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

import { ClienteDTO } from '../model/clienteDTO';
import { ClienteNuevoDTO } from '../model/clienteNuevoDTO';
import { MensajeDTO } from '../model/mensajeDTO';
import { MensajeNuevoDTO } from '../model/mensajeNuevoDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GestionDeClientesYMensajesService {

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
     * Actualiza un cliente
     * @param body 
     * @param idCliente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarCliente(body: ClienteDTO, idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<ClienteDTO>;
    public actualizarCliente(body: ClienteDTO, idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClienteDTO>>;
    public actualizarCliente(body: ClienteDTO, idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClienteDTO>>;
    public actualizarCliente(body: ClienteDTO, idCliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling actualizarCliente.');
        }

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling actualizarCliente.');
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

        return this.httpClient.request<ClienteDTO>('put',`${this.basePath}/cliente/${encodeURIComponent(String(idCliente))}`,
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
     * Crea un nuevo cliente asociado al centro en el sistema. Tiene que existir un usuario ya creado para este cliente.
     * @param body 
     * @param centro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearCliente(body: ClienteNuevoDTO, centro: number, observe?: 'body', reportProgress?: boolean): Observable<ClienteDTO>;
    public crearCliente(body: ClienteNuevoDTO, centro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClienteDTO>>;
    public crearCliente(body: ClienteNuevoDTO, centro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClienteDTO>>;
    public crearCliente(body: ClienteNuevoDTO, centro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearCliente.');
        }

        if (centro === null || centro === undefined) {
            throw new Error('Required parameter centro was null or undefined when calling crearCliente.');
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

        return this.httpClient.request<ClienteDTO>('post',`${this.basePath}/cliente`,
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
     * Permite crear un mensaje nuevo a un cliente (para ser enviado). 
     * @param body 
     * @param cliente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearMensaje1(body: MensajeNuevoDTO, cliente: number, observe?: 'body', reportProgress?: boolean): Observable<MensajeDTO>;
    public crearMensaje1(body: MensajeNuevoDTO, cliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MensajeDTO>>;
    public crearMensaje1(body: MensajeNuevoDTO, cliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MensajeDTO>>;
    public crearMensaje1(body: MensajeNuevoDTO, cliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearMensaje1.');
        }

        if (cliente === null || cliente === undefined) {
            throw new Error('Required parameter cliente was null or undefined when calling crearMensaje1.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (cliente !== undefined && cliente !== null) {
            queryParameters = queryParameters.set('cliente', <any>cliente);
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

        return this.httpClient.request<MensajeDTO>('post',`${this.basePath}/mensaje/cliente`,
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
     * Elimina el cliente.
     * @param idCliente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarCliente(idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarCliente(idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarCliente(idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarCliente(idCliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling eliminarCliente.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/cliente/${encodeURIComponent(String(idCliente))}`,
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
    public eliminarMensaje1(idMensaje: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarMensaje1(idMensaje: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarMensaje1(idMensaje: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarMensaje1(idMensaje: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMensaje === null || idMensaje === undefined) {
            throw new Error('Required parameter idMensaje was null or undefined when calling eliminarMensaje1.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/mensaje/cliente/${encodeURIComponent(String(idMensaje))}`,
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
     * Obtiene un cliente concreto
     * @param idCliente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getCliente(idCliente: number, observe?: 'body', reportProgress?: boolean): Observable<ClienteDTO>;
    public getCliente(idCliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ClienteDTO>>;
    public getCliente(idCliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ClienteDTO>>;
    public getCliente(idCliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idCliente === null || idCliente === undefined) {
            throw new Error('Required parameter idCliente was null or undefined when calling getCliente.');
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

        return this.httpClient.request<ClienteDTO>('get',`${this.basePath}/cliente/${encodeURIComponent(String(idCliente))}`,
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
     * Obtiene un mensaje de un cliente concreto
     * @param idMensaje 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getMensajeCliente(idMensaje: number, observe?: 'body', reportProgress?: boolean): Observable<MensajeDTO>;
    public getMensajeCliente(idMensaje: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MensajeDTO>>;
    public getMensajeCliente(idMensaje: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MensajeDTO>>;
    public getMensajeCliente(idMensaje: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMensaje === null || idMensaje === undefined) {
            throw new Error('Required parameter idMensaje was null or undefined when calling getMensajeCliente.');
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

        return this.httpClient.request<MensajeDTO>('get',`${this.basePath}/mensaje/cliente/${encodeURIComponent(String(idMensaje))}`,
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
     * Obtiene la lista de clientes de un centro. Lo pueden hacer los gerentes de ese centro.
     * @param centro 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerClientes(centro: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ClienteDTO>>;
    public obtenerClientes(centro: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ClienteDTO>>>;
    public obtenerClientes(centro: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ClienteDTO>>>;
    public obtenerClientes(centro: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (centro === null || centro === undefined) {
            throw new Error('Required parameter centro was null or undefined when calling obtenerClientes.');
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

        return this.httpClient.request<Array<ClienteDTO>>('get',`${this.basePath}/cliente`,
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
     * Permite consultar todos los mensajes de un cliente.
     * @param cliente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerMensajesCliente1(cliente: number, observe?: 'body', reportProgress?: boolean): Observable<Array<MensajeDTO>>;
    public obtenerMensajesCliente1(cliente: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MensajeDTO>>>;
    public obtenerMensajesCliente1(cliente: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MensajeDTO>>>;
    public obtenerMensajesCliente1(cliente: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (cliente === null || cliente === undefined) {
            throw new Error('Required parameter cliente was null or undefined when calling obtenerMensajesCliente1.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (cliente !== undefined && cliente !== null) {
            queryParameters = queryParameters.set('cliente', <any>cliente);
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

        return this.httpClient.request<Array<MensajeDTO>>('get',`${this.basePath}/mensaje/cliente`,
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
