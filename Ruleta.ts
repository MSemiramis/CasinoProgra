import { Casino } from "./Casino";
import { Juego } from "./Juego"; 
import { Usuario} from "./Usuario";
import * as rls from "readline-sync";

export class Ruleta  {
    protected casino : Casino;
    protected usuario : Usuario;
    protected apuesta: number;
    protected numeroApostado: number;
    protected numeroGanador: number;
    protected premio: number;
    protected posiblesGanancias: number [] = [2, 3, 12, 35]; // colores, par/impar y mitades pagan doble - tercios y columna paga triple  -   linea 12 veces  -  num solo paga 35 veces
    protected multiplicadorPremio: number;
    protected apuestaMinima: number;
    protected numeros: number [] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
    protected pares: number [] = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
    protected impares: number [] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
    protected rojas: number [] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    protected negras: number [] = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    protected mitades: number [][] = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]];
    protected tercios: number[][] = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]];
    protected lineas: number [][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24], [25, 26, 27], [28, 29, 30], [31, 32, 33], [34, 35, 36]];
    protected columnas: number [][] = [[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]];

    constructor (apuestaMinima: number, casino :Casino, usuario : Usuario) {
        this.apuestaMinima = apuestaMinima;
        this.casino = casino;
        this.usuario = usuario;
    }

    jugar(usuario: Usuario, apuesta: number): void {
        throw new Error("Method not implemented.");
    }
    restarApuesta(usuario: Usuario, apuesta: number): void {
        throw new Error("Method not implemented.");
    }

    public pedirApuesta(): void {
        let aux = false;
        let apuesta: number = 0;
        const saldoUsuario= this.usuario.getSaldo();//1000
        while (apuesta < this.getApuestaMinima() || apuesta > saldoUsuario) { 
            apuesta = rls.questionInt("\nIngrese el monto a apostar (apuesta minima " + this.getApuestaMinima() + "): ");
        }
        this.setApuesta(apuesta);
        
        return 
    }

    private encontrarArreglo(arreglo: number[][], numeroBuscado: number): number {
        for (let i = 0; i < arreglo.length; i++) {
          if (arreglo[i].includes(numeroBuscado)) {
            return i; // Retorna el índice del arreglo interior donde se encontró el número
          }
        }
        return -1; // Si el número no se encuentra, retorna -1
    }

    private armarJuego(index: number): void {
        this.setNumeroGanador();
        this.setMultiplicadorPremio(index);
        this.setPremio();
    }

    private jugarRuleta(comparacion: any): void {
        if (comparacion) {
            console.log(`Felicitaciones! Has ganado. Tu premio es de $ ${this.getPremio()}`);
            this.casino.modificarSaldo(this.usuario, this.getPremio());
            //this.pagarPremio(¿?);     A que cliente se lo mando?? habria que ver como traer al cliente o cambiar el metodo pagarPremio()
        } else {
            console.log("Esta vez no se dió! Mejor suerte para la próxima!");
            this.casino.modificarSaldo(this.usuario, -this.getApuesta() );
        }
        console.log(this.usuario.getSaldo());
        return
    }

    public apostarNumSimpleReducido(): void {
        this.setNumeroApostado();
        this.armarJuego(3);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`El numero ganador es ${this.getNumeroGanador()}`)
        this.jugarRuleta(this.getNumeroApostado() == this.getNumeroGanador());
    }

    public apostarLinea(): void {
        this.setNumeroApostado();
        let indexLinea: number = this.encontrarArreglo(this.getLineas(), this.getNumeroApostado());
        console.log(`\nHa apostado por la linea ${indexLinea + 1}`);
        this.armarJuego(2);
        let indexNumGanador: number = this.encontrarArreglo(this.getLineas(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, entonces la linea ganadora es la ${indexNumGanador + 1}`)
        this.jugarRuleta(indexLinea == indexNumGanador);
    }

    public apostarColumna(): void {
        this.setNumeroApostado();
        let indexColumna: number = this.encontrarArreglo(this.getColumnas(), this.getNumeroApostado());
        console.log(`\nHa apostado por la columna ${indexColumna + 1}`);
        this.armarJuego(1);
        let indexNumGanador: number = this.encontrarArreglo(this.getColumnas(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, entonces la columna ganadora es la ${indexNumGanador + 1}`)
        this.jugarRuleta(indexColumna == indexNumGanador);
    }

    public apostarPares(): void {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, ` + (this.getPares().includes(this.getNumeroGanador()) ? "ganan los pares." : "ganan los impares."))
        this.jugarRuleta(this.getPares().includes(this.getNumeroGanador()));  
    }

    public apostarImpares(): void {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, ` + (this.getPares().includes(this.getNumeroGanador()) ? "ganan los pares." : "ganan los impares."))
        this.jugarRuleta(this.getImpares().includes(this.getNumeroGanador()));   
    }

    public apostarMitades(): void {
        this.setNumeroApostado();
        let indexMitad: number = this.encontrarArreglo(this.getMitades(), this.getNumeroApostado());
        console.log(`\nHa apostado por la ` + (indexMitad == 0 ? "primer mitad." : "segunda mitad."));
        this.armarJuego(0);
        let indexNumGanador: number = this.encontrarArreglo(this.getMitades(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, entonces la mitad ganadora es la ` + (indexNumGanador == 0 ? "primera." : "segunda."))
        this.jugarRuleta(indexMitad == indexNumGanador);
    }

    public apostarTercios(): void {
        this.setNumeroApostado();
        let indexTercios: number = this.encontrarArreglo(this.getTercios(), this.getNumeroApostado());
        console.log(`\nHa apostado por el ` + (indexTercios == 0 ? "primer tercio." : ( indexTercios == 1 ? "segundo tercio." : "tercer tercio.")));
        this.armarJuego(1);
        let indexNumGanador: number = this.encontrarArreglo(this.getTercios(), this.getNumeroGanador());
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, entonces el tercio ganador es el ` + (indexNumGanador == 0 ? "primero." : ( indexNumGanador == 1 ? "segundo." : "tercero.")))
        this.jugarRuleta(indexTercios == indexNumGanador);
    }

    public apostarNegras(): void {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, ` + (this.getRojas().includes(this.getNumeroGanador()) ? "ganan las rojas." : "ganan las negras."))
        this.jugarRuleta(this.getNegras().includes(this.getNumeroGanador())); 
    }

    public apostarRojas(): void {
        this.armarJuego(0);
        console.log("\nGirando la ruleta...");
        console.log("Tirando la bola...\n");
        console.log(`La bola cayo en el numero ${this.getNumeroGanador()}, ` + (this.getRojas().includes(this.getNumeroGanador()) ? "ganan las rojas." : "ganan las negras."))
        this.jugarRuleta(this.getRojas().includes(this.getNumeroGanador()));   
    }

    // SETTERS
    public setApuesta(valor: number): void {
        this.apuesta = valor;
    }

    public setApuestaMinima(valor: number): void {
        this.apuestaMinima = valor;
    }

    public setMultiplicadorPremio (index: number): void {
        this.multiplicadorPremio = this.posiblesGanancias[index];
    }

    public setPremio (): void {        
        this.premio = this.getApuesta() * this.getModificadorPremio();
    }

    public setNumeroApostado(): void {
        let numero: number =  rls.questionInt("\nIngrese el numero al que quiere apostar: ");      
        while (numero < 0 || numero > 36) {
            console.log("No es posible apostar por ese número.");
            numero=  rls.questionInt("\nIngrese el numero al que quiere apostar: ");
        }
        this.numeroApostado = numero;
    }

    public setNumeroGanador(): void {
        this.numeroGanador = Math.floor(Math.random() * 36);
    }

    //GETTERS
    public getApuesta(): number {
        return this.apuesta;
    }

    public getPremio(): number {
        return this.premio;
    }

    public getNumeroApostado(): number {
        return this.numeroApostado;
    }

    public getNumeroGanador(): number {
        return this.numeroGanador;
    }

    public getPosiblesGanancias(): number[] {
        return this.posiblesGanancias;
    }

    public getModificadorPremio(): number {
        return this.multiplicadorPremio;
    }

    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }

    public getNumeros(): number [] {
        return this.numeros
    }

    public getPares(): number [] {
        return this.pares
    }

    public getImpares(): number [] {
        return this.impares
    }

    public getRojas(): number [] {
        return this.rojas
    }

    public getNegras(): number [] {
        return this.negras
    }

    public getMitades(): number [][] {
        return this.mitades
    }

    public getTercios(): number [][] {
        return this.tercios
    }

    public getLineas(): number [][] {
        return this.lineas
    }

    public getColumnas(): number [][] {
        return this.columnas
    }

}