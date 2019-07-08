/**
 * @var
 * {require}
 * declaramos variables para hacer traer al servidor
 */

var express = require('express');
var router = express.Router();



/**
 * @constructor
 * {control_de_acceso}
 * aca solo llamaos las direcciones y las funciones que se crearon en 
 * la clase control_de_acceso 
 */
var JuiciosEvaluativos = require('./juiciosEvaluativos')
var juiciosEvaluativos = new JuiciosEvaluativos();



// juicios evaluativos
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

module.exports = router;
