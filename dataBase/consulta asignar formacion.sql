-- estos son los insert para que funciones el aplicativo
describe gestion_de_usuarios;
insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion) 
values('capullo','unhijo@sena.edu.co',13,'cedula'),('pedrito','correo1@sena.edu.co',12,'cedula'),('pedrito 1','correo2@sena.edu.co',14,'cedula');
select*from gestion_de_usuarios;
describe estado_perfil;
insert into estado_perfil(estado_perfil) values('activo');
select*from estado_perfil;
describe administrar_perfil;
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(3,'instructor',1),(1,'aprendiz',1),(2,'instructor',1);
select*from administrar_perfil;

describe gestion_programa_formacion;
insert into gestion_programa_formacion(id_programa_formacion,
nombre_programa_formacion,
duracion_programa_academico)values (12344,'Edu fisica',8),(12345,'Diseño y confeccion',8);
select*from gestion_programa_formacion;

describe gestion_de_fichas;
insert into gestion_de_fichas(Numero_de_ficha,id_programa_formacion)values(44444,12345);
insert into gestion_de_fichas(Numero_de_ficha,id_programa_formacion)values(5555,12344);
select*from gestion_de_fichas;

describe `gestión_de_competencia`;
insert into gestión_de_competencia(id_gestion_de_competencia,nombre_competencia)values(1,'Saltar lazos'),(2,'Hornear');
select*from gestión_de_competencia;

describe `gestión_de_resultado_de_aprendizaje`;
insert into gestión_de_resultado_de_aprendizaje(id_resultado_de_aprendizaje,id_gestion_de_competencia,nombre_resultado_de_aprendizaje)
values(101,1,'Con llamas'),(102,1,'Con fuego'),(103,1,'En el agua'),(201,2,'De gas'),(202,2,'Electrico');
select*from gestión_de_resultado_de_aprendizaje;


describe `gestión_de_ruta_de_aprendizaje`;
insert into gestión_de_ruta_de_aprendizaje (id_programa_formacion,id_gestion_de_competencia)
VALUES(12345,1),(12345,2),(12344,1),(12344,2);

-- 

select formacion_da_instructor_ficha.id_resultado_de_aprendizaje,
formacion_da_instructor_ficha.Id_GestionDeFichas
 from  formacion_da_instructor_ficha;
 select*from formacion_da_instructor_ficha;
 
 select * from  gestion_de_fichas where gestion_de_fichas.Id_GestionDeFichas= 34;
 
 
  select * from  gestion_programa_formacion;
 insert into gestion_de_fichas (Numero_de_ficha,id_programa_formacion)values(1,1234);
 
 
 select 
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
         WHERE formacion_da_instructor_ficha.Id_GestionDeFichas = 1 ;
         
insert into estado_perfil
(estado_perfil)values('activo');
      insert into gestion_de_usuarios(nombre_usuario,
correo_sena,
numero_de_identificacion,
tipo_de_identificacion)values('pedrito','correo@sena',12345,'cedula'),
('guenos','correo1@sena',1266345,'cedula');
select * from gestion_de_usuarios;

insert into administrar_perfil (id_usuario,tipo_rol, id_estado_perfil )values(	1,'instructor',1),(	2,'aprendiz',1);

update administrar_perfil set  tipo_rol = 'instructor' where id_usuario = 3;


select*from administrar_perfil;


select * from estado_perfil

SELECT*FROM gestion_programa_formacion;

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
 WHERE gestión_de_ruta_de_aprendizaje.id_programa_formacion = 1;
 
 select*from gestion_de_fichas;
 
 
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
 administrar_perfil.id_usuario = gestion_de_usuarios.Id_usuario WHERE
 administrar_perfil.tipo_rol = 'instructor'
 ;
 
insert into formacion_da_instructor_ficha ( 
        id_resultado_de_aprendizaje ,
    id_administrar_perfil_instructor ,
    Id_GestionDeFichas )VALUES(6789,6,2);
    select*from formacion_da_instructor_ficha;
    select*from administrar_perfil;
    
    describe  formacion_da_instructor_ficha;

 delete from formacion_da_instructor_ficha where formacion_da_instructor_ficha.Id_GestionDeFichas = 1;
select
	 formacion_da_instructor_ficha.id_administrar_perfil_instructor
	
from 
formacion_da_instructor_ficha
WHERE formacion_da_instructor_ficha.id_resultado_de_aprendizaje = 101
;

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
					WHERE formacion_da_instructor_ficha.id_resultado_de_aprendizaje = 101					
					)
        ;