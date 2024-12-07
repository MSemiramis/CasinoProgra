"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruleta = void 0;
var rls = require("readline-sync");
var Ruleta = /** @class */ (function () {
    function Ruleta(apuestaMinima, casino, usuario) {
        this.posiblesGanancias = [2, 3, 12, 35]; // colores, par/impar y mitades pagan doble - tercios y columna paga triple  -   linea 12 veces  -  num solo paga 35 veces
        this.numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        this.pares = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
        this.impares = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
        this.rojas = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        this.negras = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        this.mitades = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]];
        this.tercios = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]];
        this.lineas = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24], [25, 26, 27], [28, 29, 30], [31, 32, 33], [34, 35, 36]];
        this.columnas = [[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]];
        this.apuestaMinima = apuestaMinima;
        this.casino = casino;
        this.usuario = usuario;
    }
    Ruleta.prototype.jugar = function (usuario, apuesta) {
        throw new Error("Method not implemented.");
    };
    Ruleta.prototype.restarApuesta = function (usuario, apuesta) {
        throw new Error("Method not implemented.");
    };
    Ruleta.prototype.pedirApuesta = function () {
        var aux = false;
        var apuesta = 0;
        var saldoUsuario = this.usuario.getSaldo(); //1000
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta minima " + this.getApuestaMinima() + "): ");
        }
        this.setApuesta(apuesta);
        return;
    };
    Ruleta.prototype.encontrarArreglo = function (arreglo, numeroBuscado) {
        for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].includes(numeroBuscado)) {
                return i; // Retorna el índice del arreglo interior donde se encontró el número
            }
        }
        return -1; // Si el número no se encuentra, retorna -1
    };
    Ruleta.prototype.armarJuego = function (index) {
        this.setNumeroGanador();
        this.setMultiplicadorPremio(index);
        this.setPremio();
    };
    Ruleta.prototype.jugarRuleta = function (comparacion) {
        if (comparacion) {
            console.log("Felicitaciones! Has ganado. Tu premio es de $ ".concat(this.getPremio()));
            this.casino.modificarSaldo(this.usuario, this.getPremio());
            //this.pagarPremio(¿?);     A que cliente se lo mando?? habria que ver como traer al cliente o cambiar el metodo pagarPremio()
        }
        else {
            console.log("Esta vez no se dió! Mejor suerte para la próxima!");
            this.casino.modificarSaldo(this.usuario, -this.getApuesta());
        }
        console.log(this.usuario.getSaldo());
        return;
    };
    Ruleta.prototype.apostarNumSimpleReducido = function () {
        this.setNumeroApostado();
        this.armarJuego(3);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("El numero ganador es ".concat(this.getNumeroGanador()));
        this.jugarRuleta(this.getNumeroApostado() == this.getNumeroGanador());
    };
    Ruleta.prototype.apostarLinea = function () {
        this.setNumeroApostado();
        var indexLinea = this.encontrarArreglo(this.getLineas(), this.getNumeroApostado());
        console.log("\nHa apostado por la linea ".concat(indexLinea + 1));
        this.armarJuego(2);
        var indexNumGanador = this.encontrarArreglo(this.getLineas(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", entonces la linea ganadora es la ").concat(indexNumGanador + 1));
        this.jugarRuleta(indexLinea == indexNumGanador);
    };
    Ruleta.prototype.apostarColumna = function () {
        this.setNumeroApostado();
        var indexColumna = this.encontrarArreglo(this.getColumnas(), this.getNumeroApostado());
        console.log("\nHa apostado por la columna ".concat(indexColumna + 1));
        this.armarJuego(1);
        var indexNumGanador = this.encontrarArreglo(this.getColumnas(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", entonces la columna ganadora es la ").concat(indexNumGanador + 1));
        this.jugarRuleta(indexColumna == indexNumGanador);
    };
    Ruleta.prototype.apostarPares = function () {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", ") + (this.getPares().includes(this.getNumeroGanador()) ? "ganan los pares." : "ganan los impares."));
        this.jugarRuleta(this.getPares().includes(this.getNumeroGanador()));
    };
    Ruleta.prototype.apostarImpares = function () {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", ") + (this.getPares().includes(this.getNumeroGanador()) ? "ganan los pares." : "ganan los impares."));
        this.jugarRuleta(this.getImpares().includes(this.getNumeroGanador()));
    };
    Ruleta.prototype.apostarMitades = function () {
        this.setNumeroApostado();
        var indexMitad = this.encontrarArreglo(this.getMitades(), this.getNumeroApostado());
        console.log("\nHa apostado por la " + (indexMitad == 0 ? "primer mitad." : "segunda mitad."));
        this.armarJuego(0);
        var indexNumGanador = this.encontrarArreglo(this.getMitades(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", entonces la mitad ganadora es la ") + (indexNumGanador == 0 ? "primera." : "segunda."));
        this.jugarRuleta(indexMitad == indexNumGanador);
    };
    Ruleta.prototype.apostarTercios = function () {
        this.setNumeroApostado();
        var indexTercios = this.encontrarArreglo(this.getTercios(), this.getNumeroApostado());
        console.log("\nHa apostado por el " + (indexTercios == 0 ? "primer tercio." : (indexTercios == 1 ? "segundo tercio." : "tercer tercio.")));
        this.armarJuego(1);
        var indexNumGanador = this.encontrarArreglo(this.getTercios(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", entonces el tercio ganador es el ") + (indexNumGanador == 0 ? "primero." : (indexNumGanador == 1 ? "segundo." : "tercero.")));
        this.jugarRuleta(indexTercios == indexNumGanador);
    };
    Ruleta.prototype.apostarNegras = function () {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", ") + (this.getRojas().includes(this.getNumeroGanador()) ? "ganan las rojas." : "ganan las negras."));
        this.jugarRuleta(this.getNegras().includes(this.getNumeroGanador()));
    };
    Ruleta.prototype.apostarRojas = function () {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log("La bola cayo en el numero ".concat(this.getNumeroGanador(), ", ") + (this.getRojas().includes(this.getNumeroGanador()) ? "ganan las rojas." : "ganan las negras."));
        this.jugarRuleta(this.getRojas().includes(this.getNumeroGanador()));
    };
    // SETTERS
    Ruleta.prototype.setApuesta = function (valor) {
        this.apuesta = valor;
    };
    Ruleta.prototype.setApuestaMinima = function (valor) {
        this.apuestaMinima = valor;
    };
    Ruleta.prototype.setMultiplicadorPremio = function (index) {
        this.multiplicadorPremio = this.posiblesGanancias[index];
    };
    Ruleta.prototype.setPremio = function () {
        this.premio = this.getApuesta() * this.getModificadorPremio();
    };
    Ruleta.prototype.setNumeroApostado = function () {
        var numero = rls.questionInt("\nIngrese el numero al que quiere apostar: ");
        while (numero < 0 || numero > 36) {
            console.log("No es posible apostar por ese número.");
            numero = rls.questionInt("\nIngrese el numero al que quiere apostar: ");
        }
        this.numeroApostado = numero;
    };
    Ruleta.prototype.setNumeroGanador = function () {
        this.numeroGanador = Math.floor(Math.random() * 36);
    };
    //GETTERS
    Ruleta.prototype.getApuesta = function () {
        return this.apuesta;
    };
    Ruleta.prototype.getPremio = function () {
        return this.premio;
    };
    Ruleta.prototype.getNumeroApostado = function () {
        return this.numeroApostado;
    };
    Ruleta.prototype.getNumeroGanador = function () {
        return this.numeroGanador;
    };
    Ruleta.prototype.getPosiblesGanancias = function () {
        return this.posiblesGanancias;
    };
    Ruleta.prototype.getModificadorPremio = function () {
        return this.multiplicadorPremio;
    };
    Ruleta.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Ruleta.prototype.getNumeros = function () {
        return this.numeros;
    };
    Ruleta.prototype.getPares = function () {
        return this.pares;
    };
    Ruleta.prototype.getImpares = function () {
        return this.impares;
    };
    Ruleta.prototype.getRojas = function () {
        return this.rojas;
    };
    Ruleta.prototype.getNegras = function () {
        return this.negras;
    };
    Ruleta.prototype.getMitades = function () {
        return this.mitades;
    };
    Ruleta.prototype.getTercios = function () {
        return this.tercios;
    };
    Ruleta.prototype.getLineas = function () {
        return this.lineas;
    };
    Ruleta.prototype.getColumnas = function () {
        return this.columnas;
    };
    return Ruleta;
}());
exports.Ruleta = Ruleta;
