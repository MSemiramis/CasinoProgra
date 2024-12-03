"use strict";
// Archivo: MiJuegoDeDados.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiJuegoDeDados = void 0;
var JuegoDeDados_1 = require("./JuegoDeDados");
// Clase derivada específica para tu juego en particular
var MiJuegoDeDados = /** @class */ (function (_super) {
    __extends(MiJuegoDeDados, _super);
    function MiJuegoDeDados(valorGanador, valorMinApuesta, ParImpar) {
        if (valorGanador === void 0) { valorGanador = 7; }
        var _this = _super.call(this) || this; // Llamada al constructor de la clase base
        _this.valorGanador = valorGanador;
        _this.valorMinApuesta = valorMinApuesta;
        _this.ParImpar = ParImpar;
        return _this;
    }
    // Método para comprobar si la suma de los dados es un número ganador (7 u 11)
    MiJuegoDeDados.prototype.comprobarNumeroGanador = function () {
        var suma = this.sumarDados();
        return suma === 7 || suma === 11;
    };
    // Método para cambiar el valor del número ganador
    MiJuegoDeDados.prototype.setValorGanador = function (valorGanador) {
        this.valorGanador = valorGanador;
    };
    // Método para jugar una ronda del juego
    MiJuegoDeDados.prototype.jugar = function () {
        this.tirarDados();
        console.log("Dado1: ".concat(this.dado1, ", Dado2: ").concat(this.dado2));
        console.log("Suma de los dados: ".concat(this.sumarDados()));
        if (this.comprobarNumeroGanador()) {
            console.log('¡Puede seguir tirando!');
        }
        else {
            console.log('Ud ha perdido');
        }
    };
    return MiJuegoDeDados;
}(JuegoDeDados_1.JuegoDeDados));
exports.MiJuegoDeDados = MiJuegoDeDados;
