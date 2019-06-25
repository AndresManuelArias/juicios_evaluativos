var mysql = require('../../dataBase/conexion.js');
class ModeloJuiciosEvaluativos {
    async instructores() {
        var instructores = await mysql.con.query(`
        select*from administrar_perfil 
        join gestion_de_usuarios
       on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
       where administrar_perfil.tipo_rol = 'instructor';`);
        console.log(instructores)
        return  instructores
    }
    async aprendices() {
        var aprendices = await mysql.con.query(`
        select*from administrar_perfil 
        join gestion_de_usuarios
       on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
       where administrar_perfil.tipo_rol = 'aprendiz';`);
        console.log(aprendices)
        return  aprendices
    }

    async formacionDaInstructorAfichas(id_administrar_perfil){
        console.log('id_administrar_perfil',id_administrar_perfil)
        var formacion = await mysql.con.query(`select *
        from formacion_da_instructor_ficha 
                    join gestion_de_fichas
                    on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
                    join gestión_de_resultado_de_aprendizaje
                    on gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
                    where formacion_da_instructor_ficha.id_administrar_perfil_instructor  = ?;`,[id_administrar_perfil]);
        console.log(formacion)
        return  formacion       
    }
    async fichaQueDaFormacion(id_formacion_da_instructor_ficha){
        console.log('fichaQueDaFormacion',id_formacion_da_instructor_ficha)
        var ficha = await mysql.con.query(`select *
        from formacion_da_instructor_ficha 
                    join gestion_de_fichas
                    on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
                    join gestión_de_resultado_de_aprendizaje
                    on gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
                    where formacion_da_instructor_ficha.id_formacion_da_instructor_ficha  = ?;`,[id_formacion_da_instructor_ficha]);
        console.log(ficha)
        return  ficha       
    }
    async aprendicesDeFicha(Id_GestionDeFichas){
        var aprendicesDentroDeFicha = await mysql.con.query(`select*from gestion_ficha_aprendiz 
        join
        administrar_perfil
        on
        gestion_ficha_aprendiz.id_administrar_perfil = administrar_perfil.id_administrar_perfil
        join gestion_de_usuarios
        on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario 
        where administrar_perfil.tipo_rol = 'aprendiz'
        and gestion_ficha_aprendiz.id_gestion_fichas = ?
        ;`,[Id_GestionDeFichas]);
        console.log(aprendicesDentroDeFicha)
        return  aprendicesDentroDeFicha       
    }
    async numeroDeFicha(Id_GestionDeFichas){
      let ficha  = await mysql.con.query(
        `select*from  gestion_de_fichas where gestion_de_fichas.id_GestionDeFichas = ?;`,[Id_GestionDeFichas]);
        console.log(ficha)
        return ficha;
    }
    async aprendizDentroDeFicha(id_gestion_ficha_aprendiz){
        let aprendiz  = await mysql.con.query(
          ` 
          select * from gestion_ficha_aprendiz
          join administrar_perfil
             on administrar_perfil.id_administrar_perfil = gestion_ficha_aprendiz.id_administrar_perfil
             join gestion_de_usuarios
             on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
              where 
              administrar_perfil.tipo_rol = 'aprendiz'
              and
              gestion_ficha_aprendiz.id_gestion_ficha_aprendiz = ?;`,[id_gestion_ficha_aprendiz]);
          console.log(aprendiz)
          return aprendiz;
      }
      async verJuicioEvaluativoYaAsignado(id_gestion_ficha_aprendiz,id_resultado_de_aprendizaje){
        let juicioAsignado  = await mysql.con.query(
            `  select * from  gestionar_juicios_evaluativos
  
            where 
            gestionar_juicios_evaluativos.id_gestion_ficha_aprendiz = ?
            and
            gestionar_juicios_evaluativos.id_resultado_de_aprendizaje = ?
            ;`,[id_gestion_ficha_aprendiz,id_resultado_de_aprendizaje]);
            console.log(juicioAsignado)
            return juicioAsignado;        
      }
     async crearJuicioEvaluativo(id_gestion_ficha_aprendiz,
        id_resultado_de_aprendizaje,
        juicios_evaluativo){
            console.log('crearJuicioEvaluativo',id_gestion_ficha_aprendiz,
            id_resultado_de_aprendizaje,
            juicios_evaluativo)
        try{
            return await  mysql.con.query( `
            insert into gestionar_juicios_evaluativos(
                id_gestion_ficha_aprendiz,
                id_resultado_de_aprendizaje,
                juicios_evaluativo)
                value(?,?,?);`,[id_gestion_ficha_aprendiz,id_resultado_de_aprendizaje,juicios_evaluativo]);
        }catch(error){
            return {affectedRows:0,
                error:error.sqlMessage
            } 
        }  
    }
    async actualizarJuicioEvaluativo(juicios_evaluativo,id_juicios_evaluativos){
            console.log('actualizarJuicioEvaluativo',juicios_evaluativo,id_juicios_evaluativos)
        try{
            return await  mysql.con.query( `
            update gestionar_juicios_evaluativos set juicios_evaluativo = ? where id_juicios_evaluativos = ?;`,[juicios_evaluativo,id_juicios_evaluativos]);
        }catch(error){
            return {affectedRows:0,
                error:error.sqlMessage
            } 
        }  
    }
    async consultarPerfilSiFormacionFicha(id_formacion_da_instructor_ficha){
        var perfil = await mysql.con.query(`
        select * from  formacion_da_instructor_ficha
        join administrar_perfil
        on 
        administrar_perfil.id_administrar_perfil = formacion_da_instructor_ficha.id_administrar_perfil_instructor
        where administrar_perfil.tipo_rol = "instructor"
        and
        formacion_da_instructor_ficha.id_formacion_da_instructor_ficha  = ?
        ;`,[id_formacion_da_instructor_ficha]);
        return perfil[0]
    }
    async consultarSiTieneJuicioEvaluativo(id_juicios_evaluativos){
        let juicioAsignado  = await mysql.con.query(
            `   select * from  gestionar_juicios_evaluativos
             where gestionar_juicios_evaluativos.id_juicios_evaluativos = ?;
            ;`,[id_juicios_evaluativos]);
            console.log(juicioAsignado)
            return juicioAsignado;
    }
}

module.exports = ModeloJuiciosEvaluativos;