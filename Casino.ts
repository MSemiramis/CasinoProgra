import { Usuario } from "./Usuario";
import * as fs from "fs";

export class Casino{
    protected usuarios: Usuario [];
    protected contador: number;
    readonly RUTA_DATOS : string = "./datos/casino.json"

    constructor(){
        this.usuarios = [];
        this.contador = 0;
        this.cargarDesdeJSON();
    }
    //Funciones para JSON

    guardarEnJSON(): void {
        if (this.usuarios && this.usuarios.length > 0) {
            const data = {
                usuarios: this.usuarios,
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos Actualizados.`);
        }else{
            console.error("no hay usuario")
        }
    }

    cargarDesdeJSON(): void {
        if (fs.existsSync(this.RUTA_DATOS)) {
            const data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
            this.usuarios = data.usuarios.map((u: any) => 
              new Usuario(u.id,
                u.nombreUsuario, 
                u.pass, 
                u.saldo
            ));
            console.log("Datos cargados correctamente.");
          } else {
            console.warn("No se encontró el archivo de datos. Se inicializa vacío.");
          }
    }

    public generarId(prefijo:string): string {
        this.contador++;
        return prefijo + this.contador; 
    }

    altaUsuario(nombreUsuario: String, pass:String, saldo: number): void {
        const id = this.generarId("U"); 
        const nuevoUsuario = new Usuario(id, nombreUsuario, pass, saldo); 
        this.usuarios.push(nuevoUsuario); 
        console.log(`Usuario ${nombreUsuario} agregada con ID: ${id}`);

        this.guardarEnJSON();

    }

    buscarUsuario(nombreUsuario: string, pass: string): Usuario | undefined {
        return this.usuarios.find(
            (u) => u.getNombreUsuario() === nombreUsuario && u.validarPass(pass)
          );
        }
}


