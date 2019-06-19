var mysql = require('../../dataBase/conexion.js');
class Ejemplo {
    async metodo(req, res, next) {
        var usuarios = await mysql.con.query("SELECT * FROM gestion_de_usuarios");
        console.log(usuarios)
         res.render('./viewEjemplo/ejemplo.jade', { title: 'Ejemplo',usuarios:usuarios });// es necesario insertar datos a la tabla de gestion de usuario
    }
}

module.exports = Ejemplo;