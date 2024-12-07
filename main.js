"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { leerTXT } from "./utils/utils";
var Ruleta_1 = require("./Ruleta");
var Casino_1 = require("./Casino");
var rls = require("readline-sync");
var JuegoDeDados_1 = require("./JuegoDeDados");
var utils_1 = require("./utils/utils");
var tragamonedasBasico_1 = require("./tragamonedasBasico");
var TragamonedasLinea_1 = require("./TragamonedasLinea");
var TragamonedasCantidad_1 = require("./TragamonedasCantidad");
//let tragamonedasBasico : Tragamonedas = new tragamonedasBasicos();
//QA MANUAL TESTING
/*TEST DE LECTURA DE TXT*/
//leerTXT('./instructivos/tragamonedas.txt');
//leerTXT('./instructivos/dados.txt');
function inicioConsola() {
    console.clear();
    console.log("==============================================================");
    console.log("                 Bienvenido a Casino La Gaita                 ");
    console.log("==============================================================");
    console.log("1: Crear usuario");
    console.log("2: Iniciar sesión");
    console.log("0: Salir del casino");
    return rls.questionInt("\nIngrese una opcion: ");
}
function crearUsuario(casino) {
    var nombreUsuario = rls.question("Ingrese su nombre de usuario:");
    while (casino.verificarUsuario(nombreUsuario) !== undefined) {
        console.log("Este nombre de usuario ya está en uso. Intente con otro.");
        nombreUsuario = rls.question("Ingrese un nuevo nombre de usuario:");
    }
    var pass = rls.question("Ingrese su contrasenia:");
    var saldoInicial = rls.questionInt("ingrese su saldo inicial:");
    casino.altaUsuario(nombreUsuario, pass, saldoInicial);
}
function iniciarSesion(casino) {
    var nombreUsuario = rls.question("Ingrese su nombre de usuario: ");
    var pass = rls.question("Ingrese su contrasenia: ");
    var usuario = casino.buscarUsuario(nombreUsuario, pass);
    console.log(usuario);
    if (usuario) {
        console.log("\n\u00A1Bienvenido, ".concat(usuario.getNombreUsuario, "!"));
        return usuario;
    }
    else {
        console.log("Usuario o contraseña incorrectos.");
        return null;
    }
}
function iniciarCasino() {
    var casino = new Casino_1.Casino();
    casino.cargarDesdeJSON();
    var usuario = null;
    while (!usuario) {
        var opcion = inicioConsola();
        switch (opcion) {
            case 1:
                crearUsuario(casino);
                break;
            case 2:
                usuario = iniciarSesion(casino);
                break;
            case 0:
                console.log("Gracias por visitar el Casino La Gaita. ¡Hasta pronto!");
                return;
            default:
                console.log("Opción inválida. Intente nuevamente.");
        }
    }
    //si el usuiario es correcto que muestre el menu de juegos
    menuIncial(usuario, casino);
}
function menuIncial(usuario, casino) {
    while (true) {
        console.log("\nBienvenido al casino  ".concat(usuario.getNombreUsuario(), " | Saldo: $").concat(usuario.getSaldo()));
        console.log("**Seleccione un juego para comenzar sus apuestas: ");
        console.log("1: Jugar Tragamonedas Basico");
        console.log("2: Jugar Tragamonedas por Linea");
        console.log("3: Jugar Tragamonedas por cantidad");
        console.log("4: Jugar Dados");
        console.log("5: Jugar Ruleta");
        console.log("6: Cargar saldo");
        console.log("0: Cerrar secion");
        console.log("=============Casino La Gaita=============");
        var entrada = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                jugarTragamonedasBasico(casino, usuario);
                break;
            case 2:
                jugarTragamonedasLinea(casino, usuario);
                break;
            case 3:
                jugarTragamonedasCantidad(casino, usuario);
                break;
            case 4:
                jugarDados(casino, usuario);
                console.log("Debe crear un usuario primero.");
                break;
            case 5:
                jugarRuleta(usuario, casino);
                console.log("Debe crear un usuario primero.");
                break;
            case 6:
                var carga = rls.questionInt("\nIngrese el monto a cargar: ");
                console.log(carga);
                if (carga < 0) {
                    console.log("Ingreso de saldo invalido.");
                }
                else {
                    casino.modificarSaldo(usuario, carga);
                }
                menuIncial(usuario, casino);
            case 0:
                console.log("Gracias por visitar el Casino La Gaita. ¡Hasta pronto!");
                return 0;
            default:
                console.log("Opción inválida. Intente nuevamente.");
        }
    }
}
iniciarCasino();
function jugarTragamonedasBasico(casino, usuario) {
    var tragamonedas = new tragamonedasBasico_1.TragamonedasBasico(casino, usuario); // Instancia correcta
    while (true) {
        console.log(" ");
        console.log("Seleccione una opcion: ");
        console.log("1: Leer reglas.");
        console.log("2: Juagr partida Basica.");
        console.log("3: Volver atras.");
        var entrada = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                (0, utils_1.leerTXT)('./instructivos/tragamonedas.txt');
                break;
            case 2:
                tragamonedas.jugar();
                break;
            case 3:
                menuIncial(usuario, casino);
                break;
            default:
                jugarTragamonedasBasico(casino, usuario);
                break;
        }
    }
}
function jugarTragamonedasLinea(casino, usuario) {
    var tragamonedas = new TragamonedasLinea_1.TragamonedasLinea(casino, usuario); // Instancia correcta
    while (true) {
        console.log(" ");
        console.log("Seleccione una opcion: ");
        console.log("1: Leer reglas.");
        console.log("2: Juagr partida por Linea.");
        console.log("3: Volver atras.");
        var entrada = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                (0, utils_1.leerTXT)('./instructivos/tragamonedas.txt');
                break;
            case 2:
                tragamonedas.jugar();
                break;
            case 3:
                menuIncial(usuario, casino);
                break;
            default:
                jugarTragamonedasLinea(casino, usuario);
                break;
        }
    }
}
function jugarTragamonedasCantidad(casino, usuario) {
    var tragamonedas = new TragamonedasCantidad_1.TragamonedasCantidad(casino, usuario); // Instancia correcta
    while (true) {
        console.log(" ");
        console.log("Seleccione una opcion: ");
        console.log("1: Leer reglas.");
        console.log("2: Juagr partida por Cantidad.");
        console.log("3: Volver atras.");
        var entrada = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                (0, utils_1.leerTXT)('./instructivos/tragamonedas.txt');
                break;
            case 2:
                tragamonedas.jugar();
                break;
            case 3:
                menuIncial(usuario, casino);
                break;
            default:
                jugarTragamonedasCantidad(casino, usuario);
                break;
        }
    }
}
function jugarDados(casino, usuario) {
    //CORREGIR JUEGO DE DADOS , NO PIDE APUESTA
    var miJuego = new JuegoDeDados_1.JuegoDeDados(casino, usuario);
    while (true) {
        console.log("Seleccione una opcion: ");
        console.log("1: Leer reglas.");
        console.log("2: Juagr partida.");
        console.log("3: Volver atras.");
        var entrada = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                (0, utils_1.leerTXT)('./instructivos/dados.txt');
                break;
            case 2:
                miJuego.jugarPartida();
                break;
            case 3:
                menuIncial(casino, usuario);
                break;
            default:
                jugarDados(casino, usuario);
                break;
        }
    }
}
function jugarRuleta(usuario, casino) {
    var ruleta = new Ruleta_1.Ruleta(100, casino, usuario);
    var elegirApuesta = menuRuleta(ruleta);
    while (elegirApuesta !== 0) {
        modoDeJuego(elegirApuesta, ruleta, usuario);
        elegirApuesta = menuRuleta(ruleta);
    }
    console.log("Volviendo al menú principal.");
}
function volverAtras() {
    var entrada = rls.questionInt("\nIngrese 0 para volver atras: ");
    while (entrada != 0) {
        entrada = rls.questionInt("\nIngrese 0 para volver atras: ");
    }
}
function menuRuleta(r) {
    console.log("\n <-------------------> Ruleta <-------------------> \n");
    dibujarRuleta();
    console.log("\n <------------------------------------------------> \n");
    console.log("\n Seleccione el tipo de apuesta que quiere realizar");
    console.log("1. Numero simple.");
    console.log("2. Linea (horizontal)");
    console.log("3. Columna (vertical)");
    console.log("4. Tercios");
    console.log("5. Mitades");
    console.log("6. Pares");
    console.log("7. Impares");
    console.log("8. Rojas (marcados con *)");
    console.log("9. Negras");
    console.log("0. Volver al menú anterior");
    var entrada = rls.questionInt("\nIngrese una opcion: ");
    return entrada;
}
function modoDeJuego(tipoApuesta, ruleta, usuario) {
    switch (tipoApuesta) {
        case 1: //Numero solo
            ruleta.pedirApuesta();
            ruleta.apostarNumSimpleReducido();
            volverAtras();
            break;
        case 2: //Linea horizontal
            ruleta.pedirApuesta();
            ruleta.apostarLinea();
            volverAtras();
            break;
        case 3: //Columna vertical
            ruleta.pedirApuesta();
            ruleta.apostarColumna();
            volverAtras();
            break;
        case 4: //Tercios
            ruleta.pedirApuesta();
            ruleta.apostarTercios();
            volverAtras();
            break;
        case 5: //Mitades
            ruleta.pedirApuesta();
            ruleta.apostarMitades();
            volverAtras();
            break;
        case 6: //Pares
            ruleta.pedirApuesta();
            ruleta.apostarPares();
            volverAtras();
            break;
        case 7: //Impares
            ruleta.pedirApuesta();
            ruleta.apostarImpares();
            volverAtras();
            break;
        case 8: //Rojas
            ruleta.pedirApuesta();
            ruleta.apostarRojas();
            volverAtras();
            break;
        case 9: //Negras
            ruleta.pedirApuesta();
            ruleta.apostarNegras();
            volverAtras();
            break;
        default:
            break;
    }
}
function dibujarRuleta() {
    console.log("               ___________________");
    console.log("        _______|________0________|_________");
    console.log("        |      |  1* |  2  |  3* |        |");
    console.log("        |  1er |  4  |  5* |  6  |        |");
    console.log("        |      |  7* |  8  |  9* |  1-18  |");
    console.log("        |______| 10  | 11  | 12* |        |");
    console.log("        |      | 13  | 14* | 15  |        |");
    console.log("        |  2do | 16* | 17  | 18* |________|");
    console.log("        |      | 19* | 20  | 21* |        |");
    console.log("        |______| 22  | 23* | 24  |        |");
    console.log("        |      | 25* | 26  | 27* | 19-36  |");
    console.log("        |  3er | 28  | 29  | 30* |        |");
    console.log("        |      | 31  | 32* | 33  |        |");
    console.log("        |______|_34*_|_35__|_36*_|________|");
    console.log("        |      |        |        |        |");
    console.log("        |  Par | Impar  |  Rojas | Negras |");
    console.log("        |______|________|________|________|\n");
}
