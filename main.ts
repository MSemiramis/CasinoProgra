//import { leerTXT } from "./utils/utils";
import { Ruleta } from "./Ruleta";
import { MiJuegoDeDados } from './MiJuegoDeDados';
import { Usuario } from "./Usuario";
import { Tragamonedas } from "./Tragamonedas";
import { Casino } from "./Casino";
import * as rls from "readline-sync";
//import { TragamonedaBasicos } from "./TragamonedasBasico"
//let tragamonedasBasico : Tragamonedas = new tragamonedasBasicos();

//QA MANUAL TESTING


/*TEST DE LECTURA DE TXT*/
//leerTXT('./instructivos/tragamonedas.txt');
//leerTXT('./instructivos/dados.txt');

    function inicioConsola(){
        console.clear();
        console.log("==============================================================");
        console.log("                 Bienvenido a Casino La Gaita                 ");
        console.log("==============================================================");
        console.log("1: Crear usuario");
        console.log("2: Iniciar sesión");
        console.log("0: Salir del casino");

        return rls.questionInt("\nIngrese una opcion: ");
    }

    function crearUsuario(casino: Casino){
        const nombreUsuario = rls.question("Ingrese su nombre de usuario:");
        const pass = rls.question("Ingrese su contrasenia:");
        const saldoInicial = rls.questionInt("ingrese su saldo inicial:");
        casino.altaUsuario(nombreUsuario, pass,  saldoInicial)
    }

    function iniciarSesion(casino: Casino): Usuario | null {
        const nombreUsuario = rls.question("Ingrese su nombre de usuario: ");
        const pass = rls.question("Ingrese su contrasenia: ");
        const usuario = casino.buscarUsuario(nombreUsuario, pass);
        if (usuario) {
          console.log(`\n¡Bienvenido, ${usuario.getNombreUsuario}!`);
          return usuario;
        } else {
          console.log("Usuario o contraseña incorrectos.");
          return null;
        }
    }

    function iniciarCasino() {
        const casino = new Casino();
        casino.cargarDesdeJSON();
      
        let usuario: Usuario | null = null;
      
        while (!usuario) {
          const opcion = inicioConsola();
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
        menuIncial(usuario);
      }

    function menuIncial(usuario : Usuario): number{
    while (true){
        console.clear();
        console.log(`\nBienvenido al casino  ${usuario.getNombreUsuario()} | Saldo: $${usuario.getSaldo()}`);
        console.log(`**Seleccione un juego para comenzar sus apuestas: `);
        console.log("1: Jugar Tragamonedas Basico");  
        console.log("2: Jugar Tragamonedas por Linea");          
        console.log("3: Jugar Tragamonedas por cantidad");
        console.log("4: Jugar Dados");    
        console.log("5: Jugar Ruleta");
        console.log("0: Cerrar secion")        
        console.log("=============Casino La Gaita=============");

        let entrada: number = rls.questionInt("\nIngrese una opcion: ");
        switch (entrada) {
            case 1:
                jugarTragamonedas();
                console.log("Debe crear un usuario primero.");
                break;
            case 2:
                jugarDados();
                console.log("Debe crear un usuario primero.");
                break;
            case 3:
                /*if (usuario) jugarDados();
                else console.log("Debe crear un usuario primero.");*/
                break;
            case 4:
                /*if (usuario) jugarDados();
                else console.log("Debe crear un usuario primero.");
                break;*/
            case 5:
                jugarRuleta(); 
                console.log("Debe crear un usuario primero.");
                break;
            case 0:
                console.log("Gracias por visitar el Casino La Gaita. ¡Hasta pronto!");
                volverMenuInicial();
            default:
                console.log("Opción inválida. Intente nuevamente.");
            }
        }
    }

    iniciarCasino();


function volverMenuInicial(): void{
    rls.question();
    inicioConsola();
}

function jugarTragamonedas() {
    // Lógica para tragamonedas
    console.log("Iniciando Tragamonedas...");
}

function jugarDados() {
    const miJuego = new MiJuegoDeDados(7, 10, 'Par');
    miJuego.jugar();
}

function jugarRuleta() {
    let apuestaMin: number = 100;
    let ruleta: Ruleta = new Ruleta(apuestaMin);
    
    let elegirApuesta: number = menuRuleta(ruleta); 
    while (elegirApuesta !== 0) { 
        modoDeJuego(elegirApuesta, ruleta); 
        elegirApuesta = menuRuleta(ruleta); 
    }
    
    console.log("Volviendo al menú principal.");
     
}




/*------------------------------------------------TragaMonedas------------------------------------------------------

function imprimirMatriz(matriz){
    console.log(" ");
    console.log("-------------------");   
    for (let i = 0; i < matriz.length; i++) {
        console.log(" | " + matriz[i].join(" ")   + " | ");  // Imprime cada fila unida por un espacio
    }
    console.log("-------------------"); 
}

// imprimirMatriz();

const simbolos: any[] = ["9", "10", "J", "Q", "K", "A"];

function generarMatriz(){
    let salida:string [][] = [];

    for(let i=0; i<3; i++ ){
        let fila:string [] = [];
        for(let j=0; j<5; j++){
            let indice = Math.floor(Math.random()*simbolos.length);
            fila.push(simbolos[indice]);
        }
    salida.push(fila);
    }
    return salida;
}

imprimirMatriz(generarMatriz());*/

//------------------------------------------------Ruleta------------------------------------------------------

let apuestaMin: number = 100;
let ruleta: Ruleta = new Ruleta(apuestaMin);
let elegirApuesta: number = menuRuleta(ruleta);


while (elegirApuesta != 0) {
    modoDeJuego(elegirApuesta,ruleta);
    elegirApuesta = menuRuleta(ruleta);
}

function volverAtras(): void{
    let entrada: number = rls.questionInt("\nIngrese 0 para volver atras: ");
    
    while (entrada != 0) {
        entrada = rls.questionInt("\nIngrese 0 para volver atras: ");
    }
}


function menuRuleta(r : Ruleta): number{
    console.log("\n <-------------------> Ruleta <-------------------> \n")
    dibujarRuleta();
    console.log("\n <------------------------------------------------> \n")
    console.log("\n Seleccione el tipo de apuesta que quiere realizar")
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

    let entrada: number = rls.questionInt("\nIngrese una opcion: ");

    return entrada;
}

function modoDeJuego(tipoApuesta: number, ruleta : Ruleta) {
    switch(tipoApuesta) {
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

function dibujarRuleta () {
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