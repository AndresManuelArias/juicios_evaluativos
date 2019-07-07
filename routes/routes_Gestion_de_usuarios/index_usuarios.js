/** 
*@author Ivan Valverde
*
*/

let mysql = require ("../../dataBase/conexion.js");
class usuarios{
    async ver_usuario(req,res){
        let usuarios=await mysql.con.query(`select * from administrar_perfil
        join gestion_de_usuarios 
        on administrar_perfil.id_usuario = gestion_de_usuarios.id_usuario
        join estado_perfil 
        on administrar_perfil.id_estado_perfil = estado_perfil.id_estado_perfil
        ;`)// esto es la consulta sql 
        console.log(usuarios)
        res.render('view_Gestion_de_usuarios/vista_usuarios.jade', { title: 'perfiles' , usuarios:usuarios});// esto renderiza los datos en una vista html
/** 
*registro_usuarios
*@method resgistro de usuario
*@return datos
*@param {object} req- recibela petición
*@param {object} res-responde la petición
*@description realiza una consulta de la data estore
*/
    }
    async registro_usuarios(req,res){
        // let registro=await mysql.con.query('insert into administrar_perfil) values(id_administrar_perfil,id_usuario,tipo_rol)')
        // res.render('routes_Gestion_de_usuarios/vista_usuarios.jade', { title: 'perfiles' , registro:registro});
      
/**
 * asignar_perfiles
 *@method asignar perfil
 *@type select
 *@param {object} req- recibe la petición
 *@param {object} res-responde la petición
 *@description despliega select para asignar perfil a un rol
 */
    }
    async asignar_perfiles(req,res){
        console.log(req.body);
        for(let key in req.body.selecion_rol){
            console.log(key,req.body.selecion_rol[key]);
            await mysql.con.query('INSERT INTO administrar_perfil  (id_usuario,tipo_rol) VALUES(?,?);',[ Number( String(key).replace("'","").replace("'","")),req.body.selecion_rol[key]])
        }
        
        res.render('view_Gestion_de_usuarios/vista_usuarios.jade', { title: 'perfiles' , usuarios:usuarios});

    }
/** 
*ver_estado_perfil
*@method de consulta
*@return datos
*@param {object} req- recibela petición
*@param {object} res-responde la petición
*@description hace  una consulta de la data store y retorna los datos que contiene  la tabla de administrar perfil
*/
    async ver_estado_perfil(req,res){
        let consulta= await mysql.con.query("SELECT administrar_perfil.estado_perfil ,administrar_perfil.id_administrar_perfil, administrar_perfil.id_usuario,gestion_de_usuarios.Id_usuario,gestion_de_usuarios.nombre_usuario,gestion_de_usuarios.numero_de_identificacion,administrar_perfil.tipo_rol FROM administrar_perfil LEFT JOIN gestion_de_usuarios ON administrar_perfil.id_usuario = gestion_de_usuarios.Id_usuario;")
       console.log(consulta);
        res.render('view_Gestion_de_usuarios/actualizar_perfil.jade', { title: 'perfiles' , usuarios:consulta});
        }
/**
 * cambiar_estado_perfil
 *@method actualizar estado
 *@type combobox
 *@param {object} req- recibe la petición
 *@param {object} res-responde la petición
 *@description permite actualizar el estado del aprendiz a activo / inativo 
 
 */        
    async cambiar_estado_perfil(req,res){
        console.log(req.body)
        for (let key in req.body){
            console.log(key,req.body[key])
            let actualizar= await mysql.con.query(" update administrar_perfil set estado_perfil= ? where id_administrar_perfil = ?;",[req.body[key],key]);
        }
        res.render('view_Gestion_de_usuarios/actualizar_perfil.jade', { title: 'perfiles' , usuarios:consulta});
        
    }
    async cambiar_estado_perfil_un_usuario(req,res){
        console.log(req.body)
            let consulta= await mysql.con.query(" update administrar_perfil set id_estado_perfil= ? where id_administrar_perfil = ?;",[req.body.id_estado_perfil,req.body.id_administrar_perfil]);
        console.log(consulta)
        let respuesta = "";
        if(consulta.changedRows==0){
            respuesta="no se cambiaron los datos";
        }else if(consulta.changedRows==1){
            respuesta="datos actualizados corretamente";
        }
        res.render('view_Gestion_de_usuarios/vista_alert.jade', { title: 'perfiles' , respuestaUsuario:respuesta});
        
    }   
    async vista_actualizar_perfil(req,res){
        console.log(req.query)
        let perfil=await mysql.con.query('select* from administrar_perfil where id_usuario=?',[req.query.id_usuario]);
        console.log(perfil)
    }

    async ver_estado_perfil(req,res){
        console.log(req.query)
        let perfil=await mysql.con.query(`select * from administrar_perfil
        join gestion_de_usuarios 
        on administrar_perfil.id_usuario = gestion_de_usuarios.id_usuario
        join estado_perfil 
        on administrar_perfil.id_estado_perfil = estado_perfil.id_estado_perfil
        where administrar_perfil.id_administrar_perfil=?;`,[req.query.id_administrar_perfil]);
         let estado_perfil=await mysql.con.query(`select* from estado_perfil;`,[req.query.id_administrar_perfil]);
        console.log(perfil)
        res.render('view_Gestion_de_usuarios/actualizar_perfil_usuarios.jade', { title: 'perfiles' , usuarios:perfil[0],estado_perfil:estado_perfil});

    }

    async listar_usuarios_perfil(req,res){
        console.log(req.query)
        let usuarios=await mysql.con.query("select*from gestion_de_usuarios")
        console.log(usuarios);
        res.render('view_Gestion_de_usuarios/listar_crear_estado_perfil.jade', { title: 'perfiles' ,usuarios:usuarios});
    }

    async vista_crear_perfil(req,res){
        console.log(req.query)
        let usuarios=await mysql.con.query("select*from gestion_de_usuarios where id_usuario=?;",[req.params.id_usuario]);
        let estado=await mysql.con.query("select *from estado_perfil",[req.params.id_usuario]);
        let rol=await mysql.con.query("select tipo_rol,id_usuario from administrar_perfil where id_administrar_perfil=?",[req.params.id_usuario]);
        console.log(usuarios,estado,rol);
        res.render('view_Gestion_de_usuarios/vista_crear_perfil.jade', { title: 'perfiles' ,usuarios:usuarios[0],estado:estado});
    }
} 

module.exports=new usuarios();


