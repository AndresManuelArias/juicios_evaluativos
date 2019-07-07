var Modelo_programa_de_formacion =  require('./Modelo_programa_de_formacion.js');
var modelo_programa_de_formacion = new Modelo_programa_de_formacion();
var QueryCrud  = require('../utilidades_ruta_aprendizaje/QueryCrud.js');

/**
 * Shirt module.
 * @module programa_de_formacion
 */
class programa_de_formacion extends QueryCrud {
    // /** * @async
    //  * @method menu
    //  * * @param {object} req - 
    //  * * @param {object} res - 
    //  * 
    //  */
    // async menu(req, res, next) {
    //     res.render('./view_programa_de_formacion/menu.jade', { title: 'Gestion de programa de formacion',
    //         menu:"active",
    //         crear:"",
    //         edicion:"",
    //         id_programa_formacion:req.query.id_programa_formacion
    //     });// es necesario insertar datos a la tabla de gestion de usuario
    // }
    /**  
     * @async
     * @method vistaCrearProgramaDeFormacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    crearView(req, res, next) {
        console.log('render')
        res.render('./view_programa_de_formacion/insert_programa_de_formacion.jade', { title: 'Gestion de programa de formacion',resultado:
            {codigo:"",nombre:"",
            errorCodigo:false,
            errorNombre:false,
        },
        id_programa_formacion:req.query.id_programa_formacion});// es necesario insertar datos a la tabla de gestion de usuario
    }
        /**  
     * @async
     * @method edicionProgramaDeFormacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async edicionProgramaDeFormacion(req, res, next){
        var nombre_programa_de_formacion = await modelo_programa_de_formacion.consultarProgramasDeFormacion();
        console.log(nombre_programa_de_formacion);
        res.render('./view_programa_de_formacion/edicion_programa_de_formacion.jade', { 
            programas_de_formacion:nombre_programa_de_formacion,
            title: 'Gestion de programa de formacion'});// es necesario insertar datos a la tabla de gestion de usuario        
    }
    /**  
     * @async
     * @method crearProgramaDeFormacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async crear(req, res, next) {
       let resultado = await modelo_programa_de_formacion.crearProgramaDeFormacion(req.body.codigo_programa_de_formacion,req.body.nombre_programa_de_formacion);
       console.log('resultado',resultado);
        res.render('./view_programa_de_formacion/insert_programa_de_formacion.jade', { 
            title: 'Gestion de programa de formacion',resultado:resultado,id_programa_formacion:req.query.id_programa_formacion,
        });// es necesario insertar datos a la tabla de gestion de usuario
    }
    /**  
     * @async
     * @method consultarExistenciaProgramaDeFormacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async consultarExistenciaProgramaDeFormacion(req, res, next) {
        let consulta = await modelo_programa_de_formacion.validarExistenciaProgramaDeFormacion(req.query.codigo_programa_de_formacion);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ existe: consulta }));
        res.end();
    }
    /**  
     * @async
     * @method vistaEliminarProgramaDeFormacion - Es la vista que permitira al usuario ver de programa de formacion y poder eliminar
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async eliminarView(req, res, next){
        console.log('vistaEliminarProgramaDeFormacion')
        let consulta = await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.codigo)
        if(consulta.length === 0){
            res.redirect(`/gestion_de_programas_de_formacion/edicion_programas_de_formacion?id_programa_formacion=${req.query.id_programa_formacion}`);
        }else{
            console.log(consulta)//12341234
            res.render('./view_programa_de_formacion/eliminar_programa_de_formacion.jade', { 
                title: 'Gestion de programa de formacion',
                resultado:{
                    codigo:consulta.length >0?consulta[0].id_programa_formacion:"",
                    nombre:consulta.length >0?consulta[0].nombre_programa_formacion:"",
                    errorCodigo:false,
                    errorNombre:false,
                },                       
                title: 'Gestion de programa de formacion'
            });// es necesario insertar datos a la tabla de gestion de usuario
        }
    }
    /**  
     * @async
     * @method eliminarProgramaDeFormacion - Permitira al usuario eliminar de programa de formacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async eliminar(req, res, next){
        let consulta = await modelo_programa_de_formacion.eliminarProgramaDeFormacion(req.body.codigo_programa_de_formacion);        
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
        // res.redirect(`/gestion_de_programas_de_formacion/edicion_programas_de_formacion?id_programa_formacion=${req.query.id_programa_formacion}`);
        let respuestaUsuario = ''
        if(consulta.affectedRows){
            respuestaUsuario = `El programa de formacion: ${req.body.nombre_programa_de_formacion} Con el codigo ${req.body.codigo_programa_de_formacion} fue eliminada`
            
        }else{
            respuestaUsuario = consulta.error?consulta.error:`La accion no se puedo ejecutar devido a que el programa de formación con el numero ${req.body.codigo_programa_de_formacion} no existe`

        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver edicion programas de formación',
            dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion?id_programa_formacion=${req.query.id_programa_formacion}` })
    }
    /**  
     * @async
     * @method vistaActualizarProgramaDeFormacion - Es la vista para que el usuario pueda actualizar de programa de formacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async actualizarView(req, res, next){
        console.log('vistaActualizarProgramaDeFormacion')
        let consulta = await modelo_programa_de_formacion.verProgramaDeFormacion(req.query.codigo)
        console.log(consulta)
        if(consulta.length == 0){
            res.redirect(`/gestion_de_programas_de_formacion/edicion_programas_de_formacion?id_programa_formacion=${req.query.id_programa_formacion}`);
        }else{
            res.render('./view_programa_de_formacion/actualizar_programa_de_formacion.jade', { 
                title: 'Gestion de programa de formacion',
                resultado:{
                    codigo:consulta.length >0?consulta[0].id_programa_formacion:"",
                    nombre:consulta.length >0?consulta[0].nombre_programa_formacion:"",
                    errorCodigo:false,
                    errorNombre:false,
                },                       
                title: 'Gestion de programa de formacion'
            });// es necesario insertar datos a la tabla de gestion de usuario
        }
    }
    /**  
     * @async
     * @method actualizarProgramaDeFormacion -Actualizar de programa de formacion
     *  @param {object} req - 
     *  @param {object} res - 
     */
    async actualizar(req, res, next){
        let consulta = await modelo_programa_de_formacion.actualizarProgramaDeFormacion(req.body.codigo_programa_de_formacion,req.body.nombre_programa_de_formacion);        
        console.log(consulta)
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
        // res.redirect(`/gestion_de_programas_de_formacion/edicion_programas_de_formacion`);
        let respuestaUsuario = ''
        if(consulta.affectedRows){
            respuestaUsuario = `El programa de formacion con el codigo ${req.body.codigo_programa_de_formacion} su nuevo nombre es ${req.body.nombre_programa_de_formacion} `
            
        }else{
            consulta.error
            respuestaUsuario = consulta.error?consulta.error:`La accion no se puedo ejecutar devido a que el programa de formación con el numero ${req.body.codigo_programa_de_formacion} no existe`

        }
        res.render('./utilidades_ruta_aprendizaje/respuesta_a_usuario.jade', { 
            title: 'Gestion de programa de formacion' ,
            respuestaUsuario:respuestaUsuario,
            ir_lugar:'Volver edicion programas de formación',
            dirreccion:`/gestion_de_programas_de_formacion/edicion_programas_de_formacion?id_programa_formacion=${req.query.id_programa_formacion}` })

    }
}

module.exports = programa_de_formacion;