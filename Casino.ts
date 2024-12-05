import { Usuario } from "./Usuario";
import * as fs from "fs";

export class Casino{
    protected usuarios: Usuario [];
    protected contador: number;
    readonly RUTA_DATOS : string = "./datos/casino.json"

    //Funciones para JSON

    guardarEnJSON(): void {
        const data = {
            usuarios: this.usuarios,
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos Actualizados.`);
    }

    cargarDesdeJSON(): void {
        if (fs.existsSync(this.RUTA_DATOS)) {
            const data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));

            this.usuarios = data.usuarios.map((u: any) => {
                const usuario = new Usuario(
                    u.id,
                    u.nombre,
                    u.saldo,
                );
                return this.usuarios;
            });
        }
    }

    public generarId(prefijo:string): string {
        this.contador++;
        return prefijo + this.contador; 
    }

    altaUsuario(nombre: string, saldo: number): void {
        const id = this.generarId("U"); 
        const nuevoUsuario = new Usuario(id, nombre, saldo); 
        this.usuarios.push(nuevoUsuario); 
        console.log(`Usuario ${nombre} agregada con ID: ${id}`);

        this.guardarEnJSON();

    }

}