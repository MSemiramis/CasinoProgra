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
exports.TragamonedasLinea = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var rls = require("readline-sync");
var TragamonedasLinea = /** @class */ (function (_super) {
    __extends(TragamonedasLinea, _super);
    function TragamonedasLinea(casino, usuario) {
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        var _this = _super.call(this, 50, 8) || this;
        _this.casino = casino;
        _this.usuario = usuario;
        return _this;
    }
    TragamonedasLinea.prototype.jugar = function () {
        var apuesta = 0;
        var saldoUsuario = this.usuario.getSaldo();
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta minima ".concat(this.getApuestaMinima(), "): "));
        }
        var tienePremio = false;
        var partida = [
            ['9', 'K', 'A', 'J', 'K'],
            ['K', 'K', 'K', 'K', 'K'],
            ['Q', '10', 'J', 'J', '10']
        ];
        console.log(partida);
        var _loop_1 = function (i) {
            var fila = partida[i];
            if (fila.every(function (valor) { return valor === fila[0]; })) {
                tienePremio = true;
                this_1.pagarPremio(apuesta);
            }
        };
        var this_1 = this;
        for (var i = 0; i < partida.length; i++) {
            _loop_1(i);
        }
        if (!tienePremio) {
            console.log("La tirada no tiene premio.");
            this.restarApuesta(apuesta);
        }
    };
    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    TragamonedasLinea.prototype.pagarPremio = function (apuesta) {
        var premio = (apuesta * this.multiplicadorApuesta) - apuesta;
        this.casino.modificarSaldo(this.usuario, premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);
    };
    TragamonedasLinea.prototype.restarApuesta = function (apuesta) {
        this.casino.modificarSaldo(this.usuario, -apuesta);
    };
    return TragamonedasLinea;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasLinea = TragamonedasLinea;
