

export class Usuario{

    private nombre:string;
    private saldo:number;

    constructor(nombre:string, saldo:number){
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
    
    //GETTERS//
    getNombre(){
        return this.nombre;
    }
    getSaldo(){
        return this.saldo;
    }
}