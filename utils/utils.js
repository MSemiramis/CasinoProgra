"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leerTXT = leerTXT;
var fs = require("fs");
//Leer un txt para leer los reglamentos. A corregir 
function leerTXT(ruta) {
    try {
        var archivoTexto = fs.readFileSync(ruta, 'utf8');
        console.log(archivoTexto);
    }
    catch (error) {
        console.log(error + "Error");
        return [];
    }
    return [];
}
//TEST//
leerTXT('../instructivos/dados.txt');
