var express = require('express');
var router = express.Router();
var Ejemplo = require('./ejemploRoutes/Ejemplo.js')
var ejemplo = new Ejemplo();


var RutaAprendizaje = require('./routes_gestion_ruta_aprendizaje/RutaAprendizaje.js')
var rutaAprendizaje = new RutaAprendizaje();
var Gestion_de_Competencia = require('./routes_gestion_de_Competencia/Gestion_de_Competencia.js')
var gestion_de_Competencia = new Gestion_de_Competencia();
var Gestion_programa_de_formacion = require('./routes_programa_de_formacion/Gestion_programa_de_formacion.js')
var gestion_programa_de_formacion = new Gestion_programa_de_formacion();
var ResultadoAprendizaje = require('./routes_gestion_resultado_aprendizaje/ResultadoAprendizaje.js')
var resultadoAprendizaje = new ResultadoAprendizaje();

var FormacionInstructorFicha = require('./routes_formacion_instructor_ficha/FormacionInstructorFicha.js')
var formacionInstructorFicha = new FormacionInstructorFicha();

/* GET home page. */
router.get('/ejemplo/:perfil',  (req,res,next)=>{
    console.log(req.params)
    res.locals.options = {
        chGlobal : {// this is the object i want to be a global
            "perfil" : req.params.perfil,
            "nombreUsuario":req.query.nombreUsuario||''
        }
    };
    next();
}, function(req, res, next) {
    console.log('res.locals',res.locals)
    ejemplo.metodo(req, res);
});
router.get('/ejemplo',  (req,res,next)=>{
    res.locals.options = {
        chGlobal : {// this is the object i want to be a global
            "perfil" : "invitado"
        }
    };
    next();
}, function(req, res, next) {
    ejemplo.metodo(req, res);
});


router.get('/ejemplo1/sesion',  function(req, res, next) {
    console.log(req.session)
    if (req.session.usuario) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.write('<p>usser in: ' + req.session.usuario + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        req.session.usuario = req.query.usuario

        res.end('welcome to the session demo. refresh!')
      }
});
router.get('/ejemplo2/sesion',  function(req, res, next) {
    console.log(req.session)
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>usser in: ' + req.session.usuario + '</p>')
    res.end()

})


/* aqui inicia la logica de negocio */
// competencias
router.get('/gestion_de_competencia/edicion_competencias',  function(req, res, next) {
    gestion_de_Competencia.edicionCompetencias(req, res);
});

router.post('/gestion_de_competencia',  function(req, res, next) {
    gestion_de_Competencia.ejecutarRest(req, res);
});
router.get('/gestion_de_competencia',  function(req, res, next) {
    gestion_de_Competencia.ejecutaRestView(req, res);
});
router.get('/gestion_de_competencia/consultar_existencia',  function(req, res, next) {
    console.log('consultado')
    gestion_de_Competencia.consultarExistenciaCompetencias(req, res);
});
// resultado de aprendizaje
router.get('/gestion_de_resultado_aprendizaje/all/:id_gestion_de_competencia',  function(req, res, next) {
    console.log('/gestion_de_resultado_aprendizaje/all')
    resultadoAprendizaje.consultarResultadosAprendizaje(req, res);
});

router.get('/gestion_de_resultado_aprendizaje/existencia/:id_gestion_de_competencia',  function(req, res, next) {
    console.log('/gestion_de_resultado_aprendizaje/existencia')
    resultadoAprendizaje.consultarExistencia(req, res);
});
router.get('/gestion_de_resultado_aprendizaje/:id_gestion_de_competencia',  function(req, res, next) {
    console.log('get/gestion_de_resultado_aprendizaje')
    resultadoAprendizaje.ejecutaRestView(req, res);
});

router.post('/gestion_de_resultado_aprendizaje/:id_gestion_de_competencia',  function(req, res, next) {
   console.log(req.body)
   resultadoAprendizaje.ejecutarRest(req, res);
});

// programas_de_formacion
router.get('/gestion_de_programas_de_formacion/edicion_programas_de_formacion',  function(req, res, next) {
    console.log('/gestion_de_programas_de_formacion/edicion_programas_de_formacion')
    gestion_programa_de_formacion.edicionProgramaDeFormacion(req, res);
});

router.post('/gestion_de_programas_de_formacion',  function(req, res, next) {
    gestion_programa_de_formacion.ejecutarRest(req, res);
});
router.get('/gestion_de_programas_de_formacion',  function(req, res, next) {
    gestion_programa_de_formacion.ejecutaRestView(req, res);
});
router.get('/gestion_de_programas_de_formacion/consultar_existencia',  function(req, res, next) {
    console.log('consultado')
    gestion_programa_de_formacion.consultarExistenciaProgramaDeFormacion(req, res);
});

// ruta de aprendizaje
// router.get('/gestion_de_programas_de_formacion/edicion_programas_de_formacion',  function(req, res, next) {
//     gestion_programa_de_formacion.edicionProgramaDeFormacion(req, res);
// });
router.get('/gestion_de_ruta_de_aprendizaje',  function(req, res, next) {
    console.log('gestion_de_ruta_de_aprendizaje')
    rutaAprendizaje.menuEdicion(req, res);
});
router.post('/gestion_de_ruta_de_aprendizaje',  function(req, res, next) {
    console.log('gestion_de_ruta_de_aprendizaje')
    rutaAprendizaje.redireccion(req, res);
});
router.post('/gestion_de_ruta_de_aprendizaje/edit/:id_programa_formacion',  function(req, res, next) {
    rutaAprendizaje.ejecutarRest(req, res);
});
router.get('/gestion_de_ruta_de_aprendizaje/edit/:id_programa_formacion',  function(req, res, next) {
    rutaAprendizaje.ejecutaRestView(req, res);
});
// gestion de formacion
router.get('/gestion_de_la_formacion_instructor_ficha/:Id_GestionDeFichas',  function(req, res, next) {
    console.log('gestion_de_la_formacion_instrutor_ficha')
    formacionInstructorFicha.menuEdicion(req, res);
});
router.get('/gestion_de_la_formacion_instructor_ficha',  function(req, res, next) {
    console.log('gestion_de_la_formacion_instrutor_ficha')
    formacionInstructorFicha.menuEdicion(req, res);
});
router.post('/gestion_de_la_formacion_instructor_ficha',  function(req, res, next) {
    console.log('gestion_de_la_formacion_instructor_ficha')
    formacionInstructorFicha.edicion(req, res)
});
router.post('/gestion_de_la_formacion_instructor_ficha/edit/:Id_GestionDeFichas',  function(req, res, next) {
    formacionInstructorFicha.ejecutarRest(req, res);
});
router.get('/gestion_de_la_formacion_instructor_ficha/edit/:Id_GestionDeFichas',  function(req, res, next) {
    formacionInstructorFicha.ejecutaRestView(req, res);
});
module.exports = router;
