/**
 * @var
 * {require}
 * declaramos variables para hacer traer al servidor
 */

var express = require('express');
var router = express.Router();
var Ejemplo = require('./ejemploRoutes/Ejemplo.js');
var Control_de_acceso = require("./control_de_acceso/control_de_acceso.js");
var GestionUsuarios = require("./gestionUsuarios/cambiarUsuario.js");
var ejemplo = new Ejemplo();
var control_de_acceso = new Control_de_acceso();
var gestionUsuarios = new GestionUsuarios();
const clasesGestionUsuarios = require('../routes/gestionUsuarios/clasesGestionUsuarios/index');

var mysql = require('../dataBase/conexion.js');

/**
 * @constructor
 * {control_de_acceso}
 * aca solo llamaos las direcciones y las funciones que se crearon en 
 * la clase control_de_acceso 
 */



/* aqui inicia la logica de negocio de esteban */
router.get("/control_de_acceso", function (req, res) {
    control_de_acceso.inisio_de_secion(req, res);
});

router.post("/envio_de_datos", function (req, res) {

    control_de_acceso.guardar_datos(req, res);
});
router.post("/buscar_datos", function (req, res) {

    control_de_acceso.buscar_datos(req, res);
})
router.get("/comprobar_correo", function (req, res) {
    control_de_acceso.verificar_correo(req, res);
})
router.get("/comprobar_cedula", function (req, res) {
    control_de_acceso.verificar_documento(req, res);
})

router.get("/comprobar_correo_de_logeo", function (req, res) {
    control_de_acceso.verificar_correo_de_logueo(req, res);
})
router.get("/recupera_contrasena", function (req, res) {
    control_de_acceso.recuperar_contrasena(req, res);
    console.log("envio de datos  ")
});
router.post("/enviar_contrasena", function (req, res) {
    console.log("hola")
    control_de_acceso.enviar_contrasenaa(req, res);
});
router.get("/contrasena_enviada", function (req, res) {
    control_de_acceso.contrasenaEnviada(req, res);

    console.log("sale")
});

router.get("/prueba", function (req,res) {

    res.send(req.session.id + `  ${req.session.id_usuario}`);
})

router.get("/paginaPrincipal", function (req, res) {

    control_de_acceso.paginaPrincipal(req, res);

});
router.post("/tipoUsuario",function (req, res) {
    gestionUsuarios.tipoUsuario(req,res);
    console.table({prueba:"esto es una prueba"})
});
router.get("/prueba_permisos_administrador",clasesGestionUsuarios.permitirAccesoWeb(['administrador']) ,function (req, res) {
    console.table({prueba:"session"})
    res.send("puede entrar");
});
router.post("/borrarSesion",function(req,res){
    control_de_acceso.inisio_de_secion(req, res)
});
router.post("/pureba1",function(req,res){
   let texto= req.body.titre
    document.write(texto)
})

//aqui termina la logica de negocio de esteban
module.exports = router;
