import { Tragamonedas } from "./Tragamonedas";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import * as rls from "readline-sync";


export class TragamonedasLinea extends Tragamonedas{

    constructor(casino:Casino, usuario :Usuario){
        //Apuesta minima 1 para el juego basico
        //Multiplicador de ganancia 20%
        super(50, 8);
        this.casino = casino;
        this.usuario = usuario;
    }

public jugar(): void {
        let apuesta: number = 0;
        const saldoUsuario = this.usuario.getSaldo();
    
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) {
            apuesta = rls.questionInt(`\nIngrese el monto a apostar (apuesta minima ${this.getApuestaMinima()}): `);
        }
    
        let tienePremio = false;
        const partida =this.generarMatriz();
        /*
        [
        [ '9', 'K', 'A', 'J', 'K' ],
        [ 'K', 'K', 'K', 'K', 'K' ],
        [ 'Q', '10', 'J', 'J', '10' ]
                        ]
        */
        console.log(partida);
    
        for (let i = 0; i < partida.length; i++) {
            const fila = partida[i]
            if (fila.every((valor) => valor === fila[0])) {
                tienePremio = true;
                this.pagarPremio(apuesta);
            }
        }

        if (!tienePremio) {
            console.log("La tirada no tiene premio.");
            this.restarApuesta(apuesta);
        }
 }
    

    //Verificar si estos metodos pasan al padre, se pueden reutilizar.
    public pagarPremio(apuesta:number ): void {
        const premio = (apuesta * this.multiplicadorApuesta) - apuesta;
        this.casino.modificarSaldo(this.usuario,premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);        
    }

    public restarApuesta(apuesta:number){
        this.casino.modificarSaldo(this.usuario, -apuesta);
    }

}