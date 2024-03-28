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

import { AsignacionEntrenamientoDTO } from '../model/asignacionEntrenamientoDTO';
import { AsignacionEntrenamientoNuevoDTO } from '../model/asignacionEntrenamientoNuevoDTO';
import { PlanDTO } from '../model/planDTO';
import { PlanNuevoDTO } from '../model/planNuevoDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class GestinDeEntrenamientosService {

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
     * Actualiza la asignación de un entrenador a un cliente, para cambiar la especialidad. Solo puedo hacerlo el gerente.
     * @param body 
     * @param idEntrena 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarAsignacion(body: AsignacionEntrenamientoDTO, idEntrena: number, observe?: 'body', reportProgress?: boolean): Observable<AsignacionEntrenamientoDTO>;
    public actualizarAsignacion(body: AsignacionEntrenamientoDTO, idEntrena: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AsignacionEntrenamientoDTO>>;
    public actualizarAsignacion(body: AsignacionEntrenamientoDTO, idEntrena: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AsignacionEntrenamientoDTO>>;
    public actualizarAsignacion(body: AsignacionEntrenamientoDTO, idEntrena: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling actualizarAsignacion.');
        }

        if (idEntrena === null || idEntrena === undefined) {
            throw new Error('Required parameter idEntrena was null or undefined when calling actualizarAsignacion.');
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

        return this.httpClient.request<AsignacionEntrenamientoDTO>('put',`${this.basePath}/entrena/${encodeURIComponent(String(idEntrena))}`,
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
     * Actualiza un plan. Solo puede hacerlo el entrenador que lo ha creado.
     * @param body 
     * @param idPlan 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public actualizarPlan(body: PlanDTO, idPlan: number, observe?: 'body', reportProgress?: boolean): Observable<PlanDTO>;
    public actualizarPlan(body: PlanDTO, idPlan: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlanDTO>>;
    public actualizarPlan(body: PlanDTO, idPlan: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlanDTO>>;
    public actualizarPlan(body: PlanDTO, idPlan: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling actualizarPlan.');
        }

        if (idPlan === null || idPlan === undefined) {
            throw new Error('Required parameter idPlan was null or undefined when calling actualizarPlan.');
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

        return this.httpClient.request<PlanDTO>('put',`${this.basePath}/plan/${encodeURIComponent(String(idPlan))}`,
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
     * Permite asociar un nuevo cliente a un entrenador. 
     * @param body 
     * @param entrenador 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearAsignacion(body: AsignacionEntrenamientoNuevoDTO, entrenador: number, observe?: 'body', reportProgress?: boolean): Observable<AsignacionEntrenamientoDTO>;
    public crearAsignacion(body: AsignacionEntrenamientoNuevoDTO, entrenador: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AsignacionEntrenamientoDTO>>;
    public crearAsignacion(body: AsignacionEntrenamientoNuevoDTO, entrenador: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AsignacionEntrenamientoDTO>>;
    public crearAsignacion(body: AsignacionEntrenamientoNuevoDTO, entrenador: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearAsignacion.');
        }

        if (entrenador === null || entrenador === undefined) {
            throw new Error('Required parameter entrenador was null or undefined when calling crearAsignacion.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (entrenador !== undefined && entrenador !== null) {
            queryParameters = queryParameters.set('entrenador', <any>entrenador);
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

        return this.httpClient.request<AsignacionEntrenamientoDTO>('post',`${this.basePath}/entrena`,
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
     * Permite crear un plan nuevo para una asignación entrenador-cliente. 
     * @param body 
     * @param entrena 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public crearPlan(body: PlanNuevoDTO, entrena: number, observe?: 'body', reportProgress?: boolean): Observable<PlanDTO>;
    public crearPlan(body: PlanNuevoDTO, entrena: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlanDTO>>;
    public crearPlan(body: PlanNuevoDTO, entrena: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlanDTO>>;
    public crearPlan(body: PlanNuevoDTO, entrena: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling crearPlan.');
        }

        if (entrena === null || entrena === undefined) {
            throw new Error('Required parameter entrena was null or undefined when calling crearPlan.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (entrena !== undefined && entrena !== null) {
            queryParameters = queryParameters.set('entrena', <any>entrena);
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

        return this.httpClient.request<PlanDTO>('post',`${this.basePath}/plan`,
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
     * Elimina la asignación del entrenador al cliente. Solo puede hacerlo el gerente.
     * @param idEntrena 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarAsignacion(idEntrena: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarAsignacion(idEntrena: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarAsignacion(idEntrena: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarAsignacion(idEntrena: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idEntrena === null || idEntrena === undefined) {
            throw new Error('Required parameter idEntrena was null or undefined when calling eliminarAsignacion.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/entrena/${encodeURIComponent(String(idEntrena))}`,
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
     * Elimina el plan. Solo puede hacerlo el entrenador que lo ha creado.
     * @param idPlan 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public eliminarPlan(idPlan: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public eliminarPlan(idPlan: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public eliminarPlan(idPlan: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public eliminarPlan(idPlan: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idPlan === null || idPlan === undefined) {
            throw new Error('Required parameter idPlan was null or undefined when calling eliminarPlan.');
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

        return this.httpClient.request<any>('delete',`${this.basePath}/plan/${encodeURIComponent(String(idPlan))}`,
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
     * Obtiene los detalles de la asignación de un entrenador a un cliente.
     * @param idEntrena 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAsignacion(idEntrena: number, observe?: 'body', reportProgress?: boolean): Observable<AsignacionEntrenamientoDTO>;
    public getAsignacion(idEntrena: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AsignacionEntrenamientoDTO>>;
    public getAsignacion(idEntrena: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AsignacionEntrenamientoDTO>>;
    public getAsignacion(idEntrena: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idEntrena === null || idEntrena === undefined) {
            throw new Error('Required parameter idEntrena was null or undefined when calling getAsignacion.');
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

        return this.httpClient.request<AsignacionEntrenamientoDTO>('get',`${this.basePath}/entrena/${encodeURIComponent(String(idEntrena))}`,
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
     * Obtiene un plan concreto. Solo pueden acceder el cliente y el entrenador de la asignación del plan
     * @param idPlan 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPlan(idPlan: number, observe?: 'body', reportProgress?: boolean): Observable<PlanDTO>;
    public getPlan(idPlan: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PlanDTO>>;
    public getPlan(idPlan: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PlanDTO>>;
    public getPlan(idPlan: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idPlan === null || idPlan === undefined) {
            throw new Error('Required parameter idPlan was null or undefined when calling getPlan.');
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

        return this.httpClient.request<PlanDTO>('get',`${this.basePath}/plan/${encodeURIComponent(String(idPlan))}`,
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
     * Permite consultar los clientes que entrena un entrenador. Solo lo puede hacer el entrenador y el gerente del centro donde trabaja.
     * @param entrenador 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerAsignaciones1(entrenador: number, observe?: 'body', reportProgress?: boolean): Observable<Array<AsignacionEntrenamientoDTO>>;
    public obtenerAsignaciones1(entrenador: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<AsignacionEntrenamientoDTO>>>;
    public obtenerAsignaciones1(entrenador: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<AsignacionEntrenamientoDTO>>>;
    public obtenerAsignaciones1(entrenador: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (entrenador === null || entrenador === undefined) {
            throw new Error('Required parameter entrenador was null or undefined when calling obtenerAsignaciones1.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (entrenador !== undefined && entrenador !== null) {
            queryParameters = queryParameters.set('entrenador', <any>entrenador);
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

        return this.httpClient.request<Array<AsignacionEntrenamientoDTO>>('get',`${this.basePath}/entrena`,
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
     * Permite consultar todos los planes de una asignación entrenador-cliente.
     * @param entrena 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public obtenerPlanes(entrena: number, observe?: 'body', reportProgress?: boolean): Observable<Array<PlanDTO>>;
    public obtenerPlanes(entrena: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PlanDTO>>>;
    public obtenerPlanes(entrena: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PlanDTO>>>;
    public obtenerPlanes(entrena: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (entrena === null || entrena === undefined) {
            throw new Error('Required parameter entrena was null or undefined when calling obtenerPlanes.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (entrena !== undefined && entrena !== null) {
            queryParameters = queryParameters.set('entrena', <any>entrena);
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

        return this.httpClient.request<Array<PlanDTO>>('get',`${this.basePath}/plan`,
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
