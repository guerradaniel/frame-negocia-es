export class Negociacao {

    constructor(
        readonly _data: Date,
        readonly _quantidade: number,
        readonly _valor: number
    ) { }

    get data() {
        return this._data
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }

    get volume() {
        return this._quantidade * this._valor
    }
}