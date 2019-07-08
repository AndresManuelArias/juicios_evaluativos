USE juicios_evaluativos;
insert into estado_perfil(estado_perfil) values('activo');
-- Creacion de super usuario
insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion)
values("Andres Arias","arias1@misena.edu.co",1234561,"CEDULA");
insert into control_de_acceso(correo_sena, contrasena) values("arias1@misena.edu.co",123456789);
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(1,'instructor',1),(1,'aprendiz',1),(1,'administrador',1);

-- Creacion de alumnos

insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion) 
values('capullo','unhijo@sena.edu.co',13,'cedula'),('pedrito','correo1@sena.edu.co',12,'cedula');

insert into control_de_acceso(correo_sena, contrasena) values('unhijo@sena.edu.co',123456789),('correo1@sena.edu.co',123456789);

insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(2,'aprendiz',1),(3,'aprendiz',1);

-- Creacion de instructor

insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion) values
('pedrito 1','correo2@sena.edu.co',14,'cedula'),('El costeno','costeno@sena.edu.co',15,'cedula');
insert into control_de_acceso(correo_sena, contrasena) values('correo2@sena.edu.co',123456789),('costeno@sena.edu.co',123456789);
insert into administrar_perfil(id_usuario,tipo_rol,id_estado_perfil)values(4,'instructor',1),(5,'instructor',1);



-- select * from  gestion_de_fichas ;

-- Creacion de programa de formacion
insert into gestion_programa_formacion(id_programa_formacion,
nombre_programa_formacion,
duracion_programa_academico)values (1,'Edu fisica',8),(2,'Diseño y confeccion',8);

-- Asignar aprendiz a ficha
insert into gestion_de_fichas(Numero_de_ficha,id_programa_formacion)values(44444,1);

insert into gestion_ficha_aprendiz(id_gestion_fichas,id_administrar_perfil) values(1,4),(1,5);

-- falta crear un procedimiento almacenado para evitar que perfiles que no sean instrutores no puedan recibir formacion en una ficha




