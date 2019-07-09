select id_GestionDeFichas, Numero_de_ficha , id_programa_formacion from gestion_de_fichas 
where Numero_de_ficha = 1439937;
UPDATE gestion_de_fichas
SET id_programa_formacion = 1 
WHERE id_GestionDeFichas = 2;
