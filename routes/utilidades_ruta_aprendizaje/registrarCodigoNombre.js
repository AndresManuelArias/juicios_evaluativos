var ValidacionCodigoNombre = require('./ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();

async function registro(arrayInsertar,validarExistencia,insertarData){
    var codigo = arrayInsertar[0];
    var nombre = arrayInsertar[1]
    console.log('crear',codigo,nombre)
    var validacion = validacionCodigoNombre.validarRegistroDato({numero:codigo,texto:nombre});     
    var existencia = await validarExistencia(arrayInsertar[0],arrayInsertar[1]);
    validacion.noExisteCodigo = !existencia;
    // console.log('validacion',validacion);
    if(validacion.next && validacion.noExisteCodigo){
        validacion.resultadoInsert = await insertarData(arrayInsertar);
        validacion.registro = true;        
    }else{
        validacion.registro = false;
    }
    return validacion;
}

module.exports = {registro:registro,
    eliminar:async(arrayInsertar,deletectData)=>{
        var resultado = arrayInsertar[0];
        var competencia = arrayInsertar[1];
        console.log('eliminar',competencia,resultado)
        var validacion = validacionCodigoNombre.validarCualquiera([resultado,competencia],"numero");     
     
        if(validacion.next ){
            validacion.resultadoInsert = await deletectData(arrayInsertar);
            validacion.registro = true;        
        }else{
            validacion.registro = false;
        }
        return validacion;       
    }
}