var express = require('express');
var router = express.Router();
var Ejemplo = require('./ejemploRoutes/Ejemplo.js')
var ejemplo = new Ejemplo();




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


/* aqui inicia la logica de negocio */



module.exports = router;
