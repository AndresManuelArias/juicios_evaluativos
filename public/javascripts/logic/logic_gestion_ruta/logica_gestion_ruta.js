// alert('consultas')

function consultarExistenciaCodigo(codigoCompetencia,urlExistenciaCodigo){
    console.log(codigoCompetencia)
    return fetch(`${urlExistenciaCodigo}=${codigoCompetencia}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        if(myJson.existe){
            document.getElementById('consultaCodigo').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
            El codigo ya existe ingrese otro
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
          document.getElementById("mySubmit").disabled = true;
        }else{
            document.getElementById('consultaCodigo').innerHTML = ``;
            document.getElementById("mySubmit").disabled = false;

        }
        return myJson.existe;
    });
   
}

function activarBoton(numero,nombre){
    debugger;
    if(/^\d{1,15}$/g.test(numero) && /^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ\s\W .,]{1,300}\.$/g.test(nombre) ){
        document.getElementById("mySubmit").disabled = false;

    }else{
        document.getElementById("mySubmit").disabled = true;
    }
}

function validarNumeroCompetencia(numero){
    console.log(numero,/^\d{1,15}$/g.test(numero))
    if(!/^\d{1,15}$/g.test(numero)){
        document.getElementById('validarCodigo').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        El codigo no tiene un formato valido, este debe ser solo numeros
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }else{
        document.getElementById('validarCodigo').innerHTML = ``;
    }
}
function validarNombreCompetencia(nombre){
    console.log( nombre,/^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ\s\W .,]{1,300}\.$/g.test(nombre));

    if(!/^[A-ZÑÁÉÍÓÚ][a-zA-ZñÑáéíóúÁÉÍÓÚ\s\W .,]{1,300}\.$/g.test(nombre)){
        document.getElementById('validarNombre').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        El codigo no tiene un formato valido, este debe comenzar con mayúsculas y terminar con punto. 
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`;
    }else{
        document.getElementById('validarNombre').innerHTML = ``;
    }
}

$(document).ready(function(){
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });