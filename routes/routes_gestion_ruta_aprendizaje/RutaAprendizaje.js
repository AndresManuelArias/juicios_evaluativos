let ModeloRutaAprendizaje =  require('./ModeloRutaAprendizaje.js');
let modeloRutaAprendizaje = new ModeloRutaAprendizaje();
let QueryCrud  = require('../utilidades_ruta_aprendizaje/QueryCrud.js');
let Modelo_gestion_competencias =  require('../routes_gestion_de_Competencia/Modelo_gestion_competencias.js');
let modelo_gestion_competencias = new Modelo_gestion_competencias();
let Modelo_programa_de_formacion =  require('../routes_programa_de_formacion/Modelo_programa_de_formacion.js');
let modelo_programa_de_formacion = new Modelo_programa_de_formacion();
/**
 * Represents a RutaAprendizaje.
 * @constructor
 *@param {string} req - l
 *@param {string} res - l
 *@param {string} next - l
 */
class RutaAprendizaje extends QueryCrud{
    // async metodo(req, res, next) {
    //     let usuarios = await mysql.con.query("SELECT * FROM gestion_de_usuarios");
    //     console.log(usuarios)
    //      res.render('./viewEjemplo/ejemplo.jade', { title: 'Ejemplo',usuarios:usuarios });// es necesario insertar datos a la tabla de gestion de usuario
    // }
    async menuEdicion(req, res, next) {
        let programaDeFormacion = await modeloRutaAprendizaje.consultarProgramaDeFormacion();
        if(programaDeFormacion.length == 0){
            
            res.redirect(`gestion_de_programas_de_formacion`);

        }
       
        console.log(programaDeFormacion)
         res.render('./view_gestion_ruta_aprendizaje/menu_ruta_aprendizaje.jade', { title: 'Edicion ruta de aprendizaje',programaDeFormacion:programaDeFormacion });// es necesario insertar datos a la tabla de gestion de usuario
    }
    redireccion(req, res, next){
        console.log(req.body)
        switch (req.body.accion) {
            case 'crear':
                res.redirect(`/gestion_de_competencia?accion=Crear&id_programa_formacion=${req.body.id_programa_formacion}`);
            break;
            case 'agregar':
                res.redirect(`/gestion_de_ruta_de_aprendizaje/edit/${req.body.id_programa_formacion}?accion=Crear`);
            break;
            case 'eliminar':
                res.redirect(`/gestion_de_ruta_de_aprendizaje/edit/${req.body.id_programa_formacion}?accion=Eliminar`);
            break;            
            
            default:
                break;
        }
    }
    async eliminar(req,res){
         console.log('eliminar ruta de aprendizaje')
        let rutaDeAprendizaje= await modeloRutaAprendizaje.consultarLaCompetenciaDeRutaDeAprendizaje(req.body.id_ruta_aprendizaje)
       console.log(rutaDeAprendizaje)
       let  respuestaEliminarRutaDeAprendizaje = await modeloRutaAprendizaje. eliminarRutaDeAprendizaje(req.body.id_ruta_aprendizaje)
       console.log(respuestaEliminarRutaDeAprendizaje)
       let respuestaUsuario = ""
       if(respuestaEliminarRutaDeAprendizaje.affectedRows){
        respuestaUsuario = `La competencia ${rutaDeAprendizaje[0].nombre_competencia} fue eliminada del programa de formacion ${rutaDeAprendizaje[0].nombre_programa_formacion}.`
       }else{
        respuestaUsuario = respuestaEliminarRutaDeAprendizaje.error?respuestaEliminarRutaDeAprendizaje.error:`La accion no se puedo ejecutar devido a que la ruta de aprendizaje numero ${req.body.id_ruta_aprendizaje} no existe`
       }
        res.render('./view_gestion_ruta_aprendizaje/informarUsuario.jade', { title: 'Edicion ruta de aprendizaje', respuestaUsuario:respuestaUsuario ,accion:req.body.accion,id_programa_formacion:req.params.id_programa_formacion})

    }
    async eliminarView(req, res){
        console.log('eliminar view')
       let rutaDeAprendizaje= await modeloRutaAprendizaje.consultarCompetenciasDeRutaDeAprendizaje(req.params.id_programa_formacion)
       console.log(rutaDeAprendizaje)
       res.render('./view_gestion_ruta_aprendizaje/eliminarCompetenciaProgramaFormacion.jade', { title: 'Edicion ruta de aprendizaje',rutaDeAprendizaje:rutaDeAprendizaje})
    }
    async crearView(req, res){
        let programaFormacion = await modelo_programa_de_formacion.verProgramaDeFormacion(req.params.id_programa_formacion) 
        let competencias= await modeloRutaAprendizaje.consultarCompetenciasQueNoSonProgramaFormacion(req.params.id_programa_formacion)
        console.log(req.query.id_programa_formacion,programaFormacion,competencias)


        res.render('./view_gestion_ruta_aprendizaje/agregarCompetenciaProgramaFormacion.jade', { title: 'Edicion ruta de aprendizaje',programaFormacion:programaFormacion[0] ,competencias:competencias})
    }
    async crear(req, res){
        console.log('body',req.body)
        let respuestaInsertarDatos = await modeloRutaAprendizaje.crearRutaAprendizaje(req.params.id_programa_formacion,req.body.id_gestion_de_competencia)
        let respuestaUsuario = ""
        let programaFormacion = await modelo_programa_de_formacion.verProgramaDeFormacion(req.params.id_programa_formacion) 
        let competencias= await modelo_gestion_competencias.verCompetencia(req.body.id_gestion_de_competencia)    

        console.log('respuestaInsertarDatos',respuestaInsertarDatos)
        if(respuestaInsertarDatos.next){
           console.log( respuestaInsertarDatos);
             respuestaUsuario = respuestaInsertarDatos.text+ ` El programa de formacion: ${programaFormacion[0].nombre_programa_formacion} Y la Competencia:  ${competencias[0].nombre_competencia}`
        }else {
            respuestaUsuario =`${respuestaInsertarDatos.text}${programaFormacion.length?'':' - Programa de formacion no existe.'}${competencias.length?'':' - Competencia no existe.'}` ;
        }
        res.render('./view_gestion_ruta_aprendizaje/informarUsuario.jade', { title: 'Edicion ruta de aprendizaje', respuestaUsuario:respuestaUsuario ,accion:req.body.accion,id_programa_formacion:req.params.id_programa_formacion})
    }//para eliminar en la vista debe verse es el id de la ruta de aprendizaje
}
// set DEBUG=myapp:* & npm start
module.exports = RutaAprendizaje;