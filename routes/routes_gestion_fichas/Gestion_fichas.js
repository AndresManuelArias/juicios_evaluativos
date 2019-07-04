


var mysql = require('../../dataBase/conexion.js');
//https://expressjs.com/es/starter/generator.html
//set DEBUG=myapp:* & npm start

/** Class representing a gestion de fichas
 * *
 *  @class 
 * */
class Gestion_fichas {

    async metodo(req, res, next) {
        var usuarios = await mysql.con.query("SELECT * FROM gestion_de_usuarios");
        console.log(usuarios)
         res.render('./viewEjemplo/ejemplo.jade', { title: 'Ejemplo',usuarios:usuarios });// es necesario insertar datos a la tabla de gestion de usuario
    }
       /**
     * @method mostar_usuarios
     * @param {object} req - no espera nada del usuario.
     * @param {object} res - muestra los usuarios que estan en la base de datos.
     */
    async mostar_usuarios(req,res){
        let resulTable =  await mysql.con.query('SELECT * FROM gestion_de_usuarios LEFT JOIN administrar_perfil ON  gestion_de_usuarios.Id_usuario=administrar_perfil.id_usuario;');
        console.log(resulTable);   
        res.render("./view_gestion_fichas/viewMostrar_usuario.jade",{ title: 'Mostrar Usuarios',usuarios:resulTable }) ;
    }
     /**
     * @method mostrar_aprendices_ficha
     * @param {object} req - Espera una peticion get con una variable que contiene el numero de ficha y el nombre de usuario.
     * @param {object} res - muestra los aprendices con la ficha que estan en la base de datos.
     */
    async mostrar_aprendices_ficha(req, res, next){
        let resulTable =  await mysql.con.query(`SELECT * FROM gestion_ficha_aprendiz 
        LEFT JOIN administrar_perfil ON gestion_ficha_aprendiz.id_administrar_perfil=administrar_perfil.id_administrar_perfil 
        LEFT JOIN gestion_de_fichas ON 
        gestion_ficha_aprendiz.id_gestion_fichas=gestion_de_fichas.Id_GestionDeFichas
         JOIN gestion_de_usuarios ON
         administrar_perfil.id_usuario=gestion_de_usuarios.Id_usuario
         WHERE gestion_de_fichas.Numero_de_ficha LIKE ?
         AND gestion_de_usuarios.nombre_usuario LIKE ?
        ;`,[req.query.numero_de_ficha+"%",
          req.query.nombre_de_usuario+"%"]);
        console.log(resulTable);  
        res.render("./view_gestion_fichas/mostrar_aprendices.jade",{ title: 'Mostrar Usuarios',aprendices:resulTable }) ; 
    }
      /**
     * @method buscar_aprendices
     * @param {object} req - no espera nada del usuario.
     * @param {object} res - muestra los aprendices que estan en la base de datos.
     */
    async buscar_aprendiz(req, res, next){
    console.log('buscar aprendiz')

        let result =  await mysql.con.query(`SELECT * FROM gestion_de_fichas;`);
        console.log(result)
        res.render("./view_gestion_fichas/buscar_aprendiz.jade",{ title: 'Mostrar Usuarios',buscar:result }) ;
    }
     /**
     * @method asignar_aprendices
     * @param {object} req - no espera nada del usuario.
     * @param {object} res - muestra los aprendices que estan en la base de datos.
     */
    async asignar_aprendices (req,res){

        let perfiles =  await mysql.con.query('SELECT * FROM gestion_de_usuarios LEFT JOIN administrar_perfil ON  gestion_de_usuarios.Id_usuario=administrar_perfil.id_usuario;');
        console.log(perfiles);
        let optionP ="";
        for(let filas=0;filas<perfiles.length;filas++) {
          console.log('perfiles[filas]',perfiles[filas]);
          optionP+=`<option value="${perfiles[filas].id_administrar_perfil}">${perfiles[filas].nombre_usuario}</option>`
          }
    
        let result =  await mysql.con.query(`SELECT * FROM gestion_de_fichas;`);
        let option="";
        for(let filas=0;filas<result.length;filas++) {
        console.log(result[filas]);
        option+=`<option value="${result[filas].Id_GestionDeFichas}">${result[filas].Numero_de_ficha}</option>`
        }
        let html = `<!DOCTYPE html>
        <html>
        <head>
          <title></title>
        </head>
        <center>
        <body>
        <form action="/asignar_aprendices" method="POST">
        <select name="id_gestion_fichas">
        <option value="">Selecionar ficha</option>
        ${option}
        </select>
        <select name="id_administrar_perfil">
        <option value="">Selecionar aprendiz</option>
        ${optionP}
        </select>
        <input type="submit" value="asignar"/>
        </form>
        </body>
        </center>
        </html>`;
        res.send(html);
    }
    /**
     * @method post_asignar_aprendices
     * @param {object} req -  espera.
     * @param {object} res - mostrar una tabla con los aprendices a ingresar.
     */
     async post_asignar_aprendices(req,res){
        console.log('post',req.body.id_gestion_fichas,req.body.id_administrar_perfil)
        let insert =  await mysql.con.query('INSERT INTO gestion_ficha_aprendiz(id_gestion_fichas, id_administrar_perfil) VALUES (?,?)',[req.body.id_gestion_fichas,req.body.id_administrar_perfil]);
        let resulTable =  await mysql.con.query(`SELECT * FROM gestion_ficha_aprendiz 
        LEFT JOIN administrar_perfil ON gestion_ficha_aprendiz.id_administrar_perfil=administrar_perfil.id_administrar_perfil 
        LEFT JOIN gestion_de_fichas ON 
        gestion_ficha_aprendiz.id_gestion_fichas=gestion_de_fichas.Id_GestionDeFichas
         JOIN gestion_de_usuarios ON
         administrar_perfil.id_usuario=gestion_de_usuarios.Id_usuario
        ;`);
        console.log(resulTable);   
        let tableHtml = '<table border="1">';
        tableHtml += '<tr> <th>ID</th><th>NOMBRE</th><th>DOCUMENTO</th><th>CORREO_ELECTRONICO</th><th>TIPO DE DOCUMENTO</th><th>ROL</th><th>NUMERO FICHA</th><th>PROGRAMA ACADEMICO</th> </tr>';
        resulTable.forEach(element => {
            tableHtml += `
            <tr>
              <td>${element.id_usuario} </td>
              <td>${element.nombre_usuario} </td>
              <td>${element.numero_de_identificacion} </td>
              <td>${element.correo_sena} </td>
              <td>${element.tipo_de_identificacion} </td>
              <td>${element.tipo_rol} </td>
              <td>${element.Numero_de_ficha} </td>
              <td>${element.Sigla_progr_Acade} </td>
    
            </tr>`;
        });
        tableHtml += '</table>';
        res.send(tableHtml);
        
      }
    async mostrar_fichas(req, res, next){
        console.log('mostar fichas')

        let result =  await mysql.con.query(`SELECT * FROM gestion_de_fichas
        inner join gestion_programa_formacion
        on gestion_de_fichas.id_programa_formacion=gestion_programa_formacion.id_programa_formacion;`);
        console.log(result)
        res.render("./view_gestion_fichas/mostrar_fichas.jade",{ title: 'Mostrar Usuarios',fichas:result }) ;
    }
    async mostrar_aprendices(req, res, next){
        console.log('mostar aprendices')

        let result =  await mysql.con.query(`SELECT * FROM gestion_de_usuarios;`);
        console.log(result)
        res.render("./view_gestion_fichas/mostrar_aprendices.jade",{ title: 'Mostrar Usuarios',aprendices:result }) ;
    }       
    async vista_modificar_fichas(req, res, next){
        console.log('modificar fichas')
        console.log (req.params)
        let result =  await mysql.con.query(`select id_GestionDeFichas, Numero_de_ficha , id_programa_formacion from gestion_de_fichas 
        where Numero_de_ficha = ?;`,[req.params.Numero_de_ficha]);
        console.log(result)
        let programaFormacion= await mysql.con.query('SELECT * From gestion_programa_formacion')
        console.log('----------------------------')
        console.log (programaFormacion)
        console.log('----------------------------')
        
        res.render("./view_gestion_fichas/modificar_fichas.jade",{ title: 'modificar_fichas',modificar_fichas:result[0],programaFormacion:programaFormacion }) ;
    }     
    async vista_crear_fichas(req, res, next){
        console.log('vista crear fichas')
        let result =  await mysql.con.query(`SELECT * FROM  gestion_programa_formacion`);
        res.render("./view_gestion_fichas/crear_fichas.jade",{ title: 'crear_fichas' ,programasFormacion:result}) ;
    }  
    async crear_fichas(req, res, next){
        console.log('crear fichas')
        console.log (req.body)
        let result =  await mysql.con.query(`insert into gestion_de_fichas (Numero_de_ficha,id_programa_formacion) values (?,?);`,[req.body.Numero_de_ficha,req.body.id_programa_formacion]);
        console.log(result);
        let respuesta = ""
        if(result.affectedRows){
            respuesta = "Se creo una ficha nueva con el numero "+req.body.Numero_de_ficha;
        }
        res.render("./view_gestion_fichas/respuesta_usuario.jade",{ title: 'crear_fichas' ,respuesta:respuesta,direccion:"/mostrar_fichas"}) ;
    }  
    async buscarPrograma(req,res){
        let programaFormacion= await mysql.con.query('SELECT * From gestion_de_fichas')
        console.log (" datos de la ficha = "+programaFormacion)
        return programaFormacion;
    } 
    async modificar_fichas(req,res){
        req.params.Numero_de_ficha
        req.body.id_GestionDeFichas
        req.body.id_programa_formacion
        console.log(req.body,req.params)
        let actualizar= await mysql.con.query('update gestion_de_fichas set id_programa_formacion=? where Numero_de_ficha=?',[req.body.id_programa_formacion, req.params.Numero_de_ficha])
        console.log(actualizar)
        let respuesta = ""
        if(actualizar.affectedRows){
            respuesta = "Se ha cambia el programa de formacion CORRECTAMENTE a la ficha  "+req.params.Numero_de_ficha;
        }
        res.render("./view_gestion_fichas/respuesta_usuario.jade",{ title: 'actualizar_fichas' ,respuesta:respuesta,direccion:"/mostrar_fichas"}) ;
    }
    async asignar_fichas_aprendiz(req,res){
   
        console.log(req.body,req.params)
        let asignar=await mysql.con.query('insert into gestion_ficha_aprendiz(id_gestion_fichas,id_administrar_perfil)values (?,?)',[req.body.Id_GestionDeFichas, req.body.id_administrar_perfil])
        console.log(asignar)
        let respuesta = ""
        if(asignar.affectedRows){
            respuesta = "el aprendiz fue asignado CORRECTAMENTE  ";
        }
        res.render("./view_gestion_fichas/respuesta_usuario.jade",{ title: 'asignar_aprendiz_fichas' ,respuesta:respuesta,direccion:"/"});
    }
    async view_asignar_aprendiz_ficha(req,res){
        console.log('....................')
        console.log('.........estevab...........')
        console.log('....................')
        let fichas=await mysql.con.query(`select * from gestion_de_fichas`)
        console.log('fichas',fichas)
        let perfiles=await mysql.con.query(`select * from administrar_perfil
        inner join gestion_de_usuarios
        on gestion_de_usuarios.id_usuario=administrar_perfil.id_usuario`)
        console.log('perfiles',perfiles)

        res.render("./view_gestion_aprendiz_ficha/asignar_aprendiz_ficha.jade",{ title: 'asignar_aprendiz_fichas' ,fichas,perfiles}); 
    }
    async modificar_fichas_aprendiz(req,res){
        console.log(req.body,req.params)
        let modificar=await mysql.con.query('update gestion_ficha_aprendiz set id_gestion_fichas=? where id_gestion_ficha_aprendiz=?',[req.body.Id_GestionDeFichas, req.params.id_gestion_ficha_aprendiz])
        console.log(modificar)
        let respuesta = ""
        if(modificar.affectedRows){
            respuesta = "el aprendiz fue asignado CORRECTAMENTE  ";
        }
        res.render("./view_gestion_fichas/respuesta_usuario.jade",{ title: 'modificar_aprendiz_fichas' ,respuesta:respuesta,direccion:"/"});
    }
    async view_modificar_aprendiz_ficha(req,res){
        console.log('view_modificar_aprendiz_ficha')
        let fichas=await mysql.con.query(`select * from gestion_de_fichas`)
        console.log('fichas',fichas)
        let perfiles=await mysql.con.query(`select * from administrar_perfil
        inner join gestion_de_usuarios
        on gestion_de_usuarios.id_usuario=administrar_perfil.id_usuario
        inner join gestion_ficha_aprendiz
        on gestion_ficha_aprendiz.id_administrar_perfil=administrar_perfil.id_administrar_perfil
        where gestion_ficha_aprendiz.id_gestion_ficha_aprendiz=?`,[req.params.id_gestion_ficha_aprendiz])
        console.log('perfiles',perfiles)

        res.render("./view_gestion_aprendiz_ficha/modificar_asignacion_ficha.jade",{ title: 'modificar_aprendiz_fichas' ,fichas,perfiles}); 
    }
    async listar_aprendices_ficha(req, res, next){
        let resulTable =  await mysql.con.query(`SELECT * FROM gestion_ficha_aprendiz 
        LEFT JOIN administrar_perfil ON gestion_ficha_aprendiz.id_administrar_perfil=administrar_perfil.id_administrar_perfil 
        LEFT JOIN gestion_de_fichas ON 
        gestion_ficha_aprendiz.id_gestion_fichas=gestion_de_fichas.Id_GestionDeFichas
         JOIN gestion_de_usuarios ON
         administrar_perfil.id_usuario=gestion_de_usuarios.Id_usuario`)
         console.log(resulTable);  
         res.render("./view_gestion_aprendiz_ficha/listar_asignacion.jade",{ title: 'Listar Usuarios',aprendices:resulTable }) ;

    }     
}
    
module.exports = Gestion_fichas;