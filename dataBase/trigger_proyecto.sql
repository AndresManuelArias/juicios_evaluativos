SHOW TRIGGERS;
DROP TRIGGER IF EXISTS impedir_quitar_aprobado;
delimiter $$
create trigger impedir_quitar_aprobado before UPDATE on gestionar_juicios_evaluativos
    for each row
    begin
        if  new.juicios_evaluativo = "D" AND  old.juicios_evaluativo = "A" then
          SET new.juicios_evaluativo = "A";   
          SIGNAL SQLSTATE '45000'    SET MESSAGE_TEXT = 'No se puede cambiar un juicio evaluativo ya aprobado';    	
        end if;
    end;$$
delimiter ;

DROP TRIGGER IF EXISTS verificar_que_solo_aprendiz_tenga_formacion;
delimiter $$

create trigger verificar_que_solo_aprendiz_tenga_formacion before insert on gestion_ficha_aprendiz
    for each row
    begin
        IF EXISTS (select*from administrar_perfil where id_administrar_perfil = new.id_administrar_perfil and tipo_rol <>'aprendiz' ) THEN
            SIGNAL SQLSTATE '45000'    SET MESSAGE_TEXT = 'Solo un aprendiz puede tener formacion'; 
 	
        end if;
    end;$$
delimiter ;


DROP TRIGGER IF EXISTS verificar_que_solo_instructor_de_formacion;
delimiter $$

create trigger verificar_que_solo_instructor_de_formacion before insert on formacion_da_instructor_ficha
    for each row
    begin
        IF EXISTS (select*from administrar_perfil where id_administrar_perfil = new.id_administrar_perfil_instructor and tipo_rol <>'instructor' ) THEN
            SIGNAL SQLSTATE '45000'    SET MESSAGE_TEXT = 'Solo un instructor puede dar formacion'; 
 	
        end if;
    end;$$
delimiter ;

SHOW TRIGGERS;
