insert into estado_perfil(estado_perfil) values('activo');
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(1,'instructor',1),(1,'aprendiz',1),(1,'administrador',1);
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(3,'instructor',1),(2,'aprendiz',1);

select * from  gestion_de_fichas ;
insert into gestion_programa_formacion(id_programa_formacion,
nombre_programa_formacion,
duracion_programa_academico)values (1,'Edu fisica',8),(2,'Diseño y confeccion',8);

insert into gestion_de_fichas(Numero_de_ficha,id_programa_formacion)values(44444,1);

insert into gestion_ficha_aprendiz(id_gestion_fichas,id_administrar_perfil) values(1,2),(1,5);




