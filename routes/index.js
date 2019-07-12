var express = require('express');
var router = express.Router();
var Ejemplo = require('./ejemploRoutes/Ejemplo.js')
var ejemplo = new Ejemplo();
var Gestion_fichas = require('./routes_gestion_fichas/Gestion_fichas.js')
var gestion_fichas = new Gestion_fichas();
var mysql = require('../dataBase/conexion.js');
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
router.get('/mostrar_usuario',  function(req, res, next) {
    gestion_fichas.mostar_usuarios(req, res);
});
router.get('/mostrar_aprendices_ficha',  function(req, res, next) {
    gestion_fichas.mostrar_aprendices_ficha(req, res);
});
router.get('/asignar_aprendices',  function(req, res, next) {
    gestion_fichas.asignar_aprendices(req, res);
});
router.get('/post_asignar_aprendices',  function(req, res, next) {
    gestion_fichas.post_asignar_aprendices(req, res);
});
router.get('/buscar_aprendiz',  function(req, res, next) {
    gestion_fichas.buscar_aprendiz(req, res);
});
router.get('/mostrar_fichas',  function(req, res, next) {
    gestion_fichas.mostrar_fichas(req, res);
});
router.get('/modificar_fichas/:Numero_de_ficha',  function(req, res, next) {
    gestion_fichas.vista_modificar_fichas(req, res);
});
router.get('/crear_fichas',  function(req, res, next) {
    gestion_fichas.vista_crear_fichas(req, res);
});
router.post('/crear_fichas',  function(req, res, next) {
    gestion_fichas.crear_fichas(req, res);
});
router.post('/modificar_fichas/:Numero_de_ficha',  function(req, res, next) {
    gestion_fichas.modificar_fichas(req, res);
});
router.post('/asignar_aprendices_fichas',  function(req, res, next) {
    gestion_fichas.asignar_fichas_aprendiz(req, res);
});
router.get('/asignar_aprendices_fichas',  function(req, res, next) {
    console.log("............")
    gestion_fichas.view_asignar_aprendiz_ficha(req, res);
});
router.get('/modificar_aprendices_fichas/:id_gestion_ficha_aprendiz',  function(req, res, next) {
    gestion_fichas.view_modificar_aprendiz_ficha(req, res);
});
router.post('/modificar_aprendices_fichas/:id_gestion_ficha_aprendiz',  function(req, res, next) {
    gestion_fichas.modificar_fichas_aprendiz(req, res);
});
router.get('/listar_aprendices_ficha',  function(req, res, next) {
    gestion_fichas.listar_aprendices_ficha(req, res);
});
/* aqui inicia la logica de negocio */
module.exports = router;
