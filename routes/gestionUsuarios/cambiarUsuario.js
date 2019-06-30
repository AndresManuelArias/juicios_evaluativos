var mysql = require('../../dataBase/conexion.js');

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
  async menuSegunUsuario(req, res){
    if(req.session.id_administrar_perfil){
      let administrarPerfil=await mysql.con.query('select * from administrar_perfil where  id_administrar_perfil=?',[req.session.id_administrar_perfil]);
      let { Id_usuario,nombre_usuario,correo_sena,tipo_de_identificacion} = req.session.datos[0];
      let datos = {
        idUsuario: Id_usuario,
        nombreUsuario: nombre_usuario,
        correoSena: correo_sena,
        tipoIdentificacion: tipo_de_identificacion,
        sessionId: req.session.id,
        tipoUsuario: req.session.rol
      }
      renderizarTipoRol(administrarPerfil[0].tipo_rol,datos, res);    }
    else{
      res.redirect('/control_de_acceso')
    }

  }

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
    req.session.id_administrar_perfil = administrarPerfil[0].id_administrar_perfil// esto es para que funcione el modulo de juicios evaluativos
    renderizarTipoRol(administrarPerfil[0].tipo_rol,datos, res)
  }
}

function renderizarTipoRol(tipo_rol,datos,res){
  if (tipo_rol == "administrador") {
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
  else if (tipo_rol == "instructor") {
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
  else if (tipo_rol == "aprendiz") {
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

module.exports = GestionUsuarios;




