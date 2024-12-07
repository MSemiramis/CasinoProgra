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
exports.TragamonedasCantidad = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var rls = require("readline-sync");
var TragamonedasCantidad = /** @class */ (function (_super) {
    __extends(TragamonedasCantidad, _super);
    function TragamonedasCantidad(casino, usuario) {
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        var _this = _super.call(this, 100, 12) || this;
        _this.casino = casino;
        _this.usuario = usuario;
        return _this;
    }
    TragamonedasCantidad.prototype.jugar = function () {
        var apuesta = 0;
        var saldoUsuario = this.usuario.getSaldo();
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta m\u00EDnima ".concat(this.getApuestaMinima(), "): "));
        }
        var tienePremio = false;
        var partida = this.generarMatriz();
        console.log(partida);
        var contador = {};
        for (var i = 0; i < partida.length; i++) {
            var fila = partida[i];
            for (var j = 0; j < fila.length; j++) {
                var caracter = fila[j];
                if (contador[caracter]) {
                    contador[caracter] += 1;
                }
                else {
                    contador[caracter] = 1;
                }
            }
        }
        for (var caracter in contador) {
            if (contador[caracter] === 10) {
                tienePremio = true;
                this.pagarPremio(apuesta);
                console.log("\u00A1Has ganado con ".concat(caracter, " (aparece 10 veces)!"));
                break;
            }
        }
        if (!tienePremio) {
            console.log("La tirada no tiene premio.");
            this.restarApuesta(apuesta);
        }
    };
    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    TragamonedasCantidad.prototype.pagarPremio = function (apuesta) {
        var premio = (apuesta * this.multiplicadorApuesta) - apuesta;
        this.casino.modificarSaldo(this.usuario, premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);
    };
    TragamonedasCantidad.prototype.restarApuesta = function (apuesta) {
        this.casino.modificarSaldo(this.usuario, -apuesta);
    };
    return TragamonedasCantidad;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasCantidad = TragamonedasCantidad;
