import * as fs from 'fs';

//Leer un txt para leer los reglamentos. A corregir 
export function leerTXT(ruta:string):any []{
    try{
        const archivoTexto = fs.readFileSync(ruta, 'utf8');
        console.log(archivoTexto);
        
    }catch(error){
        console.log(error + "Error");
        return [];
    }
        return [];
    }
//TEST//
leerTXT('../instructivos/dados.txt');