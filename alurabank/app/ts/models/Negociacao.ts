import { Imprimivel } from './Imprimivel'

export class Negociacao extends Imprimivel {

    constructor(
        readonly data: Date,
        readonly quantidade: number,
        readonly valor: number
    ) {
        super()
    }

    get volume() {
        return this.quantidade * this.valor
    }

    paraTexto(): void {
        console.log('Impressão')
        console.log(
            `data: ${this.data}
            quantidade: ${this.quantidade}
            valor: ${this.valor}
            volume: ${this.volume}`)
    }
}