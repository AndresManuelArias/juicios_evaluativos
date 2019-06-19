
'use strict';
var fs=require("fs");
let archivo=  JSON.parse(fs.readFileSync('dataBase/datos_conexion.json','utf-8'));
console.log(archivo);
var mysql = require('mysql');
var util = require('util');
var pool = mysql.createPool(archivo);
pool.query = util.promisify(pool.query); // Magic happens here.
module.exports.con = pool;