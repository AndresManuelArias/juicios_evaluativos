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
let gestion_usuarios = require('./routes_Gestion_de_usuarios/index_usuarios')

var Gestion_fichas = require('./routes_gestion_fichas/Gestion_fichas.js')
var gestion_fichas = new Gestion_fichas();
/**
 * @constructor
 * {control_de_acceso}
 * aca solo llamaos las direcciones y las funciones que se crearon en 
 * la clase control_de_acceso 
 */
var JuiciosEvaluativos = require('./juiciosEvaluativos')
var juiciosEvaluativos = new JuiciosEvaluativos();
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
router.get("/tipoUsuario",function (req, res) {
    gestionUsuarios.menuSegunUsuario(req,res);
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
      }
});

/* aqui inicia la logica de negocio */
// competencias
router.get('/gestion_de_competencia/edicion_competencias',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    gestion_de_Competencia.edicionCompetencias(req, res);
});


router.post('/gestion_de_competencia',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    gestion_de_Competencia.ejecutarRest(req, res);
});
router.get('/gestion_de_competencia',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    gestion_de_Competencia.ejecutaRestView(req, res);

});
router.get('/gestion_de_competencia/consultar_existencia',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('consultado')
    gestion_de_Competencia.consultarExistenciaCompetencias(req, res);
});
// resultado de aprendizaje
router.get('/gestion_de_resultado_aprendizaje/all/:id_gestion_de_competencia',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('/gestion_de_resultado_aprendizaje/all')
    resultadoAprendizaje.consultarResultadosAprendizaje(req, res);
});

router.get('/gestion_de_resultado_aprendizaje/existencia/:id_gestion_de_competencia', clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function(req, res, next) {
    console.log('/gestion_de_resultado_aprendizaje/existencia')
    resultadoAprendizaje.consultarExistencia(req, res);
});
router.get('/gestion_de_resultado_aprendizaje/:id_gestion_de_competencia', clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function(req, res, next) {
    console.log('get/gestion_de_resultado_aprendizaje')
    resultadoAprendizaje.ejecutaRestView(req, res);
});

router.post('/gestion_de_resultado_aprendizaje/:id_gestion_de_competencia', clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function(req, res, next) {
   console.log(req.body)
   resultadoAprendizaje.ejecutarRest(req, res);
});


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
router.get('/juicios_evaluativos',clasesGestionUsuarios.permitirAccesoWeb(['instructor']),  function(req, res, next) {
  juiciosEvaluativos.viewfichasDeInstructor(req, res);
})
router.post('/juicios_evaluativos',clasesGestionUsuarios.permitirAccesoWeb(['instructor']),  function(req, res, next) {
  juiciosEvaluativos.rediredPrendicesDentroFicha(req, res);
})

router.get('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha', clasesGestionUsuarios.permitirAccesoWeb(['instructor']), function(req, res, next) {
  juiciosEvaluativos.verAprendicesDeFichaInstructor(req, res);
})
router.post('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha',clasesGestionUsuarios.permitirAccesoWeb(['instructor']),  function(req, res, next) {
  juiciosEvaluativos.rediredAsignarJuicio(req, res);
})
router.get('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha/:id_gestion_ficha_aprendiz',clasesGestionUsuarios.permitirAccesoWeb(['instructor']),  function(req, res, next) {
  juiciosEvaluativos.viewAsignarJuicioEvaluativo(req, res);
})
router.post('/juicios_evaluativos/asignar_notas/:id_formacion_da_instructor_ficha/:id_gestion_ficha_aprendiz',clasesGestionUsuarios.permitirAccesoWeb(['instructor']),  function(req, res, next) {
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

// programas_de_formacion
router.get('/gestion_de_programas_de_formacion/edicion_programas_de_formacion',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('/gestion_de_programas_de_formacion/edicion_programas_de_formacion')
    gestion_programa_de_formacion.edicionProgramaDeFormacion(req, res);
});

router.post('/gestion_de_programas_de_formacion',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    gestion_programa_de_formacion.ejecutarRest(req, res);
});
router.get('/gestion_de_programas_de_formacion',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    gestion_programa_de_formacion.ejecutaRestView(req, res);

});
router.get('/gestion_de_programas_de_formacion/consultar_existencia', function(req, res, next) {
    console.log('consultado')
    gestion_programa_de_formacion.consultarExistenciaProgramaDeFormacion(req, res);
});

// ruta de aprendizaje
// router.get('/gestion_de_programas_de_formacion/edicion_programas_de_formacion',  function(req, res, next) {
//     gestion_programa_de_formacion.edicionProgramaDeFormacion(req, res);
// });
router.get('/gestion_de_ruta_de_aprendizaje',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('gestion_de_ruta_de_aprendizaje')
    rutaAprendizaje.menuEdicion(req, res);
});
router.post('/gestion_de_ruta_de_aprendizaje',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('gestion_de_ruta_de_aprendizaje')
    rutaAprendizaje.redireccion(req, res);
});
router.post('/gestion_de_ruta_de_aprendizaje/edit',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    rutaAprendizaje.ejecutarRest(req, res);
});
router.get('/gestion_de_ruta_de_aprendizaje/edit',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    rutaAprendizaje.ejecutaRestView(req, res);
});
// gestion de formacion
router.get('/gestion_de_la_formacion_instructor_ficha/:Id_GestionDeFichas',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('gestion_de_la_foramcion_instrutor_ficha')
    formacionInstructorFicha.menuEdicion(req, res);
});
router.get('/gestion_de_la_formacion_instructor_ficha',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('gestion_de_la_foramcion_instrutor_ficha')
    formacionInstructorFicha.menuEdicion(req, res);
});
router.post('/gestion_de_la_formacion_instructor_ficha',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    console.log('gestion_de_la_formacion_instructor_ficha')
    formacionInstructorFicha.edicion(req, res)
});

router.post('/gestion_de_la_formacion_instructor_ficha/edit/:Id_GestionDeFichas',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    formacionInstructorFicha.ejecutarRest(req, res);
});
router.get('/gestion_de_la_formacion_instructor_ficha/edit/:Id_GestionDeFichas',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function(req, res, next) {
    formacionInstructorFicha.ejecutaRestView(req, res);
})
// logica de negocio gestion de perfiles
router.get('/gestion_perfiles/usuarios',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
    gestion_usuarios.ver_usuario(req, res);
})
router.post('/gestion_perfiles/usuarios',clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function (req, res) {
  gestion_usuarios.ver_usuario(req, res);
});

router.post('/gestion_perfiles/asignar_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function (req, res) {
  gestion_usuarios.asignar_perfiles(req, res);
});
router.get('/gestion_perfiles/cambiar_estado_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
  gestion_usuarios.ver_estado_perfil(req, res);
});
router.post('/gestion_perfiles/cambiar_estado_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']), function (req, res) {
  gestion_usuarios.cambiar_estado_perfil(req, res);
});
router.get('/gestion_perfiles/actualizar_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
   gestion_usuarios.vista_actualizar_perfil(req, res);
});
router.get('/gestion_perfiles/ver_estado_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
  gestion_usuarios.ver_estado_perfil(req, res);
});
router.post('/gestion_perfiles/ver_estado_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
  gestion_usuarios.cambiar_estado_perfil_un_usuario(req,res);
});
router.get('/gestion_perfiles/listar_usuarios_perfil',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
  gestion_usuarios.listar_usuarios_perfil(req, res);
});

router.get('/gestion_perfiles/crear_perfil/:id_usuario',clasesGestionUsuarios.permitirAccesoWeb(['administrador']),  function (req, res) {
  gestion_usuarios.vista_crear_perfil(req, res);
});
router.post('/gestion_perfiles/crear_perfil/:id_usuario', function (req, res) {
  gestion_usuarios.crear_perfiles(req, res);
});


/* gestion de fichas */

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
