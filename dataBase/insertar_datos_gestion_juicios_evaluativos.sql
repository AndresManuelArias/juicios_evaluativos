use  juicios_evaluativos;
-- GESTION DE RUTA
insert into gestión_de_competencia(id_gestion_de_competencia,nombre_competencia)values
(3,'competencia3'),(4,'competencia4'),(1,'COMPETENCIA1'),(2,'COMPETENCIA2');

select*from gestión_de_competencia;
insert INTO gestión_de_resultado_de_aprendizaje(id_gestion_de_competencia,id_resultado_de_aprendizaje,nombre_resultado_de_aprendizaje)
VALUES(3,31,'RESULTADO APRENDIZAJE 1'),(3,32,'RESULTADO APRENDIZAJE 2');
SELECT*FROM gestión_de_resultado_de_aprendizaje;
INSERT INTO gestion_programa_formacion (id_programa_formacion,nombre_programa_formacion)
VALUE(1,'MECATRONICA'),
(2,'METALMECANICA');
SELECT* FROM gestion_programa_formacion;
insert INTO gestión_de_ruta_de_aprendizaje
(id_gestion_de_competencia,id_programa_formacion)
VALUES(3,1),(3,2),(4,1),(4,2);
SELECT*FROM gestión_de_ruta_de_aprendizaje;
-- FICHAS
insert INTO gestion_de_fichas(id_programa_formacion,Numero_de_ficha)VALUE(1,4444),(2,5555);
select*FROM gestion_de_fichas;
-- GESTION DE USUARIO
insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion) 
values
('IVAN','VIAN@sena.edu.co',14,'cedula'),
('JAMES','JAMES@sena.edu.co',15,'cedula'),
('DANIEL','DANIEL@sena.edu.co',16,'cedula'),
('ESTEBAN','ESTEBAN@sena.edu.co',17,'cedula'),
('ANDRES','ANDRES@sena.edu.co',18,'cedula'),
('capullo','unhijo@sena.edu.co',13,'cedula'),
('pedrito','correo1@sena.edu.co',12,'cedula'),
('pedrito 1','correo2@sena.edu.co',13,'cedula'),
('ernesto','ernes@sena.edu.co',133,'cedula');
select*from gestion_de_usuarios;
insert into estado_perfil(estado_perfil) values('activo');
select*from estado_perfil;
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values
(3,'instructor',1),
(1,'aprendiz',1),
(2,'instructor',1),
(4,'aprendiz',1),
(5,'aprendiz',1),
(6,'aprendiz',1),
(7,'aprendiz',1);
select*from administrar_perfil;

insert into gestion_de_fichas(id_programa_formacion,Numero_de_ficha)values
(1,777),
(2,888);
select*FROM gestion_de_fichas;
insert into gestion_ficha_aprendiz(id_gestion_fichas,id_administrar_perfil)
values
(1,1),
(1,2),
(1,3),
(2,4),
(2,5),
(2,6);
SELECT*FROM gestion_ficha_aprendiz;
insert into formacion_da_instructor_ficha(
id_administrar_perfil_instructor,
Id_GestionDeFichas,
id_resultado_de_aprendizaje) values
(1,1,31),(1,1,31),(1,1,32),(1,2,32),(3,2,31);



select*from formacion_da_instructor_ficha;

select*from  gestionar_juicios_evaluativos;
insert into gestionar_juicios_evaluativos(
id_gestion_ficha_aprendiz,
id_resultado_de_aprendizaje,
juicios_evaluativo)
value(2,1,"A");

select * from formacion_da_instructor_ficha;

delete FROM gestionar_juicios_evaluativos WHERE id_gestion_ficha_aprendiz = 2;
delete FROM gestionar_juicios_evaluativos WHERE id_resultado_de_aprendizaje = 32 
or id_resultado_de_aprendizaje = 31
 ;
select * from  gestionar_juicios_evaluativos;

update gestionar_juicios_evaluativos set juicios_evaluativos = 'D' where id_juicios_evaluativos = 11;