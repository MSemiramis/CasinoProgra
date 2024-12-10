"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoDeDados = void 0;
var rls = require("readline-sync");
// Clase base genérica para juegos de dados
var JuegoDeDados = /** @class */ (function () {
    function JuegoDeDados(casino, usuario) {
        this.apuestaMinima = 2;
        this.multiplicarApuesta = 1.2;
        this.dado1 = 0;
        this.dado2 = 0;
        this.casino = casino;
        this.usuario = usuario;
    }
    // Método para tirar los dados, generando valores aleatorios para dado1 y dado2
    JuegoDeDados.prototype.tirarDados = function () {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
    };
    // Método para sumar los valores de los dados
    JuegoDeDados.prototype.sumarDados = function () {
        return this.dado1 + this.dado2;
    };
    JuegoDeDados.prototype.jugarPartida = function () {
        var apuesta = 0;
        var saldoUsuario = this.usuario.getSaldo();
        console.log("inicia el juego de dados");
        while (apuesta > this.apuestaMinima || apuesta > saldoUsuario) {
            apuesta = rls.questionInt("\nIngrese el monto a apostar: ");
        }
        this.tirarDados();
        this.verificarPartida(apuesta);
    };
    JuegoDeDados.prototype.pagarApuesta = function (apuesta) {
        console.log("Usted ha ganado la tirada!");
        var premio = apuesta * this.multiplicarApuesta;
        this.casino.modificarSaldo(this.usuario, premio);
    };
    JuegoDeDados.prototype.restarSaldo = function (apuesta) {
        console.log("Partida perdida");
        this.casino.modificarSaldo(this.usuario, apuesta);
    };
    JuegoDeDados.prototype.verificarPartida = function (apuesta) {
        var resultado = this.sumarDados();
        if (resultado == 7 ||
            resultado == 11) {
            this.pagarApuesta(apuesta);
        }
        else if (resultado == 2 ||
            resultado == 3 ||
            resultado == 12) {
            this.restarSaldo(apuesta);
        }
        else {
            this, this.tirarDados();
            resultado = this.sumarDados();
            if (resultado == 7) {
                this.pagarApuesta(apuesta);
            }
            else {
                this.restarSaldo(apuesta);
            }
        }
    };
    return JuegoDeDados;
}());
exports.JuegoDeDados = JuegoDeDados;
