"use strict";
// Archivo: JuegoDeDados.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.JuegoDeDados = void 0;
// Clase base genérica para juegos de dados
var JuegoDeDados = /** @class */ (function () {
    function JuegoDeDados() {
        this.dado1 = 0;
        this.dado2 = 0;
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
    return JuegoDeDados;
}());
exports.JuegoDeDados = JuegoDeDados;
