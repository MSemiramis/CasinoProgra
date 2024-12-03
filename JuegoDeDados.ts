// Archivo: JuegoDeDados.ts

// Clase base genérica para juegos de dados
export class JuegoDeDados {
    dado1: number;
    dado2: number;
  
    constructor() {
      this.dado1 = 0;
      this.dado2 = 0;
    }
  
    // Método para tirar los dados, generando valores aleatorios para dado1 y dado2
    tirarDados(): void {
      this.dado1 = Math.floor(Math.random() * 6) + 1;
      this.dado2 = Math.floor(Math.random() * 6) + 1;
    }
  
    // Método para sumar los valores de los dados
    sumarDados(): number {
      return this.dado1 + this.dado2;
    }
  }
  