const mysql = require('../../../dataBase/conexion.js');

function darPermisosAlUsuario(arrayPerfilesEntran, perfilIngresado) {
  // crear el codigo que de verdadero en el test
  // esta funcion lee los datos  
  // tengo que recorrer el array si el dato que esta en array perfil true si no false
  //  for (let index = 0; index < arrayPerfilesEntran.length; index++) {
  //   if (arrayPerfilesEntran[index] == perfilIngresado) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }
  return arrayPerfilesEntran.some((dato)=> dato== perfilIngresado)
}

function permitirAccesoWeb(  arrayPerfilesEntran) {

  return async function (req, res,next){
    console.log('req.session.rol',req.session.rol)
    if(req.session.rol){
      let rol = await mysql.con.query("select*from administrar_perfil where administrar_perfil.id_administrar_perfil = ?",[req.session.rol]);
      console.log(rol[0])
      if (darPermisosAlUsuario(arrayPerfilesEntran, rol[0].tipo_rol)) {
        next();
      }
      else {
        res.send("usted no puede ingresar");
      }
    }else{
      res.send("Realice el registro <a href='/control_de_acceso'> login </a>");
    }

  }

}
module.exports = { darPermisosAlUsuario,permitirAccesoWeb };