CREATE DATABASE juicios_evaluativos ;
USE juicios_evaluativos;
 
-- Daniel Mora
 
 
CREATE TABLE gestion_de_usuarios (
  Id_usuario int NOT NULL AUTO_INCREMENT,
  nombre_usuario varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  correo_sena varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  numero_de_identificacion int NOT NULL,
  tipo_de_identificacion varchar(15) NOT NULL,
  UNIQUE(correo_sena),
  UNIQUE(numero_de_identificacion,tipo_de_identificacion),
  primary key ( Id_usuario)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
CREATE TABLE control_de_acceso (
  Id_control_acceso int NOT NULL AUTO_INCREMENT,
  correo_sena varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  contrasena varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  primary key (Id_control_acceso),
  FOREIGN key(correo_sena) REFERENCES gestion_de_usuarios(correo_sena) on DELETE CASCADE ON UPDATE CASCADE    
 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


 
 
 
 
-- ANDRES
 
CREATE TABLE gestion_programa_formacion (
    id_programa_formacion INT not null AUTO_INCREMENT,
    nombre_programa_formacion VARCHAR(250) NOT NULL,
    duracion_programa_academico   int,
    versión_programa_formacion int,
    UNIQUE(nombre_programa_formacion,versión_programa_formacion),
    PRIMARY key(id_programa_formacion)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
 
 
CREATE TABLE gestión_de_competencia (
    id_gestion_de_competencia  BIGINT  not null,
    nombre_competencia TEXT not null,
    PRIMARY key(id_gestion_de_competencia)
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
 
CREATE TABLE gestión_de_resultado_de_aprendizaje (
    id_resultado_de_aprendizaje BIGINT  not null,
    id_gestion_de_competencia          BIGINT NOT NULL,
    nombre_resultado_de_aprendizaje TEXT not null,
    PRIMARY key(id_resultado_de_aprendizaje),
    FOREIGN key(id_gestion_de_competencia) REFERENCES gestión_de_competencia(id_gestion_de_competencia) on DELETE CASCADE ON UPDATE CASCADE   
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
 

CREATE TABLE gestión_de_ruta_de_aprendizaje (
    id_ruta_aprendizaje    INT  not null AUTO_INCREMENT,
    id_programa_formacion    INT NOT NULL,
    id_gestion_de_competencia         BIGINT NOT NULL,
    UNIQUE(id_programa_formacion,id_gestion_de_competencia),

    PRIMARY key(id_ruta_aprendizaje),
    FOREIGN key(id_programa_formacion) REFERENCES gestion_programa_formacion(id_programa_formacion) on DELETE CASCADE ON UPDATE CASCADE ,
    FOREIGN key(id_gestion_de_competencia) REFERENCES gestión_de_competencia(id_gestion_de_competencia) on DELETE CASCADE ON UPDATE CASCADE   
)ENGINE=InnoDB DEFAULT CHARACTER SET=utf8;
  
 
-- JAMES---
 
CREATE TABLE gestion_de_fichas (
  Id_GestionDeFichas int AUTO_INCREMENT,
  Numero_de_ficha int NOT NULL,
  id_programa_formacion INT NOT NULL ,
  fecha_inicio DATE,
  fecha_final DATE,
  UNIQUE(Numero_de_ficha),
  primary key (Id_GestionDeFichas),
  FOREIGN key(id_programa_formacion) REFERENCES gestion_programa_formacion(id_programa_formacion) on DELETE CASCADE ON UPDATE CASCADE    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- IVAN VALVERDE----
 CREATE TABLE estado_perfil (
  id_estado_perfil int NOT NULL AUTO_INCREMENT,
  estado_perfil varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
   PRIMARY KEY(id_estado_perfil)
 );
-- JAMES---
CREATE TABLE administrar_perfil (
  id_administrar_perfil int NOT NULL AUTO_INCREMENT,
  id_usuario int  NOT NULL,
  tipo_rol varchar(20)  COLLATE utf8_unicode_ci DEFAULT NULL,
  id_estado_perfil int,
	UNIQUE(tipo_rol,id_usuario),
    PRIMARY KEY( id_administrar_perfil),
	FOREIGN key (id_estado_perfil) REFERENCES estado_perfil(id_estado_perfil) on DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN key (id_usuario) REFERENCES gestion_de_usuarios(id_usuario) on DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
 
CREATE TABLE gestion_ficha_aprendiz (
    id_gestion_ficha_aprendiz int NOT null UNIQUE AUTO_INCREMENT,
    id_gestion_fichas int NOT NULL,
    id_administrar_perfil int NOT NULL,
    UNIQUE(id_gestion_fichas,id_administrar_perfil),
    PRIMARY KEY(id_gestion_ficha_aprendiz),
    FOREIGN key(id_administrar_perfil) REFERENCES administrar_perfil(id_administrar_perfil) on DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN key(id_gestion_fichas) REFERENCES gestion_de_fichas(Id_GestionDeFichas) on DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
CREATE TABLE formacion_da_instructor_ficha ( 
    id_formacion_da_instructor_ficha int  NOT NULL AUTO_INCREMENT,
    id_resultado_de_aprendizaje BIGINT,
    id_administrar_perfil_instructor int,
    Id_GestionDeFichas int,
    UNIQUE(id_resultado_de_aprendizaje,Id_GestionDeFichas),    
    PRIMARY KEY( id_formacion_da_instructor_ficha),
    FOREIGN key (id_resultado_de_aprendizaje) REFERENCES gestión_de_resultado_de_aprendizaje (id_resultado_de_aprendizaje) on DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN key (id_administrar_perfil_instructor) REFERENCES administrar_perfil (id_administrar_perfil) on DELETE CASCADE ON UPDATE CASCADE, 
    FOREIGN key (Id_GestionDeFichas) REFERENCES gestion_de_fichas (Id_GestionDeFichas) on DELETE CASCADE ON UPDATE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
 
-- Andres Arias
CREATE TABLE gestionar_juicios_evaluativos ( 
    id_juicios_evaluativos int NOT NULL AUTO_INCREMENT,
    id_gestion_ficha_aprendiz int NOT NULL,
    id_resultado_de_aprendizaje BIGINT NOT NULL,
    juicios_evaluativo CHAR(1) NOT NULL,
	UNIQUE(id_gestion_ficha_aprendiz,id_resultado_de_aprendizaje),
    PRIMARY KEY( id_juicios_evaluativos),
    FOREIGN key (id_gestion_ficha_aprendiz) REFERENCES gestion_ficha_aprendiz(id_gestion_ficha_aprendiz) on DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN key (id_resultado_de_aprendizaje) REFERENCES gestión_de_resultado_de_aprendizaje(id_resultado_de_aprendizaje) on DELETE CASCADE ON UPDATE CASCADE
    
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
