"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, saldo) {
        this.nombre = nombre;
        this.saldo = saldo;
    }
    //SETTERS//
    Usuario.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Usuario.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    //GETTERS//
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getSaldo = function () {
        return this.saldo;
    };
    Usuario.prototype.sumarApuesta = function (premio) {
        this.saldo = this.saldo + premio;
    };
    Usuario.prototype.restarApuesta = function (apuesta) {
        this.saldo = this.saldo - apuesta;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
