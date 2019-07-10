var ValidacionCodigoNombre = require('../utilidades_ruta_aprendizaje/ValidacionCodigoNombre.js');
var validacionCodigoNombre = new ValidacionCodigoNombre();
var mysql = require('../../dataBase/conexion.js');
let QueryGenery = require('../utilidades_ruta_aprendizaje/QueryGenery.js')
let queryGenery = new QueryGenery();

class Modelo_FormacionInstrutorFicha {
    async consultarformacionAsignadaid (id_formacion_da_instructor_ficha){
        return await  mysql.con.query(` select 
        formacion_da_instructor_ficha.id_formacion_da_instructor_ficha,
        gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje,
        gestión_de_resultado_de_aprendizaje.nombre_resultado_de_aprendizaje,
        administrar_perfil.id_administrar_perfil,
        administrar_perfil.tipo_rol,
        administrar_perfil.id_usuario,
        gestion_de_usuarios.nombre_usuario,
        administrar_perfil.id_estado_perfil,
        gestion_de_fichas.Id_GestionDeFichas,
        gestion_de_fichas.Numero_de_ficha
        
         from  formacion_da_instructor_ficha 
        
        JOIN gestión_de_resultado_de_aprendizaje
        
        ON gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
        
        JOIN administrar_perfil
        ON  administrar_perfil.id_administrar_perfil = formacion_da_instructor_ficha.id_administrar_perfil_instructor
        JOIN gestion_de_fichas
        ON gestion_de_fichas.Id_GestionDeFichas = formacion_da_instructor_ficha.Id_GestionDeFichas
        JOIN gestion_de_usuarios
        ON gestion_de_usuarios.Id_usuario =  administrar_perfil.id_usuario
         WHERE formacion_da_instructor_ficha.id_formacion_da_instructor_ficha = ? ;
        `,[id_formacion_da_instructor_ficha]);
    }

    async formacionAsignada (Id_GestionDeFichas){
        return await  mysql.con.query(` select 
        formacion_da_instructor_ficha.id_formacion_da_instructor_ficha,
        gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje,
        gestión_de_resultado_de_aprendizaje.nombre_resultado_de_aprendizaje,
        administrar_perfil.id_administrar_perfil,
        administrar_perfil.tipo_rol,
        administrar_perfil.id_usuario,
        gestion_de_usuarios.nombre_usuario,
        administrar_perfil.id_estado_perfil,
        gestion_de_fichas.Id_GestionDeFichas,
        gestion_de_fichas.Numero_de_ficha
        
         from  formacion_da_instructor_ficha 
        
        JOIN gestión_de_resultado_de_aprendizaje
        
        ON gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
        
        JOIN administrar_perfil
        ON  administrar_perfil.id_administrar_perfil = formacion_da_instructor_ficha.id_administrar_perfil_instructor
        JOIN gestion_de_fichas
        ON gestion_de_fichas.Id_GestionDeFichas = formacion_da_instructor_ficha.Id_GestionDeFichas
        JOIN gestion_de_usuarios
        ON gestion_de_usuarios.Id_usuario =  administrar_perfil.id_usuario
         WHERE formacion_da_instructor_ficha.Id_GestionDeFichas = ? ;
        `,[Id_GestionDeFichas]);
    }

    async buscarFicha(Id_GestionDeFichas){
        return await  mysql.con.query(`
        select * from  gestion_de_fichas where Id_GestionDeFichas = ?;`,[Id_GestionDeFichas]);
    }
    async fichas(){
        return await  mysql.con.query(`
        select * from  gestion_de_fichas ;`);
    } 
    async resultadosAprendizajeProgramaFormacionNoVistos(id_programa_formacion,Id_GestionDeFichas){
        return await  mysql.con.query(`

        select
        gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
        gestión_de_ruta_de_aprendizaje.id_programa_formacion,
        gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia,
        gestión_de_competencia.nombre_competencia,
        gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje,
        gestión_de_resultado_de_aprendizaje.nombre_resultado_de_aprendizaje
        from gestión_de_resultado_de_aprendizaje 
        JOIN gestión_de_competencia
        ON
         gestión_de_resultado_de_aprendizaje.id_gestion_de_competencia = gestión_de_competencia.id_gestion_de_competencia
	   JOIN gestión_de_ruta_de_aprendizaje
        ON
        gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
 
         WHERE gestión_de_ruta_de_aprendizaje.id_programa_formacion = ?  and
			gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje 
			not  in ( select formacion_da_instructor_ficha.id_resultado_de_aprendizaje from formacion_da_instructor_ficha where formacion_da_instructor_ficha.Id_GestionDeFichas = ?);
        `,[id_programa_formacion,Id_GestionDeFichas])
    }
    async resultadosAprendizajeProgramaFormacion(id_programa_formacion){
        return await  mysql.con.query(`
        select
        gestión_de_ruta_de_aprendizaje.id_ruta_aprendizaje,
        gestión_de_ruta_de_aprendizaje.id_programa_formacion,
        gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia,
        gestión_de_competencia.nombre_competencia,
        gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje,
        gestión_de_resultado_de_aprendizaje.nombre_resultado_de_aprendizaje
        from gestión_de_ruta_de_aprendizaje
        JOIN gestión_de_competencia
        ON
        gestión_de_competencia.id_gestion_de_competencia = gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia
        JOIN gestión_de_resultado_de_aprendizaje
        ON
        gestión_de_resultado_de_aprendizaje.id_gestion_de_competencia = gestión_de_competencia.id_gestion_de_competencia
         WHERE gestión_de_ruta_de_aprendizaje.id_programa_formacion = ?  ;
        `,[id_programa_formacion])
    }
    async listarInstructores (){
        return await  mysql.con.query( `select 
            administrar_perfil.id_administrar_perfil,
            administrar_perfil.id_usuario,
            administrar_perfil.tipo_rol,
            administrar_perfil.id_estado_perfil,
            gestion_de_usuarios.nombre_usuario
        from administrar_perfil 
        JOIN 
        gestion_de_usuarios
        ON 
        administrar_perfil.id_usuario = gestion_de_usuarios.Id_usuario WHERE
        administrar_perfil.tipo_rol = 'instructor'
        ;`);
    } 
    async listarInstructoresDistintos (id_administrar_perfil){
        return await  mysql.con.query( `select 
            administrar_perfil.id_administrar_perfil,
            administrar_perfil.id_usuario,
            administrar_perfil.tipo_rol,
            administrar_perfil.id_estado_perfil,
            gestion_de_usuarios.nombre_usuario
        from administrar_perfil 
        JOIN 
        gestion_de_usuarios
        ON 
        administrar_perfil.id_usuario = gestion_de_usuarios.Id_usuario WHERE
        administrar_perfil.tipo_rol = 'instructor' AND 
        administrar_perfil.id_administrar_perfil <> ?
            ;`,[id_administrar_perfil]);
    }
    async listarInstructoresSinLaFormacion (id_resultado_de_aprendizaje,Id_GestionDeFichas){
        return await  mysql.con.query( `
            select 
                administrar_perfil.id_administrar_perfil,
                administrar_perfil.id_usuario,
                administrar_perfil.tipo_rol,
                administrar_perfil.id_estado_perfil,
                gestion_de_usuarios.nombre_usuario
            from administrar_perfil 
                JOIN 
                gestion_de_usuarios
                ON 
                administrar_perfil.id_usuario = gestion_de_usuarios.Id_usuario 
                WHERE
                administrar_perfil.tipo_rol = 'instructor'
                and administrar_perfil.id_administrar_perfil  not  in (select
                            formacion_da_instructor_ficha.id_administrar_perfil_instructor
                            
                        from 
                        formacion_da_instructor_ficha
                        WHERE 
                        formacion_da_instructor_ficha.id_resultado_de_aprendizaje = ?
                        AND
                        formacion_da_instructor_ficha.Id_GestionDeFichas = ?
                        )
            ;`,[id_resultado_de_aprendizaje,Id_GestionDeFichas]);
    }
    async asignarFormacionInstructorFicha(id_resultado_de_aprendizaje,id_administrar_perfil_instructor,Id_GestionDeFichas){
       try{
            return await  mysql.con.query( `insert into formacion_da_instructor_ficha ( 
            id_resultado_de_aprendizaje ,
            id_administrar_perfil_instructor ,
            Id_GestionDeFichas )VALUES(? ,? ,? );`,[id_resultado_de_aprendizaje,id_administrar_perfil_instructor,Id_GestionDeFichas]);
        }catch(error){
            return {affectedRows:0,
                error:error.sqlMessage
            } 
        }
    }
    async actualizarFormacionInstructorFicha(id_formacion_da_instructor_ficha,id_resultado_de_aprendizaje,id_administrar_perfil_instructor,Id_GestionDeFichas){
        try{
             return await  mysql.con.query( ` update  formacion_da_instructor_ficha set 
             formacion_da_instructor_ficha.id_resultado_de_aprendizaje = ?,
             formacion_da_instructor_ficha.id_administrar_perfil_instructor = ?,
             formacion_da_instructor_ficha.Id_GestionDeFichas = ?
             where formacion_da_instructor_ficha.id_formacion_da_instructor_ficha = ?
             ;`,[id_resultado_de_aprendizaje,id_administrar_perfil_instructor,Id_GestionDeFichas,id_formacion_da_instructor_ficha]);
         }catch(error){
             return {affectedRows:0,
                 error:error.sqlMessage
             } 
         }
     }
    async eliminarFormacionInstructorFicha(id_formacion_da_instructor_ficha){
        try{
             return await  mysql.con.query( ` DELETE FROM formacion_da_instructor_ficha
                WHERE id_formacion_da_instructor_ficha = ?
             ;`,[id_formacion_da_instructor_ficha]);
         }catch(error){
             return {affectedRows:0,
                 error:error.sqlMessage
             } 
         }
     }
}
module.exports = Modelo_FormacionInstrutorFicha;