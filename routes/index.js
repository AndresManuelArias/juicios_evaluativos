var express = require('express');
let mysql = require ("../dataBase/conexion.js");
var router = express.Router();
let gestion_usuarios = require('./routes_Gestion_de_usuarios/index_usuarios')
/* GET home page. */
router.get('/', function(req, res, next) {// esta es la dirrecion a web a la que el usuario accede desde el navegador
  res.render('index', { title: 'Express',cuerpo:'Esta es la pagina de ejemplo' });
});
router.get('/gestion_perfiles/usuarios', function (req, res) {
   gestion_usuarios.ver_usuario(req, res);
});

router.post('/gestion_perfiles/usuarios',function (req, res) {
  gestion_usuarios.ver_usuario(req, res);
});

router.post('/gestion_perfiles/asignar_perfil',function (req, res) {
  gestion_usuarios.asignar_perfiles(req, res);
});
router.get('/gestion_perfiles/cambiar_estado_perfil', function (req, res) {
  gestion_usuarios.ver_estado_perfil(req, res);
});
router.post('/gestion_perfiles/cambiar_estado_perfil',function (req, res) {
  gestion_usuarios.cambiar_estado_perfil(req, res);
});
router.get('/gestion_perfiles/actualizar_perfil', function (req, res) {
   gestion_usuarios.vista_actualizar_perfil(req, res);
});
router.get('/gestion_perfiles/ver_estado_perfil', function (req, res) {
  gestion_usuarios.ver_estado_perfil(req, res);
});
router.post('/gestion_perfiles/ver_estado_perfil', function (req, res) {
  gestion_usuarios.cambiar_estado_perfil_un_usuario(req,res);
});
router.get('/gestion_perfiles/listar_usuarios_perfil', function (req, res) {
  gestion_usuarios.listar_usuarios_perfil(req, res);
});

router.get('/gestion_perfiles/crear_perfil/:id_usuario', function (req, res) {
  gestion_usuarios.vista_crear_perfil(req, res);
});

module.exports = router;
