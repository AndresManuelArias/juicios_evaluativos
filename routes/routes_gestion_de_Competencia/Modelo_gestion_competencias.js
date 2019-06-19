var ValidacionCodigoNombre = require('../utilidades_ruta_aprendizaje/ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();
var mysql = require('../../dataBase/conexion.js');
let QueryGenery = require('../utilidades_ruta_aprendizaje/QueryGenery.js')
let queryGenery = new QueryGenery();
/**
 * Shirt module.
 * @module Modelo_gestion_competencias
 */
class Modelo_gestion_competencias{
      /** 
    * @method consultarCompetencias 
    * @param {number} id_programa_formacion
    * @return {Promise<Array>} - resultado de la consulta a la tabla de Gestion de competencia
    */  
      consultarCompetencias(){
        return  mysql.con.query(`
            SELECT *  FROM gestión_de_competencia;`);
    }  

    /** 
    * @method select 
    * @param {number} id_programa_formacion
    * @return {Promise<Array>} - resultado de la consulta a la tabla de gestión_de_ruta_de_aprendizaje
    */

    // select(id_programa_formacion){
    //     return  mysql.con.query(`
    //     select
    //         gestión_de_competencia.id_gestion_de_competencia,
    //         gestion_programa_formacion.nombre_programa_formacion,
    //         gestión_de_competencia.nombre_competencia,
    //         gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
    //         gestión_de_ruta_de_aprendizaje.id_programa_formacion,
    //         gestión_de_ruta_de_aprendizaje.id_resultado_de_aprendizaje
    //         from gestión_de_ruta_de_aprendizaje
    //             left join gestión_de_competencia 
    //             on  
    //             gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia = gestión_de_competencia.id_gestion_de_competencia
    //             left join
    //             gestion_programa_formacion
    //             ON 
    //             gestión_de_ruta_de_aprendizaje.id_programa_formacion = gestion_programa_formacion.id_programa_formacion 
    //                 WHERE  gestion_programa_formacion.id_programa_formacion = ? GROUP BY gestión_de_competencia.nombre_competencia;`,[id_programa_formacion]);
    // }
    /** 
    * @async
    * @method crearCompetencia - inserta una nueva competencia verificando que los datos esten correctamente agregados
    * @param {number} codigo_competencia
    * @param {string} nombre_competencia
    * @return  {Promise<boolean>} - si la insert es correcta entonces retorna verdadero si no retorna falso
    */
    async crearCompetencia(codigo_competencia,nombre_competencia){
        // console.log('crearCompetencia',codigo_competencia,nombre_competencia)
        let respuesta = await queryGenery.queryValidate(
            [codigo_competencia,nombre_competencia],
            [async(arrayDatos)=>{
                let resultado = {};
                let  existencia = await validarExistenciaCompetencia(arrayDatos[0])
                // console.log('existencia',existencia)
                if(existencia){
                    resultado = {
                        text:"El codigo de la competencia ya existe por favor inserte otro",
                        estado:'error',
                        codigo:arrayDatos[0],
                        nombre:arrayDatos[1],
                        errorCodigo:false,
                        errorNombre:false
                    }
                }
                return {
                    next:!existencia,
                    datosRespuesta:resultado
                }
            },async(arrayDatos)=>{       
                let resultado = {};
                let respuesta = validacionCodigoNombre.validarRegistroDato({numero:arrayDatos[0],texto:arrayDatos[1]})
                // console.log('respuesta',respuesta)
                if(!respuesta.next) {    
                    resultado = {
                        text:"Los datos ingresados estan mal escritos",
                        estado:'error',
                        codigo:arrayDatos[0],
                        nombre:arrayDatos[1],
                        errorCodigo:!respuesta.numeroDato,
                        errorNombre:!respuesta.nombreDato
                    };
                }
                return {
                    next:respuesta.next,
                    datosRespuesta:resultado
                }
            },async(arrayDatosCompetencia)=>{
                // console.log('insertarData1',arrayDatosCompetencia[0],arrayDatosCompetencia[1])
                let consulta= await insertarData( arrayDatosCompetencia) 
                // console.log("consulta",consulta.affectedRows)
                let resultado ={};
                if(consulta.affectedRows > 0){
                    resultado = {
                        text:`Se creo la competencia con el codigo ${arrayDatosCompetencia[0]} y el nombre                 ${arrayDatosCompetencia[1]}`,
                        estado:"success",
                        codigo:"",
                        nombre:"",
                        errorCodigo:false,
                        errorNombre:false
                    };
                }else{
                    resultado = {
                        text:`Se creo la competencia con el codigo ${arrayDatosCompetencia[0]} y el nombre                 ${arrayDatosCompetencia[1]}`,
                        estado:'error',
                        codigo:arrayDatos[0],
                        nombre:arrayDatos[1],
                        errorCodigo:false,
                        errorNombre:false
                    };   
                }
                return {
                    next:consulta.affectedRows > 0,
                    datosRespuesta:resultado
                }
            }/*,async()=>{
                return {registro:true}
            }*/]);
         console.log('datosRespuesta salida',respuesta)
        return respuesta
        // return await registrarCodigoNombre.registro([codigo_competencia,nombre_competencia],validarExistenciaCompetencia,insertarData)
    }
    /** 
    * @async
    * @method insertarData - inserta una competencia en la tabla de competencias 
    * @param {number} codigo_competencia
    * @param {string} nombre_competencia
    * @return {Promise<object>}
    */
    async insertarData( arrayDatosCompetencia,respuesta){
        // console.log('insertarData1',arrayDatosCompetencia[0],arrayDatosCompetencia[1])
        respuesta.consulta = await insertarData( arrayDatosCompetencia)
        // console.log('respuesta',respuesta)
       return respuesta.consulta.affectedRows;
    }
    /** 
    * @method validarExistenciaCompetencia - verifica si existe la competencia
    * @param {number} codigo
    * @return {boolean} - si el codigo es existe retorna verdadero si no falso
    */
     validarExistenciaCompetencia(codigo_competencia){
       return validarExistenciaCompetencia(codigo_competencia)
    }
    /** 
    * @async 
    * @method eliminarCompetencia - inserta datos en la tabla de competencias 
    * @param {number} codigo
    * @return {Promise<object>} - retorna un objeto indicando como fue el proceso de la consulta sql
    */
    async eliminarCompetencia(codigo){
        // console.log("codigo",codigo)
        let resultDelecte = await   mysql.con.query(`
                DELETE FROM gestión_de_competencia
                    WHERE id_gestion_de_competencia = ?`,[codigo]);
        
       return  resultDelecte;
    }
    /** 
    * @async 
    * @method actualizarCompetencia - inserta datos en la tabla de competencias 
    * @param {number} codigo - Es el codigo de la competencia
    * @param {string} nombre  -  Es el nombre de la competencia
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
    async actualizarCompetencia(codigo,nombre){
        // console.log("codigo",codigo)
        // console.log("nombre",nombre)
        try{
            return await   mysql.con.query(`
                UPDATE gestión_de_competencia
                SET nombre_competencia = ?
                        WHERE id_gestion_de_competencia = ?`,[nombre,codigo]);
            
        }catch(error){
            return {affectedRows:0,
                error:error.sqlMessage
            } 
        }
    }
   /** 
    * @async 
    * @method verCompetencia - inserta datos en la tabla de competencias 
    * @param {number} codigo - Es el codigo de la competencia
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
    async verCompetencia(codigo){
      return  await verCompetencia(codigo)
    }
}
   /** 
    * @async 
    * @function insertarData - inserta datos en la tabla de competencias 
    * @param {number} codigo_competencia - Es el codigo de la competencia
    * @param {string} nombre_competencia  -  Es el nombre de la competencia
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function     insertarData( arraycodigoCompetencia){
    return mysql.con.query(` INSERT into gestión_de_competencia (
        id_gestion_de_competencia,
        nombre_competencia
        )VALUES (?,?)`,arraycodigoCompetencia);
}
   /** 
    * @async 
    * @function validarExistenciaCompetencia - inserta datos en la tabla de competencias 
    * @param {number} codigo - Es el codigo de la competencia
     * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function validarExistenciaCompetencia(codigo){
    return mysql.con.query(`SELECT *FROM gestión_de_competencia 
        WHERE gestión_de_competencia.id_gestion_de_competencia = ?`,[codigo]).then((resultado)=>{
            // console.log(resultado,resultado.length,resultado.length > 0)
            return resultado.length > 0;
        });
}
   /** 
    * @async 
    * @function verCompetencia - inserta datos en la tabla de competencias 
    * @param {number} codigo - Es el codigo de la competencia
   * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function  verCompetencia(codigo){
    return mysql.con.query(`SELECT *FROM gestión_de_competencia 
    WHERE gestión_de_competencia.id_gestion_de_competencia = ?`,[codigo])
}
module.exports = Modelo_gestion_competencias;