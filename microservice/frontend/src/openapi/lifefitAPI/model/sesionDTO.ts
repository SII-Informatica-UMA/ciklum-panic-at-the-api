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
 */

export interface SesionDTO { 
    idPlan?: number;
    inicio?: Date;
    fin?: Date;
    trabajoRealizado?: string;
    multimedia?: Array<string>;
    descripcion?: string;
    presencial?: boolean;
    datosSalud?: Array<string>;
    id?: number;
}