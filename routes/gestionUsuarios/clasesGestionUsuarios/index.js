
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

  return (req, res,next)=>{
    if (darPermisosAlUsuario(arrayPerfilesEntran, req.session.rol)) {
      next();
    }
    else {
      res.send("usted no puede ingresar abrase");
    }
  }

}
module.exports = { darPermisosAlUsuario: darPermisosAlUsuario };