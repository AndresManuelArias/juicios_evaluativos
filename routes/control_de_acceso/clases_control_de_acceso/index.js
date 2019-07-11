const mysql = require('../../../dataBase/conexion.js');
const nodemailer = require("nodemailer");
class ClasesControlDeAcceso {
    constructor(
        nombre_usuario,
        correo_sena,
        numero_de_identificacion,
        tipo_de_identificacion,
        contraseña
    ) {
        this.nombre_usuario = nombre_usuario;
        this.correo_sena = correo_sena;
        this.numero_de_identificacion = numero_de_identificacion;
        this.tipo_de_identificacion = tipo_de_identificacion;
        this.contraseña = contraseña
    }



    async guardar_datos(nombre_usuario,
        correo_sena,
        numero_de_identificacion,
        tipo_de_identificacion,
    ) {
        let insertar_usuarios = {
            nombre_usuario: nombre_usuario,
            correo_sena: correo_sena,
            numero_de_identificacion: numero_de_identificacion,
            tipo_de_identificacion: tipo_de_identificacion
        };


        if (/^[A-Z,0-9,a-z]{1,8}@(misena.edu.co|sena.edu.co)$/g.test(insertar_usuarios.correo_sena) && (/^\d{8,12}$/g.test(insertar_usuarios.numero_de_identificacion))) {
            await mysql.con.query("INSERT INTO gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion)VALUES(?,?,?,?)", [insertar_usuarios.nombre_usuario, insertar_usuarios.correo_sena, insertar_usuarios.numero_de_identificacion, insertar_usuarios.tipo_de_identificacion]);
            await mysql.con.query("INSERT INTO control_de_acceso(correo_sena,contrasena)VALUES(?,?)", [insertar_usuarios.correo_sena, insertar_usuarios.numero_de_identificacion]);
            
            //await mysql.con.query(`INSERT INTO gestion_de_usuarios(nombre_usuario,correo_sena,numero_de_identificacion,tipo_de_identificacion)VALUES(?,?)`)
            //esto es temporal mientras que unimos el aplicativo
            console.log("-----------------------")
            console.log("fase tres")
            console.log("-----------------------")

            return "/gestionUsuarios/gestionUsuarios.jade";

        } else {
            return "Error de parametros"

        }
    }
    async buscar_datos(
        correo_sena,
        contraseña
    ) {
        let datos = "";

        let buscar_usuarios = {
            correo_sena: correo_sena,
            contraseña: contraseña
        }

        if (/^[A-Z,0-9,a-z]{1,8}@(misena.edu.co|sena.edu.co)$/g.test(buscar_usuarios.correo_sena) && (/^\d{8,12}$/g.test(buscar_usuarios.contraseña))) {
            console.log("buscar_usuarios", buscar_usuarios);
            let sql = await mysql.con.query("SELECT correo_sena,contrasena FROM control_de_acceso WHERE correo_sena=? and contrasena=? ;", [buscar_usuarios.correo_sena, buscar_usuarios.contraseña]);
          //  console.log(sql);
            //con esta
            datos = JSON.stringify(sql);
            let dato2 = JSON.parse(datos);
            //si la contraseña es igual entoces lo deja ingresar
            if (buscar_usuarios.contraseña == dato2[0].contrasena) {
                return "/gestionUsuarios/gestionUsuarios.jade";

                //res.end('<h1>datps enviador correcta mente</h1><a href="http://localhost:3000/control_de_acceso"><input type="submit"></a> ');      

            }
            //si la contraseña es diferente entoces no lo deja ingresar
            else {
                return '/pruebaDerender';

            }

        } else {
            return "Error de parametros"
            //this.inisio_de_secion()
        }


    }


    async   enviar_contrasenaa(correo_sena) {



        let sqlc = await mysql.con.query('SELECT contrasena FROM control_de_acceso WHERE correo_sena=?', [correo_sena]);
        let sqln = await mysql.con.query('SELECT nombre_usuario FROM gestion_de_usuarios WHERE correo_sena=?', [correo_sena]);
        let sqlnTexto = JSON.stringify(sqln);
        let sqlcobjet = JSON.parse(sqlnTexto);
        let random = Math.floor(Math.random() * 1000000000);
        await mysql.con.query('update control_de_acceso Set contrasena=? Where correo_sena=?', [random, correo_sena]);
        let retorne = { contraseña: random, correo: correo_sena, nombre: sqlcobjet[0].nombre_usuario }


        // Definimos el transporter
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'estebanmezabetancur@gmail.com',
                pass: '3002950qwe'
            }
        });
        //Definimos el email
        var mailOptions = {
            from: "Grupo Gaes ;)",
            to: retorne.correo,
            subject: "Hola " + retorne.nombre + " esta es tu contraseña ;)",
            text: retorne.correo + " " + retorne.contraseña,
            html: `<p> ${retorne.nombre} </p>
         <h1>${retorne.correo + " " + retorne.contraseña} </h1>
          <a href="http://10.7.0.209:3000/control_de_acceso"> ingresa a tu cuenta </a> `
        };
        //Enviamos el email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);

            } else {
                return "control_de_acceso/contraseña_enviada.jade"

            }
        });



    }
}

module.exports.ClasesControlDeAcceso = ClasesControlDeAcceso;



