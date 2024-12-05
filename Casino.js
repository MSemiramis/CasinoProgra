"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Usuario_1 = require("./Usuario");
var fs = require("fs");
var Casino = /** @class */ (function () {
    function Casino() {
        this.RUTA_DATOS = "./datos/casino.json";
        this.usuarios = [];
        this.contador = 0;
        this.cargarDesdeJSON();
    }
    //Funciones para JSON
    Casino.prototype.guardarEnJSON = function () {
        if (this.usuarios && this.usuarios.length > 0) {
            var data = {
                usuarios: this.usuarios,
            };
            fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
            console.log("Datos Actualizados.");
        }
        else {
            console.error("no hay usuario");
        }
    };
    Casino.prototype.cargarDesdeJSON = function () {
        if (fs.existsSync(this.RUTA_DATOS)) {
            var data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
            this.usuarios = data.usuarios.map(function (u) {
                return new Usuario_1.Usuario(u.id, u.nombreUsuario, u.pass, u.saldo);
            });
            console.log("Datos cargados correctamente.");
        }
        else {
            console.warn("No se encontró el archivo de datos. Se inicializa vacío.");
        }
    };
    Casino.prototype.generarId = function (prefijo) {
        this.contador++;
        return prefijo + this.contador;
    };
    Casino.prototype.altaUsuario = function (nombreUsuario, pass, saldo) {
        var id = this.generarId("U");
        var nuevoUsuario = new Usuario_1.Usuario(id, nombreUsuario, pass, saldo);
        this.usuarios.push(nuevoUsuario);
        console.log("Usuario ".concat(nombreUsuario, " agregada con ID: ").concat(id));
        this.guardarEnJSON();
    };
    Casino.prototype.buscarUsuario = function (nombreUsuario, pass) {
        return this.usuarios.find(function (u) { return u.getNombreUsuario() === nombreUsuario && u.validarPass(pass); });
    };
    return Casino;
}());
exports.Casino = Casino;
