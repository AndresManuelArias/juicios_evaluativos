const ModeloJuiciosEvaluativos = require("./ModeloJuiciosEvaluativos");
const modeloJuiciosEvaluativos = new ModeloJuiciosEvaluativos()

class JuiciosEvaluativos {
    //metodo provisional
    async vistaSeleccionarInstructor(req, res){
        let intructores =  await modeloJuiciosEvaluativos.instructores()
        res.render('./JuiciosEvaluativos/seleccionar_instructor.jade', { title: 'Ejemplo',intructores:intructores });

    }
    async vistaSeleccionarAprendiz(req, res){
        let aprendices =  await modeloJuiciosEvaluativos.aprendices()
        res.render('./JuiciosEvaluativos/seleccionar_aprendiz.jade', { title: 'Ejemplo',aprendices:aprendices });

    }

    async seleccionarInstructor(req, res){
        console.log(req.body)
        req.session.id_administrar_perfil = req.body.id_administrar_perfil
        console.log( req.session)        
        res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Instructor seleccionado',respuestaUsuario:'ahora puede navegar como un instrutor id instructor:'+req.session.id_administrar_perfil, dirreccion:'/juicios_evaluativos',ir_lugar:'asignar notas'  });
    }

    
    async seleccionarAprendiz(req, res){
        console.log(req.body)
        req.session.id_administrar_perfil = req.body.id_administrar_perfil
        console.log( req.session)        
        res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Instructor Aprendiz seleccionado',respuestaUsuario:'ahora puede navegar como un aprendiz id aprendiz:'+req.session.id_administrar_perfil, dirreccion:'/juicios_evaluativos/ver_mis_notas',ir_lugar:'ver notas'  });
    }
    // Termina metodo provisional

    async viewfichasDeInstructor(req, res, next){
        console.log('viewFormacionDaInstructor');
        // if(req.body.Id_GestionDeFichas){
        //     
        // }         
        let formacionDa = await modeloJuiciosEvaluativos.formacionDaInstructorAfichas(req.session.id_administrar_perfil);
        console.log(formacionDa);
        res.render('./JuiciosEvaluativos/gestion_juicio_evaluativo.jade', {
             title: 'Gestion de juicios evaluativos',
              formacionDa:formacionDa,
              id_formacion_da_instructor_ficha:"",
              aprendicesDentroFicha:[]
            }); 
    }
    rediredPrendicesDentroFicha(req, res){
        console.log(req.body)
        res.redirect(`/juicios_evaluativos/asignar_notas/${req.body.id_formacion_da_instructor_ficha}`)
    }
    rediredAsignarJuicio(req, res){
        console.log(req.body)
        res.redirect(`/juicios_evaluativos/asignar_notas/${req.body.id_formacion_da_instructor_ficha}/${req.body.id_gestion_ficha_aprendiz}`)
    }
    async verAprendicesDeFichaInstructor(req, res, next){
        console.log('verAprendicesDeFichaInstructor')
        console.log(req.params);
        let ficha = await modeloJuiciosEvaluativos.fichaQueDaFormacion(req.params.id_formacion_da_instructor_ficha)
        console.log('ficha',ficha)
        if(!ficha.length){
            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'No se encontro la ficha',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
        }else  if(req.session.id_administrar_perfil){
            let aprendicesDentroFicha = await modeloJuiciosEvaluativos.aprendicesDeFicha(ficha[0].Id_GestionDeFichas)
            console.log(aprendicesDentroFicha)
            if(aprendicesDentroFicha.length){
                res.render('./JuiciosEvaluativos/gestion_juicio_evaluativo.jade', { title: 'Gestion de juicios evaluativos',
                id_formacion_da_instructor_ficha:req.params.id_formacion_da_instructor_ficha,
                formacionDa:ficha,
                aprendicesDentroFicha:aprendicesDentroFicha}); 
            }else{
                res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'la ficha no tiene aprendices',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
            }    
        }else{
            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'Ingrese como instructor',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });

        }
    }
    async viewAsignarJuicioEvaluativo(req, res, next) {
        console.log('asignar juicios evaluativos')
        // var usuarios = await mysql.con.query("SELECT * FROM gestion_de_usuarios");
        // console.log(usuarios)
        console.log(req.params)

        let formacionDA =  await modeloJuiciosEvaluativos.fichaQueDaFormacion(req.params.id_formacion_da_instructor_ficha)
        console.log('formacionDA',formacionDA)
        if(formacionDA.length){
            let aprendizDeficha  = await modeloJuiciosEvaluativos.aprendizDentroDeFicha( req.params.id_gestion_ficha_aprendiz)
            console.log('aprendizDeficha',aprendizDeficha)
            if(aprendizDeficha.length){
                let juicioEvaluativoAsignado =  await modeloJuiciosEvaluativos.verJuicioEvaluativoYaAsignado(req.params.id_gestion_ficha_aprendiz,formacionDA[0].id_resultado_de_aprendizaje)
                console.log('juicioEvaluativoAsignado',juicioEvaluativoAsignado)
                if(juicioEvaluativoAsignado.length){ 
                    console.log('actualizar')
                    res.render('./JuiciosEvaluativos/asignarJuiciosEvaluativo.jade', { title: 'Ejemplo',
                        params:req.params,
                        formacionDA:formacionDA[0] ,
                        aprendizDeficha:aprendizDeficha[0],
                        accion:"actualizar",
                        juicioEvaluativoAsignado:juicioEvaluativoAsignado[0]
                    });                   
                }else {
                    console.log('crear')
                    // req.params.id_gestion_ficha_aprendiz
                    // req.params.Id_GestionDeFichas
                    // req.session.id_administrar_perfil
                    res.render('./JuiciosEvaluativos/asignarJuiciosEvaluativo.jade', { title: 'Ejemplo',
                        params:req.params,
                        formacionDA:formacionDA[0] ,
                        aprendizDeficha:aprendizDeficha[0],
                        accion:"crear",
                        juicioEvaluativoAsignado:juicioEvaluativoAsignado[0]
                    });
                }
            }else{
                res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'No se encontro al aprendiz dentro de la ficha',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
            } 
        }else{
            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'No se encontro la formacion que da el instructor',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
        }
    }
    async asignarJuicioEvaluativo(req, res){
        console.log('asignarJuicioEvaluativo')

        console.log('body',req.body)
        console.log('params',req.params)
        console.log('session',req.session)
        let respuesta =  await verificaPermisoAgregarNota(req.params.id_formacion_da_instructor_ficha,req.session.id_administrar_perfil)
        console.log(respuesta)
        if(!respuesta.pass){
            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:respuesta.texto,ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
            
        }else{
            switch (req.body.accion) {
                case "crear":
                        console.log('crear',req.body)
                    let insert =  await modeloJuiciosEvaluativos.crearJuicioEvaluativo(req.body.id_gestion_ficha_aprendiz,
                        req.body.id_resultado_de_aprendizaje,
                        req.body.juicios_evaluativo);
                    console.log('insert',insert)
                    let resultado = insert.affectedRows?"datos insertado correctamente":"no se pudo insertar los datos"
                    res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Respuesta',respuestaUsuario:resultado,ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
                    
                    break;
                case "actualizar":
                        console.log('actualizar',req.body)
                        let juicioEValuativo =  await modeloJuiciosEvaluativos.consultarSiTieneJuicioEvaluativo(req.body. id_juicios_evaluativos)
                        console.log('juicioEValuativo',juicioEValuativo)
                        if(juicioEValuativo.length){
            
                            let actualizar =   await modeloJuiciosEvaluativos.actualizarJuicioEvaluativo(req.body.juicios_evaluativo,req.body.id_juicios_evaluativos)
                            console.log('actualizar',actualizar)
                            let resultado = actualizar.affectedRows?"datos actualizado correctamente":"no se pudo actualizar los datos"
                            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Respuesta',respuestaUsuario:resultado,ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
                        }else {
                            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Respuesta',respuestaUsuario:'No se pudo asignar la nota debido a problemas con el ID',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
                        }
                    break;
                
                default:
                    res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'accion CRUD no definida',ir_lugar:'asignar notas',dirreccion:'/juicios_evaluativos' });
    
                    break;
            }
        }
        
    }
    async viewFichasAprendiz(req, res){
        console.log('id_administrar_perfil',req.session.id_administrar_perfil)
       let fichas = await modeloJuiciosEvaluativos.consultarFichasAprendiz(req.session.id_administrar_perfil)
       console.log('fichas')
       console.table(fichas);
       
       res.render('./JuiciosEvaluativos/ver_fichas_aprendiz.jade', { title: 'Juicios evaluativos', fichas });

    }
    rediredJuiciosDeAprendiz(req, res){
        res.redirect(`/juicios_evaluativos/ver_mis_notas/${req.body.id_gestion_ficha_aprendiz}`)
    }
    async viewJuiciosDeAprendiz(req, res){
       let juicios =  await modeloJuiciosEvaluativos.consultarJuiciosFichasAprendiz(req.params.id_gestion_ficha_aprendiz)
       let fichaAprendiz =   await modeloJuiciosEvaluativos.consultarFichasAprendiz(req.session.id_administrar_perfil);
       let ficha= fichaAprendiz.filter((columna)=> columna.id_gestion_ficha_aprendiz == req.params.id_gestion_ficha_aprendiz);
       console.log('ficha',ficha);
       if(ficha.length){

            let aprendiz = await modeloJuiciosEvaluativos.verAprendiz(req.session.id_administrar_perfil)
            console.log('aprendiz',aprendiz)
            let fichaProgramaFormacion  = await modeloJuiciosEvaluativos.consultaFichaProgramaFormacion( ficha[0].id_gestion_fichas)
            console.log('fichaProgramaFormacion',fichaProgramaFormacion)
            res.render('./JuiciosEvaluativos/ver_juicios_evaluativos.jade', { title: 'Juicios evaluativos', juicios,aprendiz:aprendiz,fichaProgramaFormacion });
       }else{
            res.render('./JuiciosEvaluativos/respuesta_usuario.jade', { title: 'Error',respuestaUsuario:'Usted no puede ver estas notas',ir_lugar:'ver notas',dirreccion:'/juicios_evaluativos/ver_mis_notas' });
       }
    }
}
async function verificaPermisoAgregarNota(id_formacion_da_instructor_ficha,id_administrar_perfil){ 
    let respuesta = {pass:false,
        texto:""}
    console.log('id_administrar_perfil',id_administrar_perfil)
    if(id_administrar_perfil == undefined){
        respuesta.texto =  'Registre su usuario';
    }else {
        let perfil =  await modeloJuiciosEvaluativos.consultarPerfilSiFormacionFicha(id_formacion_da_instructor_ficha)
        console.log('perfil',perfil)
        if(parseInt(perfil.id_administrar_perfil) !== parseInt(id_administrar_perfil)){
            console.log('no tiene permisos')
            respuesta.texto =  'No tiene los permiso para asignar un juicio evaluativo'   
         }else{
             respuesta.pass = true;
         }
    }
     return respuesta
 }
module.exports = JuiciosEvaluativos;