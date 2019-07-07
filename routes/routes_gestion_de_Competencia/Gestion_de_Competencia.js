var ModeloRutaAprendizaje =  require('../routes_gestion_ruta_aprendizaje/ModeloRutaAprendizaje');
var modeloRutaAprendizaje = new ModeloRutaAprendizaje();
var Modelo_programa_de_formacion =  require('../routes_programa_de_formacion/Modelo_programa_de_formacion');
var modelo_programa_de_formacion = new Modelo_programa_de_formacion();
var Modelo_gestion_competencias =  require('./Modelo_gestion_competencias.js');
var modelo_gestion_competencias = new Modelo_gestion_competencias();
var QueryCrud  = require('../utilidades_ruta_aprendizaje/QueryCrud.js');

/**
 * Shirt module.
 * @module Gestion_de_Competencia
 */
class Gestion_de_Competencia extends QueryCrud {
    // /** * @async
    //  * @method menu
    //  * * @param {object} req - 
    //  * * @param {object} res - 
    //  * 
    //  */
    // async menu(req, res, next) {
    //     res.render('./view_gestion_de_Competencia/menu.jade', { title: 'Gestion de competencia',
    //         menu:"active",
    //         crear:"",
    //         edicion:"",
    //         id_programa_formacion:req.query.id_programa_formacion
    //     });// es necesario insertar datos a la tabla de gestion de usuario
    // }
    /**  
     * @async
     * @method vistaCrearCompetencia
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async crearView(req, res, next) {
        console.log('render')
        console.log('query',req.query);
        let programaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('programaFormacion',programaFormacion)
        if( Array.isArray(programaFormacion) && programaFormacion.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`El programa de formacion identificado con el codigo ${req.query.id_programa_formacion} no existe.`,
                ir_lugar:'Volver edicion programas de formación',
                dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion` })
    
        }else{
            res.render('./view_gestion_de_Competencia/insert_competencia.jade', { title: 'Gestion de competencia',resultado:
            {codigo:"",nombre:"",
            errorCodigo:false,
            errorNombre:false,
            },
            id_programa_formacion:req.query.id_programa_formacion,
            nombreProgramaFormacion:req.query.id_programa_formacion== undefined || programaFormacion.length === 0?"":programaFormacion[0].nombre_programa_formacion
            });// es necesario insertar datos a la tabla de gestion de usuario
        }

    }
        /**  
     * @async
     * @method crearCompetencia
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async crear(req, res, next) {
        let resultado = await modelo_gestion_competencias.crearCompetencia(req.body.codigo_competencia,req.body.nombre_competencia);
        console.log('resultado',resultado);
        console.log('query',req.query);
        let nombreProgramaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('nombreProgramaFormacion',nombreProgramaFormacion)
        // cuando exista un id de ruta programa de formacion este debe agregarse a la ruta de formacion
       if(req.query.id_programa_formacion ){
            await modeloRutaAprendizaje.insertarDatosARuta(req.query.id_programa_formacion,req.body.codigo_competencia)

       }
        res.render('./view_gestion_de_Competencia/insert_competencia.jade', { 
            title: 'Gestion de competencia',resultado:resultado,id_programa_formacion:req.query.id_programa_formacion,
            nombreProgramaFormacion:req.query.id_programa_formacion== undefined?"":nombreProgramaFormacion[0].nombre_programa_formacion

        });// es necesario insertar datos a la tabla de gestion de usuario
     }
        /**  
     * @async
     * @method edicionCompetencias
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async edicionCompetencias(req, res, next){        

        var nombre_competencia_programa =req.query.id_programa_formacion?await modeloRutaAprendizaje.consultarCompetenciasDeProgramaFormacionDeRutaDeAprendizaje(req.query.id_programa_formacion):await modelo_gestion_competencias.consultarCompetencias();
        console.log(nombre_competencia_programa);
        let nombreProgramaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('nombreProgramaFormacion',nombreProgramaFormacion)
        if( Array.isArray(nombreProgramaFormacion) && nombreProgramaFormacion.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`El programa de formacion identificado con el codigo ${req.query.id_programa_formacion} no existe.`,
                ir_lugar:'Volver edicion programas de formación',
                dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion` })
    
        }else {
            res.render('./view_gestion_de_Competencia/edicion_competencias.jade', { 
                nombre_competencia_programa:nombre_competencia_programa,
                title: 'Gestion de competencia',
            id_programa_formacion:req.query.id_programa_formacion,
            nombreProgramaFormacion:req.query.id_programa_formacion== undefined?"":nombreProgramaFormacion[0].nombre_programa_formacion
            });// es necesario insertar datos a la tabla de gestion de usuario  
        }   
    }
        /**  
     * @async
     * @method listar
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async listar(req, res, next){        

        var nombre_competencia_programa =req.query.id_programa_formacion?await modeloRutaAprendizaje.consultarCompetenciasDeProgramaFormacionDeRutaDeAprendizaje(req.query.id_programa_formacion):await modelo_gestion_competencias.consultarCompetencias();
        console.log(nombre_competencia_programa);
        let nombreProgramaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('nombreProgramaFormacion',nombreProgramaFormacion)
        if( Array.isArray(nombreProgramaFormacion) && nombreProgramaFormacion.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`El programa de formacion identificado con el codigo ${req.query.id_programa_formacion} no existe.`,
                ir_lugar:'Volver edicion programas de formación',
                dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion` })
    
        }else {
            res.render('./view_gestion_de_Competencia/edicion_competencias.jade', { 
                nombre_competencia_programa:nombre_competencia_programa,
                title: 'Gestion de competencia',
            id_programa_formacion:req.query.id_programa_formacion,
            nombreProgramaFormacion:req.query.id_programa_formacion== undefined?"":nombreProgramaFormacion[0].nombre_programa_formacion
            });// es necesario insertar datos a la tabla de gestion de usuario  
        }   
    }
    /**  
     * @async
     * @method consultarExistenciaCompetencias
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async consultarExistenciaCompetencias(req, res, next) {
        let consulta = await modelo_gestion_competencias.validarExistenciaCompetencia(req.query.codigo_competencia);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ existe: consulta }));
        res.end();
    }
    /**  
     * @async
     * @method vistaEliminarCompetencia - Es la vista que permitira al usuario ver la competencia y poder eliminar
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async eliminarView(req, res, next){
        console.log('vistaEliminarCompetencia')
        let consulta = await modelo_gestion_competencias.verCompetencia(req.query.codigo)
        console.log(consulta)
        let nombreProgramaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('nombreProgramaFormacion',nombreProgramaFormacion)
        if( Array.isArray(nombreProgramaFormacion) && nombreProgramaFormacion.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`El programa de formacion identificado con el codigo ${req.query.id_programa_formacion} no existe.`,
                ir_lugar:'Volver edicion programas de formación',
                dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion` })
    
        }else{
            res.render('./view_gestion_de_Competencia/eliminar_competencia.jade', { 
                title: 'Gestion de competencia',
                resultado:{
                    codigo:consulta.length >0?consulta[0].id_gestion_de_competencia:"",
                    nombre:consulta.length >0?consulta[0].nombre_competencia:"",
                    errorCodigo:false,
                    errorNombre:false,
                },                       
                title: 'Gestion de competencia',
                id_programa_formacion:req.query.id_programa_formacion,
                nombreProgramaFormacion:req.query.id_programa_formacion== undefined?"":nombreProgramaFormacion[0].nombre_programa_formacion
    
            });// es necesario insertar datos a la tabla de gestion de usuario
        }
    }
    /**  
     * @async
     * @method eliminarCompetencia - Permitira al usuario eliminar la competencia
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async eliminar(req, res, next){
        let respuestaUsuario = ''
        if(req.query.id_programa_formacion){
            let ruta_aprendizaje = await modeloRutaAprendizaje.consultarIdRutaDeCompetenciasDelProgramaFormacion(req.query.id_programa_formacion,req.body.codigo_competencia)            
            console.log('ruta_aprendizaje',ruta_aprendizaje)            
            if( ruta_aprendizaje.length){
                let  respuestaEliminarRutaDeAprendizaje = await modeloRutaAprendizaje. eliminarRutaDeAprendizaje(ruta_aprendizaje[0].id_ruta_aprendizaje)
                console.log(respuestaEliminarRutaDeAprendizaje)                
                if(respuestaEliminarRutaDeAprendizaje.affectedRows){
                    respuestaUsuario = `La competencia ${ruta_aprendizaje[0].nombre_competencia} fue eliminada del programa de formacion ${ruta_aprendizaje[0].nombre_programa_formacion}.`
                }else{
                    respuestaUsuario = respuestaEliminarRutaDeAprendizaje.error
                }
            }else{
                respuestaUsuario = `La accion no se puedo ejecutar devido a que la ruta de aprendizaje numero ${req.body.id_ruta_aprendizaje} no existe.`
            }
        }else{
            let consulta = await modelo_gestion_competencias.eliminarCompetencia(req.body.codigo_competencia);        
            console.log(consulta)
            if(consulta.affectedRows){
                respuestaUsuario = `La competencia con el codigo ${req.body.codigo_competencia} y el  nombre  ${req.body.codigo_competencia} fue eliminada.`
                
            }else{
                consulta.error
                respuestaUsuario = consulta.error?consulta.error:`La accion no se pudo ejecutar devido a que la competencia con el numero ${req.body.codigo_competencia} no existe.`
    
            }
        }
  
        console.log('id_programa_formacion',req.query.id_programa_formacion)
        /***
         * {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
         */
        // res.redirect(`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        console.log(req.body)        
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver edicion de competencias',
            dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}` })
 
    
    }
    /**  
     * @async
     * @method vistaActualizarCompetencia - Es la vista para que el usuario pueda actualizar la competencia
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async actualizarView(req, res, next){
        console.log('vistaActualizarCompetencia')
        let consulta = await modelo_gestion_competencias.verCompetencia(req.query.codigo)
        console.log(consulta)
        let nombreProgramaFormacion = req.query.id_programa_formacion == undefined?"": await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.id_programa_formacion)
        console.log('nombreProgramaFormacion',nombreProgramaFormacion)
        if( Array.isArray(nombreProgramaFormacion) && nombreProgramaFormacion.length === 0){
            res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
                title: 'Gestion de programa de formacion' ,
                respuestaUsuario:`El programa de formacion identificado con el codigo ${req.query.id_programa_formacion} no existe.`,
                ir_lugar:'Volver edicion programas de formación',
                dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion` })
    
        }else{
            res.render('./view_gestion_de_Competencia/actualizar_competencia.jade', { 
                title: 'Gestion de competencia',
                resultado:{
                    codigo:consulta.length >0?consulta[0].id_gestion_de_competencia:"",
                    nombre:consulta.length >0?consulta[0].nombre_competencia:"",
                    errorCodigo:false,
                    errorNombre:false,
                },                       
                title: 'Gestion de competencia',
                id_programa_formacion:req.query.id_programa_formacion,
                nombreProgramaFormacion:req.query.id_programa_formacion== undefined?"":nombreProgramaFormacion[0].nombre_programa_formacion
    
    
            });// es necesario insertar datos a la tabla de gestion de usuario
        }

    }
    /**  
     * @async
     * @method actualizarCompetencia -Actualizar la competencia
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async actualizar(req, res, next){
        let consulta = await modelo_gestion_competencias.actualizarCompetencia(req.body.codigo_competencia,req.body.nombre_competencia);        
        console.log(consulta)
        console.log('id_programa_formacion',req.query.id_programa_formacion)
        /***
         * {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 }
         */
        // res.redirect(`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}`);
        console.log(req.body)        
        let respuestaUsuario = ''
        if(consulta.affectedRows){
            respuestaUsuario = `La competencia con el codigo ${req.body.codigo_competencia} su nuevo nombre es ${req.body.nombre_competencia} `
            
        }else{
            consulta.error
            respuestaUsuario = consulta.error?consulta.error:`La accion no se pudo ejecutar devido a que la competencia con el numero ${req.body.nombre_competencia} no existe.`

        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver edicion de competencias',
            dirreccion:`/gestion_de_competencia/edicion_competencias${req.query.id_programa_formacion?"?id_programa_formacion="+req.query.id_programa_formacion:""}` })
 
    }
}

module.exports = Gestion_de_Competencia;