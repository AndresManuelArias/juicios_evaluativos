var mysql = require('../../dataBase/conexion.js');
const nodemailer = require("nodemailer");
const expressSession = require("express-session");
var Control_de_acceso = require("../control_de_acceso/control_de_acceso.js");
const control_de_acceso = new Control_de_acceso();
var sessionExpres = new expressSession();
class GestionUsuarios {
  //     constructor(
  //         session,
  //         nombreUsuario
  //     ) {
  //         this.session = session;
  //         this.nombreUsuario = nombreUsuario;
  //     }

  //     async cerrarSesion(
  //         session,
  //         nombreUsuario
  //     ) { 
  //         let cerrarSesion = {
  //             session: session,
  //             nombreUsuario: nombreUsuario
  //         };
  //     }



  // }
  async tipoUsuario(req, res) {
    // var datosUsuario={
    //   usuario:req.body.datosUsuario
    // }
    let administrarPerfil=await mysql.con.query('select * from administrar_perfil where id_usuario=? and id_administrar_perfil=?',[req.session.datos[0].Id_usuario,req.body.perfil]);
    console.log("-------------------------------------------")
    console.log(req.session.datos)
    console.log(req.body.perfil)
    console.log(req.session.id)
    console.log("-------------------------------------------")
    req.session.rol=req.body.perfil;
    console.log("-----xxxxxx--------------------------------------")
    console.log(req.session.rol);
    console.log("-----------xxxxxxxx--------------------------------")
    
    let datos = {
      idUsuario: req.session.datos[0].Id_usuario,
      nombreUsuario: req.session.datos[0].nombre_usuario,
      correoSena: req.session.datos[0].correo_sena,
      tipoIdentificacion: req.session.datos[0].tipo_de_identificacion,
      sessionId: req.session.id,
      tipoUsuario: req.session.rol
    }

    if (administrarPerfil[0].tipo_rol == "administrador") {
      res.render("gestionUsuarios/administrador.jade",
        {
          idUsuario: datos.idUsuario,
          nombreUsuario: datos.nombreUsuario,
          correoSena: datos.correoSena,
          tipoIdentificacion: datos.tipoIdentificacion,
          sessionId: datos.sessionId,
          tipoUsuario: datos.tipoUsuario
        });
    }
    else if (administrarPerfil[0].tipo_rol == "instructor") {
      res.render("gestionUsuarios/instructor.jade",
        {
          idUsuario: datos.idUsuario,
          nombreUsuario: datos.nombreUsuario,
          correoSena: datos.correoSena,
          tipoIdentificacion: datos.tipoIdentificacion,
          sessionId: datos.sessionId,
          tipoUsuario: datos.tipoUsuario
        });
    }
    else if (administrarPerfil[0].tipo_rol == "aprendiz") {
      res.render("gestionUsuarios/aprendiz.jade",
        {
          idUsuario: datos.idUsuario,
          nombreUsuario: datos.nombreUsuario,
          correoSena: datos.correoSena,
          tipoIdentificacion: datos.tipoIdentificacion,
          sessionId: datos.sessionId,
          tipoUsuario: datos.tipoUsuario
        });
    }
    else {
      res.send("error de parametros")
    }
  }
}

module.exports = GestionUsuarios;




