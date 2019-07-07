var ValidacionCodigoNombre = require('../utilidades_ruta_aprendizaje/ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();
let QueryGenery = require('../utilidades_ruta_aprendizaje/QueryGenery.js')
let queryGenery = new QueryGenery();
var mysql = require('../../dataBase/conexion.js');
/**
 * Shirt module.
 * @module ModeloResultadoAprendizaje
 */
class ModeloResultadoAprendizaje{
    async consultarCompetencia(codigoCompetencia) {
        var resultados = await mysql.con.query("SELECT * FROM gestión_de_competencia WHERE id_gestion_de_competencia = ?",[codigoCompetencia]);
        console.log(resultados)
        return  resultados;
    }    
    async consultarResultadosAprendizaje(codigoCompetencia) {
        var resultados = await mysql.con.query("SELECT * FROM gestión_de_resultado_de_aprendizaje WHERE id_gestion_de_competencia = ?",[codigoCompetencia]);
        console.log(resultados)
        return  resultados;
    }
    async consultarExistencia(codigoResultado,codigoCompetencia) {
        console.log("codigoResultado",codigoResultado)
    console.log("codigoCompetencia",codigoCompetencia)
        return await consultarExistencia(codigoResultado,codigoCompetencia);
    }
    async crearResultadoAprendizaje(arrayInsertar){
        console.log('crearResultadoAprendizaje')
        let respuesta = await queryGenery.queryValidate(
            arrayInsertar, [async(arrayDatos)=>{
                let resultado = {next:true,competencia:''};
                let competencia =  await consultarCompetencia(arrayDatos[0])
                if(!competencia.length > 0){
                    resultado = {
                        text:"Debe tener una competencia asociada",
                        estado:'error',
                        codigo:arrayDatos[1],
                        nombre:arrayDatos[2],
                        errorCodigo:false,
                        errorNombre:false,
                        next:false,
                        competencia:'<<No existe competencia>>.'
                    };
                    resultado['competencia']='<<No existe competencia>>';

                }
                console.log("resultado['competencia']",resultado['competencia'])
                return {
                    next:resultado.next,
                    datosRespuesta:resultado
                }
            }
            ,async(arrayDatos)=>{
                let resultado = {next:true};
                if (await consultarExistencia( arrayDatos[1],arrayDatos[0] )){
                    console.log('p',consultarExistencia( arrayDatos[1],arrayDatos[0] ))
                    resultado = {
                        text:"El codigo del resultado de aprendizaje ya existe por favor inserte otro",
                        estado:'error',
                        codigo:arrayDatos[1],
                        nombre:arrayDatos[2],
                        errorCodigo:false,
                        errorNombre:false,
                        next:false
                    };
                }
                return {
                    next:resultado.next,
                    datosRespuesta:resultado
                }
            }
            ,async(arrayDatos)=>{
                let resultado = {next:true};
                let validacion =  validacionCodigoNombre.validarRegistroDato({numero:arrayDatos[1],texto:arrayDatos[2]});
                console.log('validacion',validacion,arrayDatos)
                if(!validacion.next){
                    resultado = {
                        text:"Los datos ingresados estan mal escritos",
                        estado:'error',
                        codigo:arrayDatos[1],
                        nombre:arrayDatos[2],
                        errorCodigo:!validacion.numeroDato,
                        errorNombre:!validacion.nombreDato,
                        next:false
                    }
                }
                return {
                    next:resultado.next,
                    datosRespuesta:resultado
                }
            }
            ,async(arrayDatos,re)=>{
                let resultado = {next:true};
                let consulta = await insertarResultadoAprendizaje(arrayDatos[0],arrayDatos[1],arrayDatos[2])
                console.log("consulta",consulta.affectedRows)
                if(consulta.affectedRows > 0){                
                    resultado = {
                        text:`Se creo el resultado de aprendizaje  con el codigo ${arrayDatos[1]} y el nombre ${arrayDatos[2]} de la competencia ${arrayDatos[0]} ${re.competencia} `,
                        estado:"success",
                        codigo:"",
                        nombre:"",
                        errorCodigo:false,
                        errorNombre:false,
                        next:true
                    };
                }else {
                    resultado = {
                        text:`No se pudo crear el resultado de aprendizaje  con el codigo ${arrayDatos[1]} y el nombre ${arrayDatos[2]} de la competencia ${arrayDatos[0]} ${re.competencia}. ${consulta.error?consulta.error:""} `,
                        estado:'error',
                        codigo:arrayDatos[1],
                        nombre:arrayDatos[2],
                        errorCodigo:false,
                        errorNombre:false,
                        next:false
                    };
                }
                return {
                    next:resultado.next,
                    datosRespuesta:resultado
                }
            }
            // // ,async(arrayDatos)=>{
            // //     let resultado = {next:true};
                
            // //     return {
            // //         next:resultado.next,
            // //         datosRespuesta:resultado
            // //     }
            // // }
        ]);
            return respuesta;
    //   return await registrarCodigoNombre.registro(arrayInsertar,consultarExistencia,insertarResultadoAprendizaje)
    }
    async eliminarResultadoAprendizaje(codigoResultado,codigoCompetencia){
            console.log('eliminarResultadoAprendizaje',codigoResultado,codigoCompetencia)
            return await  eliminarResultadoAprendizaje([codigoResultado,codigoCompetencia])
    }
    async actualizarResultadoDeAprendizaje(codigoCompetencia,codigoResultado,nombre){
        try{
           return await   mysql.con.query(`
                UPDATE gestión_de_resultado_de_aprendizaje
                SET nombre_resultado_de_aprendizaje = ?
                        WHERE id_gestion_de_competencia = ?
                        AND
                        id_resultado_de_aprendizaje = ?`,[nombre,codigoCompetencia,codigoResultado]);
        }catch(error){
            return {affectedRows:0,
                error:error.sqlMessage
            } 
        }
    }
    async consultarElResultadoAprendizaje(codigoResultado,codigoCompetencia){
        console.log("codigoCompetencia",codigoCompetencia,"codigoResultado",codigoResultado)
        var resultados = await mysql.con.query(`SELECT * FROM 
        gestión_de_resultado_de_aprendizaje 
        WHERE          
            id_gestion_de_competencia = ? 
            AND
            id_resultado_de_aprendizaje = ?`,[codigoResultado,codigoCompetencia]);
        console.log('resultados',resultados)
        return  resultados;        
    }
}

async function consultarCompetencia(codigoCompetencia) {
    var resultados = await mysql.con.query("SELECT * FROM gestión_de_competencia WHERE id_gestion_de_competencia = ?",[codigoCompetencia]);
    console.log(resultados)
    return  resultados;
}   
async function eliminarResultadoAprendizaje(datosResultadoAprendizaje){
    let codigoResultado= datosResultadoAprendizaje[0]
    let codigoCompetencia= datosResultadoAprendizaje[1]
    try{
        return await mysql.con.query(`
        DELETE FROM gestión_de_resultado_de_aprendizaje
            WHERE id_resultado_de_aprendizaje = ? AND
            id_gestion_de_competencia = ?`,[codigoResultado,codigoCompetencia]);
    }catch(error){
        return {affectedRows:0,
            error:error.sqlMessage
        } 
    }
}
async function insertarResultadoAprendizaje(codigoCompetencia,codigoResultado,nombreResultado){
    try{
        return await mysql.con.query(`INSERT into gestión_de_resultado_de_aprendizaje (
                id_gestion_de_competencia,    
                id_resultado_de_aprendizaje,         
                nombre_resultado_de_aprendizaje
                )VALUES(?,?,?);`,[codigoCompetencia,codigoResultado,nombreResultado]);
    }catch(error){
        return {
            affectedRows:0,
            error:error.sqlMessage
        } 
    }
}
async function  consultarExistencia(codigoResultado,codigoCompetencia) {
    console.log("codigoResultado",codigoResultado)
    console.log("codigoCompetencia",codigoCompetencia)
    var resultados = await mysql.con.query("SELECT * FROM gestión_de_resultado_de_aprendizaje WHERE id_resultado_de_aprendizaje = ? AND id_gestion_de_competencia = ?",[codigoResultado,codigoCompetencia]);
    console.log('consultarExistencia',resultados,resultados.length,resultados.length > 0)
    return resultados.length > 0 ;
}
module.exports = ModeloResultadoAprendizaje;