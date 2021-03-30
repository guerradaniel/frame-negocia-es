import { MeuObjeto } from './MeuObjeto'
import { Negociacao } from './Negociacao'

export class Negociacoes implements MeuObjeto<Negociacoes> {

    private _negociacoes: Negociacao[] = []

    adiciona(negociacao: Negociacao) {
        this._negociacoes.push(negociacao)
    }
    paraArray(): Negociacao[] {
        return ([] as Negociacao[]).concat(this._negociacoes)
    }

    paraTexto() {
        console.log('Impressão')
        console.log(JSON.stringify(this._negociacoes))
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this._negociacoes) == JSON.stringify(negociacoes.paraArray)
    }

}