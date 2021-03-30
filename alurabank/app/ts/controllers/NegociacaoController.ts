import { NegociacoesView, MensagemView } from '../views/index';
import { Negociacoes, Negociacao, NegociacaoParcial, Igualavel } from '../models/index';
import { DomInject, Throttle } from '../helpers/decorators/index'
import { NegociacaoService } from '../services/index'
import { imprime } from '../helpers/index'

let timer = 0
export class NegociacaoController {
    @DomInject('#data')
    private _inputData: JQuery

    @DomInject('#quantidade')
    private _inputQuantidade: JQuery

    @DomInject('#valor')
    private _inputValor: JQuery

    private _negociacoes = new Negociacoes()
    private _negociacoesView = new NegociacoesView('#negociacoesView', true)
    private _mensagemView = new MensagemView('#mensagemView')
    private _service = new NegociacaoService()


    constructor() {
        this._negociacoesView.update(this._negociacoes)
    }

    @Throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','))

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Somente negociações em dias úteis, por favor!')
            return
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseInt(this._inputValor.val())
        )

        this._negociacoes.adiciona(negociacao)
        imprime(negociacao, this._negociacoes)
        this._negociacoesView.update(this._negociacoes)

        this._mensagemView.update('Negociação adicionada com sucesso');

    }

    private _ehDiaUtil(data: Date) {
        return data.getDay() != DiaDaSemana.Sabado && data.getDay() != DiaDaSemana.Domingo
    }

    @Throttle()
    async importaDados() {

        try {

            const negociacoesParaImportar = await this._service
                .obterNegociacoes(res => {
                    if (res.ok) {
                        return res
                    } else {
                        throw new Error(res.statusText)
                    }
                })


            const negociacoesImportadas = this._negociacoes.paraArray()

            negociacoesParaImportar.filter(dado =>
                !negociacoesImportadas.some(jaImportada =>
                    dado.ehIgual(jaImportada)))

                .forEach(negociacao =>
                    this._negociacoes.adiciona(negociacao))
            this._negociacoesView.update(this._negociacoes)

        } catch (err) {
            this._mensagemView.update(err.message)
        }




    }
}

enum DiaDaSemana {
    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}