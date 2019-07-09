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
    async verAprendiz(id_administrar_perfil) {
        var aprendices = await mysql.con.query(`
        select*from administrar_perfil 
        join gestion_de_usuarios
       on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
       where administrar_perfil.tipo_rol = 'aprendiz' and id_administrar_perfil = ? ;`,[id_administrar_perfil]);
        console.log(aprendices)
        return  aprendices[0]
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
      async verJuiciosEvaluativos(id_resultado_de_aprendizaje){
        let juicioAsignado  = await mysql.con.query(
            `  select * from  gestionar_juicios_evaluativos
            where 
                gestionar_juicios_evaluativos.id_resultado_de_aprendizaje = ?
            ;`,[id_resultado_de_aprendizaje]);
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
    async consultarFichasAprendiz(id_administrar_perfil){
        let fichasAsignada  = await mysql.con.query(
            ` 
             select *from gestion_ficha_aprendiz
                join gestion_de_fichas
                on gestion_de_fichas.Id_GestionDeFichas = gestion_ficha_aprendiz.id_gestion_fichas
             where id_administrar_perfil = ?;
            `,[id_administrar_perfil]);
            console.log(fichasAsignada)
            return fichasAsignada;
    }
    async consultarJuiciosFichasAprendiz(id_gestion_ficha_aprendiz){
        let juiciosEvaluativos  = await mysql.con.query(
            ` 
            select 
                gestionar_juicios_evaluativos.id_resultado_de_aprendizaje,
                gestión_de_competencia.nombre_competencia, gestión_de_resultado_de_aprendizaje.nombre_resultado_de_aprendizaje,  gestionar_juicios_evaluativos.juicios_evaluativo
            from gestionar_juicios_evaluativos
                join gestión_de_resultado_de_aprendizaje 
                on gestionar_juicios_evaluativos.id_resultado_de_aprendizaje = gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje
                join  gestión_de_competencia
                on gestión_de_competencia.id_gestion_de_competencia = gestión_de_resultado_de_aprendizaje.id_gestion_de_competencia
            where gestionar_juicios_evaluativos.id_gestion_ficha_aprendiz = ?
       ;
            `,[id_gestion_ficha_aprendiz]);
            console.log(juiciosEvaluativos)
            return juiciosEvaluativos;
    }
    async consultaFichaProgramaFormacion(id_gestion_fichas){
        let ficha  = await mysql.con.query(
            ` 
            select*from gestion_de_fichas
                join gestion_programa_formacion
                on gestion_de_fichas.id_programa_formacion= gestion_programa_formacion.id_programa_formacion 
            where gestion_de_fichas.Id_GestionDeFichas=?;  
       ;
            `,[id_gestion_fichas]);
            console.log(ficha)
            return ficha[0]; 
    }
    async consultarRutaAprendizajeDeProgramaFormacion(id_programa_formacion){
        let ruta  = await mysql.con.query(
            `select* from gestión_de_resultado_de_aprendizaje
            join gestión_de_competencia
            on 
            gestión_de_competencia.id_gestion_de_competencia = gestión_de_resultado_de_aprendizaje.id_gestion_de_competencia
            join gestión_de_ruta_de_aprendizaje
            on
            gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia = gestión_de_competencia.id_gestion_de_competencia
            where gestión_de_ruta_de_aprendizaje.id_programa_formacion = ?;`
        ,[id_programa_formacion]);
        console.log(ruta)
        return ruta; 
    }
    async verEstadosDeJuiciosEvaluativos(id_gestion_ficha_aprendiz,id_programa_formacion){
        console.log('verEstadosDeJuiciosEvaluativos(id_gestion_ficha_aprendiz,id_programa_formacion)',id_gestion_ficha_aprendiz,id_programa_formacion)
        let juiciosVistos =  await this.consultarJuiciosFichasAprendiz(id_gestion_ficha_aprendiz)
        let ruta =await this.consultarRutaAprendizajeDeProgramaFormacion(id_programa_formacion)
        return ruta.map((filaRuta)=>{
            console.log('filaRuta',filaRuta)
            let juicio =  juiciosVistos.find((filaJuicios)=> filaJuicios.id_resultado_de_aprendizaje == filaRuta.id_resultado_de_aprendizaje)
            if(juicio == undefined){
                let { 
                    id_resultado_de_aprendizaje,
                    nombre_competencia,
                    nombre_resultado_de_aprendizaje } = filaRuta
                juicio = { 
                    id_resultado_de_aprendizaje,
                    nombre_competencia,
                    nombre_resultado_de_aprendizaje,
                    juicios_evaluativo : 'P' }
                    
            }
            return juicio;
        })
    }
    async verJuiciosVariosAprendices(aprendicesDentroFicha,id_resultado_de_aprendizaje){
        let juiciosEvaluativos = await this.verJuiciosEvaluativos(id_resultado_de_aprendizaje)
        return aprendicesDentroFicha.map(( aprendiz)=>{
            let juicioEvaluativo = juiciosEvaluativos.find(juicio=> juicio.id_gestion_ficha_aprendiz == aprendiz.id_gestion_ficha_aprendiz)
            console.log('juicioEvaluativo',juicioEvaluativo)
            if(juicioEvaluativo){
                aprendiz['juicios_evaluativo'] = juicioEvaluativo['juicios_evaluativo']
            }else{
                aprendiz['juicios_evaluativo'] = 'P'
            }
            return aprendiz
        })
    }
    verResumenJuicios(juiciosEvaluativos){
       return verResumenJuicios(juiciosEvaluativos)
    }
}
function verResumenJuicios(juiciosEvaluativos){
    let aprobados = juiciosEvaluativos.filter((fila)=> fila.juicios_evaluativo == "A").length
    let desaprobados = juiciosEvaluativos.filter((fila)=> fila.juicios_evaluativo == "D").length
    let pendientes = juiciosEvaluativos.filter((fila)=> fila.juicios_evaluativo == "P").length
    let total =   juiciosEvaluativos.length;
    return {aprobados,
        desaprobados,
        pendientes,
        total}
}
module.exports = ModeloJuiciosEvaluativos;