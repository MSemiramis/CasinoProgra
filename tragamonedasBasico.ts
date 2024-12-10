import { Tragamonedas } from "./Tragamonedas";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import * as rls from "readline-sync";



export class TragamonedasBasico extends Tragamonedas{

    constructor(casino:Casino, usuario :Usuario){
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        super(10, 2);
        this.casino = casino;
        this.usuario = usuario;
    }

    public jugar( ):void {
        let apuesta: number = 0;
        const saldoUsuario= this.usuario.getSaldo();
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) { 
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta minima " + this.getApuestaMinima() + "): ");
        }
        let contador = 0;
        const partida = this.generarMatriz();
        console.log(partida);
        for(let i = 0; i < 3; i++){
            let fila = partida[i];
            for(let j=0; j<fila.length -2; j++){
                if(fila[j] === fila[j+1] &&
                   fila[j+1] === fila[j+2]
                ){
                    contador ++;
                }else{
                    
                }
            }
        }
        if(contador > 0){
            this.pagarPremio(apuesta);
        }else{
            console.log("La tirada no tiene premio");
            this.restarApuesta(apuesta);
        }
    }

    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    public pagarPremio(apuesta:number ): void {
        const premio = apuesta * this.multiplicadorApuesta;
        this.casino.modificarSaldo(this.usuario,premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);        
    }

    public restarApuesta(apuesta:number){
        this.casino.modificarSaldo(this.usuario, -apuesta);
    }

    
}
