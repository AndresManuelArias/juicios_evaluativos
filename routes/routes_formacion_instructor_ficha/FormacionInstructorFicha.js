let Modelo_programa_de_formacion =  require('../routes_programa_de_formacion/Modelo_programa_de_formacion.js');
let modelo_programa_de_formacion = new Modelo_programa_de_formacion();

let ModeloResultadoAprendizaje =  require('../routes_gestion_resultado_aprendizaje/ModeloResultadoAprendizaje.js');
let modeloResultadoAprendizaje = new ModeloResultadoAprendizaje();

let Modelo_FormacionInstructorFicha =  require('./Modelo_FormacionInstructorFicha.js');
let modelo_FormacionInstructorFicha = new Modelo_FormacionInstructorFicha();


let QueryCrud  = require('../utilidades_ruta_aprendizaje/QueryCrud.js');

class FormacionInstrutorFicha extends QueryCrud{
    async menuEdicion(req, res, next) {
        // console.log( 'req',req)

        console.log('hola')
        // let programaFormacion = modelo_programa_de_formacion.consultarProgramasDeFormacion()
        if(req.params.Id_GestionDeFichas ){    
             console.log( 'req.params',req.params)

            // console.log(fromacionesAsignadas)
            // res.redirect(`/gestion_de_la_formacion_instructor_ficha/edit/${req.params.Id_GestionDeFichas}?accion=Crear`);          
            let gestion_de_fichas = await modelo_FormacionInstructorFicha.buscarFicha(req.params.Id_GestionDeFichas)
            if(gestion_de_fichas.length){
                console.log('gestion_de_fichas.length')
                console.log(gestion_de_fichas)
                let formacionesAsignadas = await modelo_FormacionInstructorFicha.formacionAsignada(gestion_de_fichas[0].Id_GestionDeFichas);
                console.log('formacionesAsignadas',formacionesAsignadas)
                res.render('./view_formacion_instructor_ficha/menu_listar_formaciones.jade', { title: 'Edicion asignar formacion',formacionesAsignadas:formacionesAsignadas,Id_GestionDeFichas:req.params.Id_GestionDeFichas });  
            }else{
                res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                    title: 'Gestion de programa de formacion' ,
                    respuestaUsuario:'La ficha no existe.',
                    ir_lugar:'Seleccionar nueva ficha',
                    dirreccion:`/gestion_de_la_formacion_instructor_ficha` })         
            }
        }else{
            console.log('sin parametros')
            let gestion_de_fichas = await modelo_FormacionInstructorFicha.fichas()
            console.log(gestion_de_fichas)
            if(gestion_de_fichas.length){
                console.log('seleccionar fichas')
                res.render('./view_formacion_instructor_ficha/seleccionar_ficha.jade', { title: 'Edicion asignar formacion',gestion_de_fichas:gestion_de_fichas });  
            }else{
                res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                    title: 'Gestion formacion que se le da a la ficha' ,
                    respuestaUsuario:'No existen fichas.',
                    ir_lugar:'Seleccionar nueva ficha',
                    dirreccion:`/gestion_de_la_formacion_instructor_ficha` })                 
            }
        }
       
    }
    edicion(req, res){
        console.log('edicion', req.body)
        res.redirect(`/gestion_de_la_formacion_instructor_ficha/edit/${req.body.Id_GestionDeFichas}?accion=Crear`)
    }
    async crearView(req, res){
        console.log( req.params)
        let mensaje = ''
        let gestion_de_fichas =  await modelo_FormacionInstructorFicha.buscarFicha(req.params.Id_GestionDeFichas)
        console.log(gestion_de_fichas)
        let resultadosAprendizajes = await modelo_FormacionInstructorFicha.resultadosAprendizajeProgramaFormacionNoVistos(gestion_de_fichas[0].id_programa_formacion,req.params.Id_GestionDeFichas)
        console.log(resultadosAprendizajes);        
        let instructores = []
        if(req.query.id_resultado_de_aprendizaje){
            instructores = await modelo_FormacionInstructorFicha.listarInstructoresSinLaFormacion (req.query.id_resultado_de_aprendizaje,req.params.Id_GestionDeFichas)
            mensaje = instructores.length?"":"No existen instructores disponibles para este programa de formacion."
            resultadosAprendizajes = resultadosAprendizajes.filter((fila)=>fila.id_resultado_de_aprendizaje == req.query.id_resultado_de_aprendizaje)
        }
        res.render('./view_formacion_instructor_ficha/crear_formacion_instructor_ficha.jade', {
             title: 'Edicion asignar formacion',
            resultadosAprendizajes:resultadosAprendizajes,
            Id_GestionDeFichas:req.params.Id_GestionDeFichas,
            mensaje: mensaje ,
            instructores:instructores
        });
    }

    async crear(req, res){
    
        console.log('crear','body',req.body,'params',req.params,'query',req.query)
        let respuesta = ""
        if(req.body.accion ==='Asignar instructor'){
            console.log(req.originalUrl)
            console.log('asignar instrutor')
           res.redirect(`${req.originalUrl}&id_resultado_de_aprendizaje=${req.body.id_resultado_de_aprendizaje}`)
        }else{
            let resultado = await modelo_FormacionInstructorFicha.asignarFormacionInstructorFicha(req.body.id_resultado_de_aprendizaje,req.body.id_administrar_perfil_instructor,req.params.Id_GestionDeFichas)
            console.log('resultado',resultado)
            if(resultado.affectedRows){
                respuesta = `Se asigno el resultado de aprendizaje ${req.body.id_resultado_de_aprendizaje} a la ficha ${req.params.Id_GestionDeFichas}`
            }else{
                respuesta=`No se pudo asignar la formacion:${resultado.error?resultado.error:""}`
            }
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion formacion que se le da a la ficha' ,
                respuestaUsuario:respuesta,
                ir_lugar:'Seleccionar nueva ficha',
                dirreccion:`/gestion_de_la_formacion_instructor_ficha/${req.params.Id_GestionDeFichas}` })  
        }
    }
    async actualizarView(req, res){
        let gestion_de_fichas =  await modelo_FormacionInstructorFicha.buscarFicha(req.params.Id_GestionDeFichas)
        console.log(gestion_de_fichas)
        console.log('req',req.query)
        let anteriorFormacion = await modelo_FormacionInstructorFicha. consultarformacionAsignadaid(req.query.id_formacion_da_instructor_ficha)
        console.log('anteriorFormacion',anteriorFormacion)
        let resultadosAprendizajes= []
        if(req.query.cambiar == "instructor"){
            resultadosAprendizajes = await modelo_FormacionInstructorFicha.resultadosAprendizajeProgramaFormacion(gestion_de_fichas[0].id_programa_formacion,req.params.Id_GestionDeFichas)
        }else{
            resultadosAprendizajes = await modelo_FormacionInstructorFicha.resultadosAprendizajeProgramaFormacionNoVistos(gestion_de_fichas[0].id_programa_formacion,req.params.Id_GestionDeFichas)
        }
        console.log('resultadosAprendizajes',resultadosAprendizajes);   
        let instructores= []    
        if(req.query.cambiar == "resultado_de_aprendizaje"){
            instructores = await modelo_FormacionInstructorFicha.listarInstructores()
        }else{
            instructores = await modelo_FormacionInstructorFicha.listarInstructoresDistintos (anteriorFormacion[0].id_administrar_perfil)
        }
        console.log('instructores',instructores)        
        let mensaje = instructores.length?"":"No existen instructores disponibles para este programa de formacion."

        res.render('./view_formacion_instructor_ficha/editar_formacion_instructor_ficha.jade', {
            title: 'Edicion asignar formacion',
           resultadosAprendizajes:resultadosAprendizajes,
           Id_GestionDeFichas:req.params.Id_GestionDeFichas,
           id_formacion_da_instructor_ficha:req.query.id_formacion_da_instructor_ficha,
           mensaje: mensaje ,
           instructores:instructores,
           anteriorFormacion:anteriorFormacion[0],
           cambiar:req.query.cambiar?req.query.cambiar:''
       });       
    }
    async actualizar(req, res){
        console.log('body',req.body)
        console.log('query',req.query)
        let respuesta= '';
        let resultado = await modelo_FormacionInstructorFicha.actualizarFormacionInstructorFicha(req.body.id_formacion_da_instructor_ficha,req.body.id_resultado_de_aprendizaje,req.body.id_administrar_perfil_instructor,req.params.Id_GestionDeFichas)
        console.log('resultado',resultado)
        if(resultado.affectedRows){
            respuesta = `Se actualizo la formacion del resultado de aprendizaje ${req.body.id_resultado_de_aprendizaje} a la ficha ${req.params.Id_GestionDeFichas}`
        }else{
            respuesta=`No se pudo actualizar la formacion:${resultado.error?resultado.error:""}`
        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion formacion que se le da a la ficha' ,
            respuestaUsuario:respuesta,
            ir_lugar:'Seleccionar nueva ficha',
            dirreccion:`/gestion_de_la_formacion_instructor_ficha/${req.params.Id_GestionDeFichas}` })  
    }
    async eliminarView(req,res){
        let anteriorFormacion = await modelo_FormacionInstructorFicha. consultarformacionAsignadaid(req.query.id_formacion_da_instructor_ficha)
        console.log('anteriorFormacion',anteriorFormacion)
        let mensaje = ""
        res.render('./view_formacion_instructor_ficha/eliminar_formacion_instructor_ficha.jade', {
            title: 'Eliminar asignar formacion',
           Id_GestionDeFichas:req.params.Id_GestionDeFichas,
           id_formacion_da_instructor_ficha:req.query.id_formacion_da_instructor_ficha,
           mensaje: mensaje ,
           anteriorFormacion:anteriorFormacion[0],
           cambiar:req.query.cambiar?req.query.cambiar:''
       }); 
    }
    async eliminar(req,res){
        console.log('body',req.body)
        console.log('query',req.query)
        let respuesta= '';
        let resultado = await modelo_FormacionInstructorFicha.eliminarFormacionInstructorFicha(req.body.id_formacion_da_instructor_ficha)
        console.log('resultado',resultado)
        if(resultado.affectedRows){
            respuesta = `Se elimino la formacion del resultado de aprendizaje ${req.body.id_resultado_de_aprendizaje} a la ficha ${req.params.Id_GestionDeFichas}`
        }else{
            respuesta=`No se pudo eliminar la formacion:${resultado.error?resultado.error:""} de la ficha ${req.params.Id_GestionDeFichas}`
        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion formacion que se le da a la ficha' ,
            respuestaUsuario:respuesta,
            ir_lugar:'Seleccionar nueva ficha',
            dirreccion:`/gestion_de_la_formacion_instructor_ficha/${req.params.Id_GestionDeFichas}` })        
    }
}
module.exports = FormacionInstrutorFicha;
