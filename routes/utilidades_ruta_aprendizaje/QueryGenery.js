
/** @module QueryGenery 
 * */
class QueryGenery { 
/**
 *  *
 * @async
 * @method queryValidate
 * @param {Array} arrayDeDatos - Son los datos que van a ser sometidos a validacion.
 * @param {Array} arrayDeValidarDatosQuery - Son funciones que van a validar los datos y ejectuar sentencia SQL.
 * @return {Promise<Object>} Retorna la respuesta si los datos pasan o pasan la prueba.
 */

    async queryValidate(arrayDeDatos, arrayDeValidarDatosQuery){
        var  datosRespuesta = { 
            validar:"",
            query:"",
            registro:false
        }

        for(let funcionAccion = 0;funcionAccion < arrayDeValidarDatosQuery.length;funcionAccion++ ){
            console.log(funcionAccion,datosRespuesta,arrayDeValidarDatosQuery[funcionAccion])
            let continuar = await arrayDeValidarDatosQuery[funcionAccion](arrayDeDatos,datosRespuesta )      
            console.log('continuar',continuar)
            datosRespuesta = Object.assign(continuar.datosRespuesta, datosRespuesta);                
            if( !continuar.next){
                break;
            }
        }
        return datosRespuesta
    }
    // queryValidate(arrayDeDatos, arrayDeValidarDatosQuery){
    //     var  datosRespuesta = { 
    //         validar:"",
    //         query:"",
    //         registro:false
    //     }

    //     for(let funcionAccion = 0;funcionAccion < arrayDeValidarDatosQuery.length;funcionAccion++ ){
    //         console.log(funcionAccion,datosRespuesta,arrayDeValidarDatosQuery[funcionAccion])
    //         let continuar =  arrayDeValidarDatosQuery[funcionAccion](arrayDeDatos,datosRespuesta )      
    //         console.log('continuar',continuar)
    //         datosRespuesta = Object.assign(continuar.datosRespuesta, datosRespuesta);                
    //         if( !continuar.next){
    //             break;
    //         }
    //     }
    //     return datosRespuesta
    // }
}
//yarn jsdoc routes_gestion_de_Competencia routes_gestion_ruta_aprendizaje routes_gestion_resultado_aprendizaje utilidades_ruta_aprendizaje
 
module.exports = QueryGenery;