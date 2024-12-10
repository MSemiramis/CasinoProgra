"use strict";
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
exports.TragamonedasBasico = void 0;
var tragamonedas_1 = require("./tragamonedas");
var rls = require("readline-sync");
var TragamonedasBasico = /** @class */ (function (_super) {
    __extends(TragamonedasBasico, _super);
    function TragamonedasBasico(casino, usuario) {
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        var _this = _super.call(this, 10, 2) || this;
        _this.casino = casino;
        _this.usuario = usuario;
        return _this;
    }
    TragamonedasBasico.prototype.jugar = function () {
        var apuesta = 0;
        var saldoUsuario = this.usuario.getSaldo();
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta minima " + this.getApuestaMinima() + "): ");
        }
        var contador = 0;
        var partida = this.generarMatriz();
        console.log(partida);
        for (var i = 0; i < 3; i++) {
            var fila = partida[i];
            for (var j = 0; j < fila.length - 2; j++) {
                if (fila[j] === fila[j + 1] &&
                    fila[j + 1] === fila[j + 2]) {
                    contador++;
                }
                else {
                }
            }
        }
        if (contador > 0) {
            this.pagarPremio(apuesta);
        }
        else {
            console.log("La tirada no tiene premio");
            this.restarApuesta(apuesta);
        }
    };
    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    TragamonedasBasico.prototype.pagarPremio = function (apuesta) {
        var premio = apuesta * this.multiplicadorApuesta;
        this.casino.modificarSaldo(this.usuario, premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);
    };
    TragamonedasBasico.prototype.restarApuesta = function (apuesta) {
        this.casino.modificarSaldo(this.usuario, -apuesta);
    };
    return TragamonedasBasico;
}(tragamonedas_1.Tragamonedas));
exports.TragamonedasBasico = TragamonedasBasico;
