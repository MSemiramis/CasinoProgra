"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamonedas = void 0;
var utils_1 = require("./utils/utils");
var Tragamonedas = /** @class */ (function () {
    function Tragamonedas(minApuesta, multiplicadorApuesta) {
        this.simbolos = ["9", "10", "J", "Q", "K", "A"];
        this.simbolos = this.simbolos;
        this.minApuesta = minApuesta;
        this.multiplicadorApuesta = multiplicadorApuesta;
    }
    Tragamonedas.prototype.leerReglamento = function () {
        (0, utils_1.leerTXT)('./instructivos/tragamonedas.txt');
    };
    //Generador de Matriz para tragamonedas//
    Tragamonedas.prototype.generarMatriz = function () {
        var salida = [];
        for (var i = 0; i < 3; i++) {
            var fila = [];
            for (var j = 0; j < 5; j++) {
                var indice = Math.floor(Math.random() * this.simbolos.length);
                fila.push(this.simbolos[indice]);
            }
            salida.push(fila);
        }
        return salida;
    };
    //SETTERS//
    Tragamonedas.prototype.setMinApuesta = function (minApuesta) {
        this.minApuesta = minApuesta;
    };
    Tragamonedas.prototype.setMultiplicadorApuesta = function (multiplicadorApuesta) {
        this.multiplicadorApuesta = multiplicadorApuesta;
    };
    //GETTER
    Tragamonedas.prototype.getApuestaMinima = function () {
        return this.minApuesta;
    };
    return Tragamonedas;
}());
exports.Tragamonedas = Tragamonedas;
