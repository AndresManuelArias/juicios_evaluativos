

/**
 *@name comprobar_correo
 * @method comprobar_correo
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @description aca comprobamos el correo por 
 * medio de peticiones ajax para ingresar al aplicativo
 * 
 */
function comprobar_correo() {
  fetch('/comprobar_correo?correo=' + document.getElementsByName('correo_sena')[0].value).then(function (response) {
    return response.json();
  })
    .then(function (myJson) {
      console.log(myJson);
      if (myJson.length > 0) {
        // alert('el correo ya existe')
        document.getElementsByName('correo_sena').value = ""
        document.getElementById('registrarse').disabled = true;
        document.getElementById('respuesta_correo').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong><a href="/control_de_acceso">El correo ya existe logueate</strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
      }

    });
}
/**
 *@name comprobar correo
 * @method comprobar_correo_de_logeo
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @description aca comprobamos el correo por medio de peticiones ajax para logearse
 */

function comprobar_correo_de_logueo() {
  fetch('/comprobar_correo_de_logeo?correo=' + document.getElementsByName('correo_sena')[1].value)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      if (myJson.length == 0) {
        document.getElementsByName('correo_sena').value = "";
        document.getElementById('ingresarb').disabled = true;
        document.getElementById('respuesta_de_correo_de_logueo').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong><a href="/control_de_acceso">el correo no existe registrate</a></strong> 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
         </div>`;
      }
    });
}

//comprovaR EN LA BASE DE DATOS EL NUMERO

/**
 *@name comprobar_identificacion
 * @method comprobar_identificacion
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @returns mensaje de numero invalido o nada
 * @description aca comprobamos el el numero de identificacion a la hora de logearse
 */



function comprobar_identificacion(numero_de_identificacion) {
  console.log(numero_de_identificacion)
  fetch('/comprobar_cedula?numero_de_identificacion=' + numero_de_identificacion)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      console.log(myJson);
      if (myJson.length > 0) {
        //document.getElementById('respuesta_identificacion').alert("kkk")
        document.getElementById('registrarse').disabled = true;
        document.getElementById('numCedula').value = "";
        document.getElementById('respuesta_identificacion').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
         <strong>numero ya existe</strong> 
           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
           <span aria-hidden="true">&times;</span>
           </button>
            </div>`;
      }
    });
}
//pasar el correo

/**
 * @name comprobar_parametros_de_correo
 * @method parametros_por_eferencia
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @returns mensaje de numero invalido o nada
 * @description en este espacon lo que se verifica es que 
 * los parametros del correo sean del sena
 */


function validarEmail(correo) {
  console.log('correo', correo);
  if (/^[A-Z,0-9,a-z]{5,20}@(misena.edu.co|sena.edu.co)$/g.test(correo)) {
    document.getElementById('registrarse').disabled = false;
  } else {
    document.getElementById('correoSena').value = ""
    document.getElementById('registrarse').disabled = true;
    document.getElementById('correo_correcto').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>correo erroneo</strong> 
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
       </div>`;
  }
}
/**
 * @name comprobar_correo_para_logearse
 * @method parametros_por_eferencia
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @returns mensaje de numero invalido o nada
 * @description en este espacon lo que se verifica es que 
 * los parametros del correo sean del sena
 */



function validarEmail1(correo) {
  console.log('correo', correo);
  if (/^[A-Z,0-9,a-z]{5,20}@(misena.edu.co|sena.edu.co)$/g.test(correo)) {
    document.getElementById('ingresarb').disabled = false;
  } else {
    
    document.getElementById('correoSena1').value=""
    document.getElementById('ingresarb').disabled = true;
    document.getElementById('correo_correcto1').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>correo erroneo</strong> 
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
       </div>`;
  }
}
//  pasar la cedula
/**
 * @name comprobar_cedula
 * @method parametros_por_eferencia
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @returns mensaje de numero invalido o nada
 * @description en este espacon lo que se verifica es que 
 * los parametros del correo sean del sena
 */




function validarcedula(cedula) {
  console.log('cedula', cedula);
  if (/^\d{8,12}$/g.test(cedula)) {
    document.getElementById('registrarse').disabled = false;
  } else {
   document.getElementById('numCedula').value="";
    document.getElementById('registrarse').disabled = true;
    document.getElementById('cedula_correcta').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>el dumero no es valido</strong> 
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
       </div>`;
  }
}
/**
 * @name comprobar_cedula_para_logeo
 * @method parametros_por_eferencia
 * @type funcion
 * @param {object} req-resive la peticion 
 * @param {object} res-ennvia la respuesta
 * @returns mensaje de numero invalido o nada
 * @description en este espacon lo que se verifica es que 
 * los parametros del correo sean del sena
 */


function validarcedula1(cedula) {
  console.log('cedula', cedula);
  if (/^\d{8,12}$/g.test(cedula)) {
    document.getElementById('ingresarb').disabled = false;
  } else {
    document.getElementById('contraseña').value=""
    document.getElementById('ingresarb').disabled = true;
    document.getElementById('cedula_correcta1').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
   <strong>el dumero no es valido</strong> 
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
     <span aria-hidden="true">&times;</span>
     </button>
      </div>`;
  }
}

function recuperar_contrasena(correo_de_recuperacion) {
  console.log('correo', correo_de_recuperacion);
  if (/^[A-Z,0-9,a-z]{1,8}@(misena.edu.co|sena.edu.co)$/g.test(correo_de_recuperacion)) {
    document.getElementById('registrarse').disabled = false;
  } else {
    document.getElementById('registrarse').disabled = true;
    document.getElementById('correo_correcto1').innerHTML = `<div style='color:red' class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>correo erroneo</strong> 
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
       </div>`;
  }
}





// ----------avilitar boton




















// function verificar_correo(){
//   document.getElementById('email').addEventListener('input', function() {
//     campo = event.target;
//     valido = document.getElementById('emailOK');

//     emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
//    // Se muestra un texto a modo de ejemplo, luego va a ser un icono
//     if (emailRegex.test(campo.value)) {
//       valido.innerText = "válido";
//     } else {
//       valido.innerText = "incorrecto";
//     }
//   });

// }


//   /* <p>
//     Email:
//     <input id="email">
//     <span id="emailOK"></span>
// </p> */