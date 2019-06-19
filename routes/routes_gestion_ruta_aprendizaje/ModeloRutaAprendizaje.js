var ValidacionCodigoNombre = require('../utilidades_ruta_aprendizaje/ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();
var mysql = require('../../dataBase/conexion.js');
let QueryGenery = require('../utilidades_ruta_aprendizaje/QueryGenery.js')
let queryGenery = new QueryGenery();

class ModeloRutaAprendizaje {
    consultarProgramaDeFormacion(){
        return  mysql.con.query(`
        SELECT *  FROM gestion_programa_formacion;`);
    }
    consultarRutaDeAprendizaje(){
        return  mysql.con.query(`
        select * from gestión_de_ruta_de_aprendizaje
		join gestion_programa_formacion 
		on gestion_programa_formacion.id_programa_formacion = gestión_de_ruta_de_aprendizaje.id_programa_formacion;`);       
    }
    async insertarDatosARuta(id_programa_formacion,id_gestion_de_competencia){
        return  await insertarDatosARuta(id_programa_formacion,id_gestion_de_competencia)
    }
    consultarCompetenciasDeProgramaFormacionDeRutaDeAprendizaje(id_programa_formacion){
        return  mysql.con.query(`       
        select 
        gestión_de_competencia.id_gestion_de_competencia,
        gestión_de_competencia.nombre_competencia
        from gestión_de_ruta_de_aprendizaje
            join gestión_de_competencia
            on gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
             where gestión_de_ruta_de_aprendizaje.id_programa_formacion = ?;
        `,[id_programa_formacion]);       
    }
    consultarIdRutaDeCompetenciasDelProgramaFormacion(id_programa_formacion,id_gestion_de_competencia){
        return  mysql.con.query(`       
        select 
        *
        from gestión_de_ruta_de_aprendizaje
            join gestión_de_competencia
            on gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
            join gestion_programa_formacion
            on gestion_programa_formacion.id_programa_formacion = gestión_de_ruta_de_aprendizaje.id_programa_formacion
              where gestión_de_ruta_de_aprendizaje.id_programa_formacion = ?
				   AND
             gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia = ? ;
        `,[id_programa_formacion,id_gestion_de_competencia]);       
    }
    consultarCompetenciasQueNoSonProgramaFormacion(id_programa_formacion){
        return  mysql.con.query(`       
        select 
        *
      from  gestión_de_competencia where
      gestión_de_competencia.id_gestion_de_competencia
       NOT IN (
      select gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia 
      from gestión_de_ruta_de_aprendizaje	WHERE id_programa_formacion = ?);
        `,[id_programa_formacion]);       
    }
    async crearRutaAprendizaje(id_programa_formacion,id_gestion_de_competencia){
        // console.log('crearCompetencia',codigo_competencia,nombre_competencia)
        let respuesta = await queryGenery.queryValidate(
            [id_programa_formacion,id_gestion_de_competencia],
            [
            async(arrayDatos)=>{
                let resultado = {};
                let  existencia = await consultarExistenciaDeRutaDeAprendizaje(arrayDatos[0],arrayDatos[1])
                //  console.log('existencia',existencia)
                if(existencia){
                    resultado = {
                        text:"La competencia ya existe dentro del programa de formacion por favor inserte otro",
                        estado:'error',
                    }
                }
                return {
                    next:!existencia,
                    datosRespuesta:resultado
                }
            },
            async(arrayDatos)=>{       
                let resultado = {};
                let respuesta = validacionCodigoNombre.validarNumeroDato(arrayDatos[0]) && validacionCodigoNombre.validarNumeroDato(arrayDatos[1])
                // console.log('respuesta',respuesta)
                if(!respuesta) {    
                    resultado = {
                        text:"Los datos ingresados no son numeros",
                        estado:'error',
                    };
                }
                return {
                    next:respuesta,
                    datosRespuesta:resultado
                }
            },async(arrayDatosCompetencia)=>{
                // console.log('insertarData1',arrayDatosCompetencia[0],arrayDatosCompetencia[1])
                let consulta= await await insertarDatosARuta(arrayDatosCompetencia[0],arrayDatosCompetencia[1]) 
                console.log("consulta",consulta)
                let resultado ={};
                if(consulta.affectedRows > 0){
                    resultado = {
                        text: `A el programa de formacion  identificado con el codigo ${arrayDatosCompetencia[0]}, se le agrego la competencia identificada con el codigo ${arrayDatosCompetencia[0]}.`,
                        estado:"success", 
                    };
                }else{
                    resultado = {
                        text:consulta.error,
                        estado:'error'
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
    async consultarLaCompetenciaDeRutaDeAprendizaje(id_ruta_aprendizaje){
        return await mysql.con.query(`       
        select 
            gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
            gestion_programa_formacion.id_programa_formacion,
            gestion_programa_formacion.nombre_programa_formacion,
            gestión_de_competencia.id_gestion_de_competencia,
            gestión_de_competencia.nombre_competencia
         from gestión_de_ruta_de_aprendizaje
             join gestión_de_competencia
             on gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
             JOIN gestion_programa_formacion 
             ON gestion_programa_formacion.id_programa_formacion = gestión_de_ruta_de_aprendizaje.id_programa_formacion
             
          WHERE 
          gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje = ? ;	
        `,[id_ruta_aprendizaje]);        
    }
    async   consultarCompetenciasDeRutaDeAprendizaje(id_programa_formacion,id_gestion_de_competencia){
        return await mysql.con.query(`       
        select 
            gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
            gestion_programa_formacion.id_programa_formacion,
            gestion_programa_formacion.nombre_programa_formacion,
            gestión_de_competencia.id_gestion_de_competencia,
            gestión_de_competencia.nombre_competencia
         from gestión_de_ruta_de_aprendizaje
             join gestión_de_competencia
             on gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
             JOIN gestion_programa_formacion 
             ON gestion_programa_formacion.id_programa_formacion = gestión_de_ruta_de_aprendizaje.id_programa_formacion
             
          WHERE 
             gestion_programa_formacion.id_programa_formacion = ? ;	
        `,[id_programa_formacion]);      
    }
    async eliminarRutaDeAprendizaje(id_ruta_aprendizaje){
        try{
            return await mysql.con.query(`
             DELETE FROM  gestión_de_ruta_de_aprendizaje 
             WHERE gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje  = ?
            `,[id_ruta_aprendizaje]);
          }catch(error){
              return {affectedRows:0,
                  error:error.sqlMessage
              } 
          }
     }   
 
}
async function         insertarDatosARuta(id_programa_formacion,id_gestion_de_competencia){
    
    try{
      return await mysql.con.query(` INSERT into gestión_de_ruta_de_aprendizaje (
            id_programa_formacion,
            id_gestion_de_competencia
            )VALUES (?,?)`,[id_programa_formacion,
                id_gestion_de_competencia]);
    }catch(error){
        return {affectedRows:0,
            error:error.sqlMessage
        } 
    } 
}

async function  consultarExistenciaDeRutaDeAprendizaje(id_programa_formacion,id_gestion_de_competencia){
    let respuesta =  await mysql.con.query(`       
    select*from gestión_de_ruta_de_aprendizaje

	WHERE id_programa_formacion = ? AND  id_gestion_de_competencia = ?;;
    `,[id_programa_formacion,id_gestion_de_competencia]);    
    return respuesta.length   
}
module.exports = ModeloRutaAprendizaje;
