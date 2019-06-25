var mysql = require('../../dataBase/conexion.js');
class Ejemplo {
    async metodo(req, res, next) {
        var usuarios = await mysql.con.query("SELECT * FROM gestion_de_usuarios");// realiza la busqueda 
        console.log(usuarios)
        res.render('./viewEjemplo/ejemplo.jade', { title: 'Ejemplo',usuarios:usuarios });//renderiza 
    }
}

module.exports = Ejemplo;