
export class Usuario{

    protected id: String;
    protected nombre:string;
    protected saldo:number;

    constructor(id: string, nombre:string, saldo:number){
        this.id = id;
        this.nombre = nombre;
        this.saldo = saldo;
    }



    //SETTERS//
    setNombre(nombre:string){
        this.nombre = nombre;
    }
    setSaldo(saldo:number){
        this.saldo = saldo;
    }
    setId(id:string){
        this.id = id;
    }

    
    //GETTERS//
    getId(){
        return this.id;
    }
    getNombre(){
        return this.nombre;
    }
    getSaldo(){
        return this.saldo;
    }

    sumarApuesta(premio:number){
        this.saldo = this.saldo + premio;
    }
    restarApuesta(apuesta:number){
        this.saldo = this.saldo - apuesta;
    }
}