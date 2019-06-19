'use strict';
/**
 * Shirt module.
 * @module ValidacionCodigoNombre
 */

/** 
* @function validarNumeroDato - inserta datos en la tabla de Datos 
* @param {number} numero - Es el codigo de la Dato
* @return {boolean} - Retorna verdadero si el codigo cumple con el requisito de comenzar en mayuscula y terminar en punto
*/
function validarNumeroDato(numero){
    return /^\d{1,15}$/g.test(numero);
}
/** 
* @function validarTextoDato - inserta datos en la tabla de Datos 
* @param {string} texto - Es el nombre de la Dato
* @return {boolean} - Retorna verdadero si el texto cumple con el requisito de comenzar en mayuscula y terminar en punto
*/
function  validarTextoDato(texto){
    return /^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ\s\W .,]{1,300}\.$/g.test(texto);
}
/** Class  ValidacionCodigoNombre. */
class ValidacionCodigoNombre {
/** 
* @method validarNumeroDato - inserta datos en la tabla de Datos 
* @param {number} numero - Es el codigo de la Dato
* @return {boolean} - Retorna verdadero si el codigo cumple con el requisito de comenzar en mayuscula y terminar en punto
*/
    validarNumeroDato(numero){
       return validarNumeroDato(numero);
    }
    /** 
* @method validarTextoDato - inserta datos en la tabla de Datos 
* @param {string} texto - Es el nombre de la Dato
* @return {boolean} - Retorna verdadero si el texto cumple con el requisito de comenzar en mayuscula y terminar en punto
*/
    validarTextoDato(texto){
        return validarTextoDato(texto);
    }
    /** 
    * @method validarRegistroDato - inserta datos en la tabla de Datos 
    * @param {object} registro - Es el nombre  y numero de la Dato
    * @return {object} - Retorna un objeto con propiedades si el numero cumple con el requisito , otra propiedad para el texto y la ultima propiedad si los dos datos cumplen con los requisitos
    */
    validarRegistroDato(registro){
        // console.log('registro',registro)
        return {numeroDato:validarNumeroDato(registro.numero),nombreDato:validarTextoDato(registro.texto) ,next:validarNumeroDato(registro.numero) && validarTextoDato(registro.texto) }   
    }
    /** 
    * @method validarCualquiera - inserta datos en la tabla de Datos 
    * @param {Array} arrayDatos  - Son los datos que van a ser analisados
    * @param {String} tipo - Indica si el analisis va a ser para datos numericos o de texto   
    * @return {boolean} - Si los datos cumple con el requisito lanza un verdadero
    * */
    validarCualquiera(arrayDatos,tipo){
        let next = false
        if(tipo === "texto"){
            next =arrayDatos.every((texto)=>validarTextoDato(texto))  
        }if(tipo =="numero"){
            next =arrayDatos.every((numero)=>validarNumeroDato(numero))  
        }
       return { next:next}
    }
}
module.exports = ValidacionCodigoNombre;