var ValidacionCodigoNombre = require('../utilidades_ruta_aprendizaje/ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();
var mysql = require('../../dataBase/conexion.js');
let QueryGenery = require('../utilidades_ruta_aprendizaje/QueryGenery.js')
let queryGenery = new QueryGenery();
/**
 * Shirt module.
 * @module Modelo_programa_de_formacion
 */
class Modelo_programa_de_formacion{
      /** 
    * @method consultarProgramaDeFormacions 
    * @param {number} id_programa_formacion
    * @return {Promise<Array>} - resultado de la consulta a la tabla de Gestion de ProgramaDeFormacion
    */  
      consultarProgramasDeFormacion(){
        return  mysql.con.query(`
            SELECT *  FROM gestion_programa_formacion;`);
    }  

    /** 
    * @method select 
    * @param {number} id_programa_formacion
    * @return {Promise<Array>} - resultado de la consulta a la tabla de gestión_de_ruta_de_aprendizaje
    */

    // select(id_programa_formacion){
    //     return  mysql.con.query(`
    //     select
    //         gestion_programa_formacion.id_programa_formacion,
    //         gestion_programa_formacion.nombre_programa_formacion,
    //         gestion_programa_formacion.nombre_programa_formacion,
    //         gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
    //         gestión_de_ruta_de_aprendizaje.id_programa_formacion,
    //         gestión_de_ruta_de_aprendizaje.id_resultado_de_aprendizaje
    //         from gestión_de_ruta_de_aprendizaje
    //             left join gestion_programa_formacion 
    //             on  
    //             gestión_de_ruta_de_aprendizaje.id_programa_formacion = gestion_programa_formacion.id_programa_formacion
    //             left join
    //             gestion_programa_formacion
    //             ON 
    //             gestión_de_ruta_de_aprendizaje.id_programa_formacion = gestion_programa_formacion.id_programa_formacion 
    //                 WHERE  gestion_programa_formacion.id_programa_formacion = ? GROUP BY gestion_programa_formacion.nombre_programa_formacion;`,[id_programa_formacion]);
    // }
    /** 
    * @async
    * @method crearProgramaDeFormacion - inserta una nueva ProgramaDeFormacion verificando que los datos esten correctamente agregados
    * @param {number} codigo_ProgramaDeFormacion
    * @param {string} nombre_programa_formacion
    * @return  {Promise<boolean>} - si la insert es correcta entonces retorna verdadero si no retorna falso
    */
    async crearProgramaDeFormacion(codigo_ProgramaDeFormacion,nombre_programa_formacion){
        // console.log('crearProgramaDeFormacion',codigo_ProgramaDeFormacion,nombre_programa_formacion)
        let respuesta = await queryGenery.queryValidate(
            [codigo_ProgramaDeFormacion,nombre_programa_formacion],
            [async(arrayDatos)=>{
                let resultado = {};
                let  existencia = await validarExistenciaProgramaDeFormacion(arrayDatos[0])
                // console.log('existencia',existencia)
                if(existencia){
                    resultado = {
                        text:"El codigo de la Programa De Formacion ya existe por favor inserte otro",
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
            },async(arrayDatosProgramaDeFormacion)=>{
                // console.log('insertarData1',arrayDatosProgramaDeFormacion[0],arrayDatosProgramaDeFormacion[1])
                let consulta= await insertarData( arrayDatosProgramaDeFormacion) 
                // console.log("consulta",consulta.affectedRows)
                let resultado ={};
                if(consulta.affectedRows > 0){
                    resultado = {
                        text:`Se creo la ProgramaDeFormacion con el codigo ${arrayDatosProgramaDeFormacion[0]} y el nombre                 ${arrayDatosProgramaDeFormacion[1]}`,
                        estado:"success",
                        codigo:"",
                        nombre:"",
                        errorCodigo:false,
                        errorNombre:false
                    };
                }else{
                    resultado = {
                        text:`Se creo la ProgramaDeFormacion con el codigo ${arrayDatosProgramaDeFormacion[0]} y el nombre                 ${arrayDatosProgramaDeFormacion[1]}`,
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
        // return await registrarCodigoNombre.registro([codigo_ProgramaDeFormacion,nombre_programa_formacion],validarExistenciaProgramaDeFormacion,insertarData)
    }
    /** 
    * @async
    * @method insertarData - inserta una ProgramaDeFormacion en la tabla de ProgramaDeFormacions 
    * @param {number} codigo_ProgramaDeFormacion
    * @param {string} nombre_programa_formacion
    * @return {Promise<object>}
    */
    async insertarData( arrayDatosProgramaDeFormacion,respuesta){
        // console.log('insertarData1',arrayDatosProgramaDeFormacion[0],arrayDatosProgramaDeFormacion[1])
        respuesta.consulta = await insertarData( arrayDatosProgramaDeFormacion)
        // console.log('respuesta',respuesta)
       return respuesta.consulta.affectedRows;
    }
    /** 
    * @method validarExistenciaProgramaDeFormacion - verifica si existe la ProgramaDeFormacion
    * @param {number} codigo
    * @return {boolean} - si el codigo es existe retorna verdadero si no falso
    */
     validarExistenciaProgramaDeFormacion(codigo_ProgramaDeFormacion){
       return validarExistenciaProgramaDeFormacion(codigo_ProgramaDeFormacion)
    }
    /** 
    * @async 
    * @method eliminarProgramaDeFormacion - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo
    * @return {Promise<object>} - retorna un objeto indicando como fue el proceso de la consulta sql
    */
    async eliminarProgramaDeFormacion(codigo){
        // console.log("codigo",codigo)
        try {
            return await   mysql.con.query(`
            DELETE FROM gestion_programa_formacion 
                WHERE id_programa_formacion = ?`,[codigo]);
        }catch(error){
            return {
                affectedRows:0,
                error:error.sqlMessage
            } 
        } 
    }
    /** 
    * @async 
    * @method actualizarProgramaDeFormacion - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo - Es el codigo de la ProgramaDeFormacion
    * @param {string} nombre  -  Es el nombre de la ProgramaDeFormacion
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
    async actualizarProgramaDeFormacion(codigo,nombre){
        // console.log("codigo",codigo)
        // console.log("nombre",nombre)

        let resultUpdate = await   mysql.con.query(`
            UPDATE gestion_programa_formacion
            SET nombre_programa_formacion = ?
                    WHERE id_programa_formacion = ?`,[nombre,codigo]);
        
       return  resultUpdate;
    }
   /** 
    * @async 
    * @method verProgramaDeFormacion - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo - Es el codigo de la ProgramaDeFormacion
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
    async verProgramaDeFormacion(codigo){
      return  await verProgramaDeFormacion(codigo)
    }
}
   /** 
    * @async 
    * @function insertarData - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo_ProgramaDeFormacion - Es el codigo de la ProgramaDeFormacion
    * @param {string} nombre_programa_formacion  -  Es el nombre de la ProgramaDeFormacion
    * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function     insertarData( arraycodigoProgramaDeFormacion){
    return mysql.con.query(` INSERT into gestion_programa_formacion (
        id_programa_formacion,
        nombre_programa_formacion
        )VALUES (?,?)`,arraycodigoProgramaDeFormacion);
}
   /** 
    * @async 
    * @function validarExistenciaProgramaDeFormacion - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo - Es el codigo de la ProgramaDeFormacion
     * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function validarExistenciaProgramaDeFormacion(codigo){
    return mysql.con.query(`SELECT *FROM gestion_programa_formacion 
        WHERE gestion_programa_formacion.id_programa_formacion = ?`,[codigo]).then((resultado)=>{
            // console.log(resultado,resultado.length,resultado.length > 0)
            return resultado.length > 0;
        });
}
   /** 
    * @async 
    * @function verProgramaDeFormacion - inserta datos en la tabla de ProgramaDeFormacions 
    * @param {number} codigo - Es el codigo de la ProgramaDeFormacion
   * @return {Promise<object>} -retorna un objeto indicando como fue el proceso de la consulta sql
   */
function  verProgramaDeFormacion(codigo){
    return mysql.con.query(`SELECT *FROM gestion_programa_formacion 
    WHERE gestion_programa_formacion.id_programa_formacion = ?`,[codigo])
}
module.exports = Modelo_programa_de_formacion;