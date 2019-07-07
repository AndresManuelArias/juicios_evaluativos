var ModeloResultadoAprendizaje =  require('./ModeloResultadoAprendizaje.js');
var modeloResultadoAprendizaje = new ModeloResultadoAprendizaje();
var QueryCrud  = require('../utilidades_ruta_aprendizaje/QueryCrud.js');

class ResultadoAprendizaje extends QueryCrud {
    async metodo(req, res, next) {

         res.render('./viewEjemplo/ejemplo.jade', { title: 'Ejemplo',usuarios:usuarios });// es necesario insertar datos a la tabla de gestion de usuario
    }
    async consultarResultadosAprendizaje(req, res, next) {
        console.log(req.query)
        let competencia = await modeloResultadoAprendizaje.consultarCompetencia(req.params.id_gestion_de_competencia);
        if(competencia.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de Competencias' ,
            respuestaUsuario:`La competencia identificado con el codigo ${req.params.id_gestion_de_competencia} no existe.`,
            ir_lugar:'Volver edicion de competencias',
            dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}` })

        }else{
            let resultadosAprendizaje =  await modeloResultadoAprendizaje.consultarResultadosAprendizaje(req.params.id_gestion_de_competencia);
            res.render('./view_gestion_resultado_aprendizaje/edicion_resultado_apredizaje.jade', { 
                title: 'Resultados de aprendizajes',
                resultadosAprendizaje:resultadosAprendizaje,
                id_gestion_de_competencia:req.params.id_gestion_de_competencia,
                competencia:competencia[0].nombre_competencia, id_programa_formacion:req.query.id_programa_formacion });
       
        }
    }
    async eliminarView(req, res){
        console.log(req.query);
        let resultado = {
            codigo:"",nombre:"",
            errorCodigo:false,
            errorNombre:false
        }
        let competencia = await modeloResultadoAprendizaje.consultarCompetencia(req.params.id_gestion_de_competencia);
        let resultadosAprendizaje =  await modeloResultadoAprendizaje.consultarElResultadoAprendizaje(req.params.id_gestion_de_competencia,req.query.id_resultado_de_aprendizaje);           
        if(competencia.length === 0){
                res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de Competencias' ,
                respuestaUsuario:`La competencia identificado con el codigo ${req.params.id_gestion_de_competencia} no existe.`,
                ir_lugar:'Volver edicion de competencias',
                dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}` })
    
        }else        if( resultadosAprendizaje.length === 0){
            res.redirect(`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        } else {
            resultado.codigo= resultadosAprendizaje[0].id_resultado_de_aprendizaje;
            resultado.nombre= resultadosAprendizaje[0].nombre_resultado_de_aprendizaje;       
            res.render("view_gestion_resultado_aprendizaje/eliminar_resultado_aprendizaje.jade", 
            { title: 'Resultados de aprendizajes',  id_gestion_de_competencia:req.params.id_gestion_de_competencia,
            competencia:competencia[0].nombre_competencia,resultado:resultado, id_programa_formacion:req.query.id_programa_formacion});
        }

    }
    async eliminar(req, res){
        console.log(req.body)
        let consulta = await modeloResultadoAprendizaje.eliminarResultadoAprendizaje(req.body.codigo_resultadoAprendizaje,req.params.id_gestion_de_competencia)
        console.log(consulta)
        // res.redirect(`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        console.log(req.body)        
        let respuestaUsuario = ''
        if(consulta.affectedRows){
            respuestaUsuario = `El resultado de aprendizaje con el codigo ${req.body.codigo_resultadoAprendizaje} con  nombre  ${req.body.nombre_resultadoAprendizaje} fue eliminada.`
            
        }else{
            respuestaUsuario = consulta.error?consulta.error:`La accion no se pudo ejecutar devido a que el resultado de aprendizaje con el numero ${req.body.codigo_resultadoAprendizaje} no existe.`
        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver a edicion de resultado de aprendizaje',
            dirreccion:`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`})

    }
    async actualizarView(req, res){
        console.log(req.query);
        let resultado = {
            codigo:"",nombre:"",
            errorCodigo:false,
            errorNombre:false
        }
        let competencia = await modeloResultadoAprendizaje.consultarCompetencia(req.params.id_gestion_de_competencia);
        let resultadosAprendizaje =  await modeloResultadoAprendizaje.consultarElResultadoAprendizaje(req.params.id_gestion_de_competencia,req.query.id_resultado_de_aprendizaje);           
        if(competencia.length === 0){
                res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de Competencias' ,
                respuestaUsuario:`La competencia identificado con el codigo ${req.params.id_gestion_de_competencia} no existe.`,
                ir_lugar:'Volver edicion de competencias',
                dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}` })
    
        } else if( resultadosAprendizaje.length === 0){
            res.redirect(`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        }else {
            resultado.codigo= resultadosAprendizaje[0].id_resultado_de_aprendizaje;
            resultado.nombre= resultadosAprendizaje[0].nombre_resultado_de_aprendizaje;       
            res.render("view_gestion_resultado_aprendizaje/actualizar_resultado_aprendizaje.jade", 
            { title: 'Resultados de aprendizajes',  id_gestion_de_competencia:req.params.id_gestion_de_competencia,
            competencia:competencia[0].nombre_competencia,resultado:resultado, id_programa_formacion:req.query.id_programa_formacion});
        }
     }
    async actualizar(req, res){
        console.log(req.body)
        let consulta = await modeloResultadoAprendizaje.actualizarResultadoDeAprendizaje(req.params.id_gestion_de_competencia,req.body.codigo_resultadoAprendizaje,req.body.nombre_resultadoAprendizaje)
        console.log('actualizar',consulta)
        // res.redirect(`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        console.log(req.body)        
        let respuestaUsuario = ''
        if(consulta.affectedRows){
            respuestaUsuario = `El resultado de aprendizaje con el codigo ${req.body.codigo_resultadoAprendizaje} con  nombre  ${req.body.nombre_resultadoAprendizaje} fue actualizada.`
            
        }else{
            respuestaUsuario = consulta.error?consulta.error:`La accion no se pudo ejecutar devido a que el resultado de aprendizaje con el numero ${req.body.codigo_resultadoAprendizaje} no existe.`
        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver a edicion de resultado de aprendizaje',
            dirreccion:`/gestion_de_resultado_aprendizaje/all/${req.params.id_gestion_de_competencia}${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`})

    }
    async crearView(req, res){
        console.log(req.query);
        let competencia = await modeloResultadoAprendizaje.consultarCompetencia(req.params.id_gestion_de_competencia);
        if(competencia.length){
            let resultado = {
                codigo:"",nombre:"",
                errorCodigo:false,
                errorNombre:false
            }
            res.render("./view_gestion_resultado_aprendizaje/insert_resultado_aprendizaje.jade", 
            { title: 'Resultados de aprendizajes',  id_gestion_de_competencia:req.params.id_gestion_de_competencia,
            competencia:competencia[0].nombre_competencia,resultado:resultado, id_programa_formacion:req.query.id_programa_formacion});  
        }else{
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`La competencia  con el codigo ${req.params.id_gestion_de_competencia} no existe.`,
                ir_lugar:'Volver a edicion de resultado de aprendizaje',
                dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`})
        }
      
    }
    async crear(req, res){
        console.log('crear',req.params)
        let resultado1 = await modeloResultadoAprendizaje.crearResultadoAprendizaje([
            req.params.id_gestion_de_competencia,
            req.body.codigo_resultadoAprendizaje,
            req.body.nombre_resultadoAprendizaje]);     
        console.log('resultado1',resultado1);
        res.render('./view_gestion_resultado_aprendizaje/insert_resultado_aprendizaje.jade', { 
            title: 'Gestion de competencia',
            resultado:resultado1,
            id_gestion_de_competencia:req.params.id_gestion_de_competencia,
            competencia:resultado1.competencia,
            id_programa_formacion:req.query.id_programa_formacion
        });
    }
    async consultarExistencia(req, res){
        let consulta = await modeloResultadoAprendizaje.consultarExistencia(req.query.codigo,req.params.id_gestion_de_competencia);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ existe: consulta }));
        res.end();
    }


}
// set DEBUG=myapp:* & npm start
module.exports = ResultadoAprendizaje;