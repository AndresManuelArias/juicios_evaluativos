create trigger verificar_que_solo_aprendiz_tenga_formacion before insert on gestion_ficha_aprendiz
    for each row
    begin
        IF EXISTS (select*from administrar_perfil where id_administrar_perfil = new.id_administrar_perfil and tipo_rol ='aprendiz' ) THEN
        
        ELSE
            signal sqlstate '45000' set message_text = 'Solo un aprendiz puede tener formacion';   		
        END IF;
    end$
delimiter ;


CREATE TRIGGER verificar_que_solo_aprendiz_tenga_formacion BEFORE insert ON gestion_ficha_aprendiz
    FOR EACH ROW
    BEGIN
        DECLARE vapenid INT;
        IF 'aprendiz' != 'aprendiz' THEN  
            set vapenid = 1;
        END IF;
END$$     
