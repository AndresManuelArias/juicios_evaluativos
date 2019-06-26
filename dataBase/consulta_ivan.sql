

 insert into gestion_de_usuarios (nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion)values("mora chupon","morachupa@legusta.com","10046147","cedula");
 select *from administrar_perfil;
select* from estado_perfil;
insert into  estado_perfil (estado_perfil) values('activo');
insert into  estado_perfil (estado_perfil) values('inativo');
insert into administrar_perfil (id_usuario,tipo_rol, id_estado_perfil)values(1,'aprendiz',1);
insert into gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion)values("jhon james","james@misenalomejor.com",1887514241,"cedula");
-- ALTER TABLE administrar_perfil ADD estado_perfil boolean not null default 1;

--  update administrar_perfil set estado_perfil= 0 where id_administrar_perfil = 1;