var express = require('express');
var router = express.Router();
var Ejemplo = require('./ejemploRoutes/Ejemplo.js')
var ejemplo = new Ejemplo();
var JuiciosEvaluativos = require('./juiciosEvaluativos')
var juiciosEvaluativos = new JuiciosEvaluativos();




/* GET home page. */
router.get('/ejemplo',  function(req, res, next) {
    ejemplo.metodo(req, res);
});

router.get('/ejemplo1/sesion',  function(req, res, next) {
    console.log(req.session)
    if (req.session.usuario) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.write('<p>usser in: ' + req.session.usuario + '</p>')
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

// provisional
router.get('/juicios_evaluativos/seleccionar_instructor',  function(req, res, next) {
  juiciosEvaluativos.vistaSeleccionarInstructor(req, res);
})
router.post('/juicios_evaluativos/seleccionar_instructor',  function(req, res, next) {
  juiciosEvaluativos.seleccionarInstructor(req, res);
})

router.post('/juicios_evaluativos/seleccionar_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.seleccionarAprendiz(req, res);
})
router.get('/juicios_evaluativos/seleccionar_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.vistaSeleccionarAprendiz(req, res);
})
router.post('/juicios_evaluativos/seleccionar_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.seleccionarAprendiz(req, res);
})
/* aqui inicia la logica de negocio */
router.get('/juicios_evaluativos',  function(req, res, next) {
  juiciosEvaluativos.viewfichasDeInstructor(req, res);
})
router.post('/juicios_evaluativos',  function(req, res, next) {
  juiciosEvaluativos.rediredPrendicesDentroFicha(req, res);
})
router.get('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha',  function(req, res, next) {
  juiciosEvaluativos.verAprendicesDeFichaInstructor(req, res);
})
router.post('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha',  function(req, res, next) {
  juiciosEvaluativos.rediredAsignarJuicio(req, res);
})
router.get('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha/:id_gestion_ficha_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.viewAsignarJuicioEvaluativo(req, res);
})
router.post('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha/:id_gestion_ficha_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.asignarJuicioEvaluativo(req, res);
})
router.get('/juicios_evaluativos/ver_mis_notas',  function(req, res, next) {
  juiciosEvaluativos.viewFichasAprendiz(req, res);
})
router.post('/juicios_evaluativos/ver_mis_notas',  function(req, res, next) {
  juiciosEvaluativos.rediredJuiciosDeAprendiz(req, res);
})
router.get('/juicios_evaluativos/ver_mis_notas/:id_gestion_ficha_aprendiz',  function(req, res, next) {
  juiciosEvaluativos.viewJuiciosDeAprendiz(req, res);
})
// router.get('/juicios_evaluativos/:id_gestion_ficha_aprendiz',  function(req, res, next) {
//   juiciosEvaluativos.viewAsignar(req, res);
// })


module.exports = router;
