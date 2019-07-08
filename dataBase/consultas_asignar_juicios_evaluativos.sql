-- select*from formacion_da_instructor_ficha;
-- select*from administrar_perfil;
use juicios_evaluativos;

select 

formacion_da_instructor_ficha.id_formacion_da_instructor_ficha
from formacion_da_instructor_ficha 
            join gestion_de_fichas
            on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
            where formacion_da_instructor_ficha.id_administrar_perfil_instructor = 1;
select*from formacion_da_instructor_ficha 
join administrar_perfil 
on formacion_da_instructor_ficha.id_administrar_perfil_instructor = administrar_perfil.id_administrar_perfil
join gestion_de_usuarios
on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
where administrar_perfil.tipo_rol = 'instructor'
 ;
 
 select*from administrar_perfil 
 join gestion_de_usuarios
on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
where administrar_perfil.tipo_rol = 'instructor';

select*from formacion_da_instructor_ficha 
join gestion_de_fichas
on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
where formacion_da_instructor_ficha.id_administrar_perfil_instructor = 3;

select*from gestion_ficha_aprendiz 
join
administrar_perfil
on
gestion_ficha_aprendiz.id_administrar_perfil = administrar_perfil.id_administrar_perfil
join gestion_de_usuarios
on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario 
where administrar_perfil.tipo_rol = 'aprendiz'
and gestion_ficha_aprendiz.id_gestion_fichas = 1
;
use  juicios_evaluativos;
select*from  gestion_de_fichas where gestion_de_fichas.id_GestionDeFichas = 1;

select*from  gestion_de_fichas
join 
formacion_da_instructor_ficha
on gestion_de_fichas.Id_GestionDeFichas = formacion_da_instructor_ficha.Id_GestionDeFichas
 where gestion_de_fichas.id_GestionDeFichas= 1 ;

select*from  formacion_da_instructor_ficha;

select *
       from formacion_da_instructor_ficha 
                   join gestion_de_fichas
                   on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
                   join gestión_de_resultado_de_aprendizaje
                   on gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
                   where formacion_da_instructor_ficha.id_administrar_perfil_instructor  = 1;
select *
        from formacion_da_instructor_ficha 
                    join gestion_de_fichas
                    on formacion_da_instructor_ficha.Id_GestionDeFichas = gestion_de_fichas.Id_GestionDeFichas
                    join gestión_de_resultado_de_aprendizaje
                    on gestión_de_resultado_de_aprendizaje.id_resultado_de_aprendizaje = formacion_da_instructor_ficha.id_resultado_de_aprendizaje
                    where formacion_da_instructor_ficha.id_formacion_da_instructor_ficha  = 15;
 
 select * from gestion_ficha_aprendiz
 join administrar_perfil
    on administrar_perfil.id_administrar_perfil = gestion_ficha_aprendiz.id_administrar_perfil
    join gestion_de_usuarios
    on gestion_de_usuarios.Id_usuario = administrar_perfil.id_usuario
	 where 
     administrar_perfil.tipo_rol = 'aprendiz'
     and
     gestion_ficha_aprendiz.id_gestion_ficha_aprendiz = 2;
     
select * from  gestionar_juicios_evaluativos
  
where 
gestionar_juicios_evaluativos.id_gestion_ficha_aprendiz = 2
and
gestionar_juicios_evaluativos.id_resultado_de_aprendizaje = 2
;

 select * from  formacion_da_instructor_ficha
 join administrar_perfil
 on 
 administrar_perfil.id_administrar_perfil = formacion_da_instructor_ficha.id_administrar_perfil_instructor
 where administrar_perfil.tipo_rol = "instructor"
 and
 formacion_da_instructor_ficha.id_formacion_da_instructor_ficha  = 15
 ;
    select * from  gestionar_juicios_evaluativos;
             where gestionar_juicios_evaluativos.id_juicios_evaluativos = 15;