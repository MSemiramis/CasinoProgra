"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(id, nombreUsuario, pass, saldo) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.saldo = saldo;
        this.pass = pass;
    }
    //SETTERS//
    Usuario.prototype.setNombre = function (nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    };
    Usuario.prototype.setSaldo = function (saldo) {
        this.saldo = saldo;
    };
    Usuario.prototype.setId = function (id) {
        this.id = id;
    };
    Usuario.prototype.setPass = function (pass) {
        this.pass = pass;
    };
    //GETTERS//
    Usuario.prototype.getId = function () {
        return this.id;
    };
    Usuario.prototype.getNombreUsuario = function () {
        return this.nombreUsuario;
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
    Usuario.prototype.validarPass = function (pass) {
        return this.pass === pass;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
