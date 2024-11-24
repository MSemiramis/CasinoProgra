import { leerTXT } from "./utils/utils";


//QA MANUAL TESTING


/*TEST DE LECTURA DE TXT*/
//leerTXT('./instructivos/tragamonedas.txt');
//leerTXT('./instructivos/dados.txt');

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

imprimirMatriz(generarMatriz());