const mysql = require('../../dataBase/conexion.js');
const ClasesControlDeAcceso = require("./clases_control_de_acceso");
const clasesControlDeAcceso = new ClasesControlDeAcceso.ClasesControlDeAcceso()
const expressSession = require("express-session");
class Control_de_acceso {

    inisio_de_secion(req, res) {
        console.log("---ANTES DE QUE SE BORRE");
        console.log(req.session.id);
        req.session.destroy(function (err) {
            console.log("---YA SE BORRO---------");

        })
        res.render("control_de_acceso/control_de_acceso.jade");

    }
    async guardarParaExportar(req, res) {
        let datos = await clasesControlDeAcceso.buscar_datos(req.body.correo_sena, req.body.contrasena)

        console.log("esta es " + datos + " esta es")
        return datos

    }

    async guardar_datos(req, res) {
        let respuesta = await clasesControlDeAcceso.guardar_datos(req.body.nombre_usuario,
            req.body.correo_sena,
            req.body.numero_de_identificacion,
            req.body.tipo_de_identificacion,

        )


        if (respuesta == "Error de parametros") {

            //res.write("alert('datos no validos')")
            this.inisio_de_secion(req, res)
            console.log("datos aslkfjsalkj")

        } else {
            res.writeHead(200, { "Content-Type": "text/html" });

            console.log('respuesta', respuesta);
            res.write(respuesta)
            res.end();

        }
    }

    async buscar_datos(req, res, err) {
        let datos = "";
        console.log("req.body", req.body)
        // session = req.session

        datos = await clasesControlDeAcceso.buscar_datos(req.body.correo_sena, req.body.contrasena)
        if (datos == "Error de parametros") {

            // hacer un join 
            this.inisio_de_secion(req, res);
            console.log("    ESTOS DATOS ESTAN MAL   ")

        } else {
            //console.log("sesion ------ ",req.session);
            //req.session.name = req.body.correo_sena
            //console.log("sesion name 1 ",req.session);
            let conGestionUsuarios = await mysql.con.query(`select * from  gestion_de_usuarios where correo_sena=?`, [req.body.correo_sena])
            req.session.id_usuario = conGestionUsuarios[0].Id_usuario;
            req.session.datos = conGestionUsuarios;
            // console.log("+++++++++++++++++++++++");
            // console.log(req.cookie.expires);
            // console.log( req.session.expires);
            // console.log("+++++++++++++++++++++++");
            res.redirect("/paginaPrincipal");

        }
    }
    //-----------------------------------------------------------------
    async verificar_correo(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var sql = await mysql.con.query("SELECT correo_sena FROM control_de_acceso WHERE correo_sena=?", [req.query.correo]);
        res.write(JSON.stringify(sql));
        res.end();
    }
    /**
     * @name verificar_documento
    * @method verificar_documento
     *@param r/*eq-resive la peticion
     * @param res-envia respuesta 
     * @description esta es una pequeña api para enviar los datos del formularios por medio de
     * @description peticiones ajax para verificar que el documento no este en la base de datos
     * 
     */


    async verificar_documento(req, res) {
        console.log(req.query)
        console.log('entrando')
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var sql = await mysql.con.query("SELECT numero_de_identificacion FROM gestion_de_usuarios WHERE numero_de_identificacion=?", [req.query.numero_de_identificacion]);
        console.log(JSON.stringify(sql));
        res.write(JSON.stringify(sql));
        res.end();
    }

    /*/**
     * alert("hola mundo");@name verificar_correo_de_logueo
     * @method verificar_correo_de_logueo
     * @param req-resive la peticion
     * @param res-envia respuesta
     * @description esta es una pequeña api para enviar los datos del formularios por medio de
     * @description  peticiones ajax para verificar que el correo esta en la base de datos y de esta 
     * @description manera no ingresar con usuarios que no existen 
     * 
     */

    async verificar_correo_de_logueo(req, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var sql = await mysql.con.query('SELECT correo_sena FROM control_de_acceso WHERE correo_sena=?', [req.query.correo]);
        res.write(JSON.stringify(sql));
        res.end();
    }

    //recuperar cambiar o enviar contraseña
    //---------------------------------------------------------------------------------------

    recuperar_contrasena(req, res) {
        console.log(req.query);
        res.render("control_de_acceso/recuperar_contraseña.jade");

    }

    async enviar_contrasenaa(req, res) {
        var sql = await clasesControlDeAcceso.enviar_contrasenaa(req.body.correo_de_recuperacion);
        console.log("redireccionando")
        res.redirect("/contrasena_enviada");

    }

    contrasenaEnviada(req, res) {
        console.log(req.query);
        res.render("control_de_acceso/contraseña_enviada.jade");
    }
    async paginaPrincipal(req, res) {
console.log(req.session.datos[0].Id_usuario)
        let perfilesUsuario=await mysql.con.query('SELECT * FROM administrar_perfil WHERE id_usuario=?',[req.session.datos[0].Id_usuario]);
         
        // let entrada= await mysql.con.query('SELECT nombre_usuario from gestion_de_usuarios WHERE correo_sena="emeza06@misena.edu.co"');
        // console.log(entrada)
        // let datos=JSON.stringify(entrada);
        //   let  perfilesUsuario1 = [{
        //       id_administrar_perfil:1,id_usuario:1,tipo_rol:'aprendiz',id_estado_perfil:1},
        //     {id_administrar_perfil:2,id_usuario:1,tipo_rol:'instructor',id_estado_perfil:1},
        //     {id_administrar_perfil:3,id_usuario:1,tipo_rol:'instructor',id_estado_perfil:1},
        //      {id_administrar_perfil:4,id_usuario:1,tipo_rol:'administrador',id_estado_perfil:1},
        //      {id_administrar_perfil:5,id_usuario:2,tipo_rol:'aprendiz',id_estado_perfil:1},
        //      {id_administrar_perfil:6,id_usuario:2,tipo_rol:'administrador',id_estado_perfil:1}
        // ]
        // primero: id administrar perfil : primary key
        // id usuario llave foranea de la tabla usuarios
        // tipo roll tipo de rol que tiene el usuario
        //estado del perfil: activo inactivo 

        console.log(req.session.datos)
        let datosUsuario = {
            nombre: req.session.datos[0].nombre_usuario,
            id: req.session.datos[0].Id_usuario,
            nId: req.session.datos[0].numero_de_identificacion,
            tipoId: req.session.datos[0].tipo_de_identificacion,
            correo: req.session.datos[0].correo_sena
        }
        console.log(req.session.datos[0].nombre_usuario + ` + ` + req.session.datos[0].Id_usuario)
        res.render("gestionUsuarios/gestionUsuarios.jade", {
            nombre: datosUsuario.nombre,
            id: datosUsuario.id,
            correo: datosUsuario.correo,
            tipoId: datosUsuario.tipoId,
            nId: datosUsuario.nId,
            perfilesUsuario: perfilesUsuario
        });
    }



}

/**
 * @name exportar
 *  @method exports
 * @description exportar la clase  
 */



module.exports = Control_de_acceso;
