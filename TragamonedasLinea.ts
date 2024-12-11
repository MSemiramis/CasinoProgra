import { Tragamonedas } from "./Tragamonedas";
import { Casino } from "./Casino";
import { Usuario } from "./Usuario";
import * as rls from "readline-sync";


export class TragamonedasLinea extends Tragamonedas{

    constructor(casino:Casino, usuario :Usuario){
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

    public pagarPremio(apuesta:number ): void {
        const premio = (apuesta * this.multiplicadorApuesta) - apuesta;
        this.casino.modificarSaldo(this.usuario,premio);
        console.log("Usted a ganado un premio. Se ha pagado " + premio);        
    }

    public restarApuesta(apuesta:number){
        this.casino.modificarSaldo(this.usuario, -apuesta);
    }

}