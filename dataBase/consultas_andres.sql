USE juicios_evaluativos;
 


INSERT into  gestion_programa_formacion(
    nombre_programa_formacion ,
    duracion_programa_academico   )VALUES(
        'adsi',3
    );

 INSERT into gestión_de_competencia (
     id_gestion_de_competencia,
    nombre_competencia
)VALUES (240201501,'Comprender textos en inglés en forma escrita y auditiva'),(240201502,'Producir textos en inglés en forma escrita y oral.');

INSERT into gestión_de_resultado_de_aprendizaje (
       id_resultado_de_aprendizaje,
    id_gestion_de_competencia,
    nombre_resultado_de_aprendizaje)VALUES(240201501,24020150167,'moviento naranja');

INSERT into gestión_de_ruta_de_aprendizaje (
    id_programa_formacion   ,
    id_gestion_de_competencia)VALUES(1,240201501),(1,240201502);

INSERT INTO gestión_de_resultado_de_aprendizaje (
id_resultado_de_aprendizaje ,
    nombre_resultado_de_aprendizaje )VALUES(24020150112,'muy bien');


select
            gestión_de_competencia.id_gestion_de_competencia,
            gestion_programa_formacion.nombre_programa_formacion,
            gestión_de_competencia.nombre_competencia
            from gestión_de_ruta_de_aprendizaje
                left join gestión_de_competencia 
                on  
                gestión_de_ruta_de_aprendizaje.id_gestion_de_competencia = gestión_de_competencia.id_gestion_de_competencia
                left join
                gestion_programa_formacion
                ON 
                gestión_de_ruta_de_aprendizaje.id_programa_formacion = gestion_programa_formacion.id_programa_formacion 
                    WHERE  gestion_programa_formacion.nombre_programa_formacion LIKE 'a%' GROUP BY gestión_de_competencia.nombre_competencia;
