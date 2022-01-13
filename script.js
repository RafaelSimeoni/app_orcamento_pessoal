class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        if(localStorage.length == 0) {
            this.id = 0
        } else {
            this.id = Number(localStorage.getItem('Último id')) + 1
        }
    }
    gravarRegistros(despesa) {
        localStorage.setItem(this.id.toString(), JSON.stringify(despesa))
        localStorage.setItem("Último id", this.id)
        this.id++
    }

    recuperarRegistros() {
        let despesas = Array()
        for (let i = 0; i <= this.id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null) {
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }
}
let bd = new Bd()

function cadastrarDespesa() {
    const ano = document.querySelector('#ano')
    const mes = document.querySelector('#mes')
    const dia = document.querySelector('#dia')
    const tipo = document.querySelector('#tipo')
    const descricao = document.querySelector('#descricao')
    const valor = document.querySelector('#valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, 
        tipo.value, descricao.value, valor.value)

    if(despesa.validarDados()) {
        mostrarModal('sucesso')
        bd.gravarRegistros(despesa)
        limparCampos()
    } else {
        mostrarModal('erro')
    }
}

function limparCampos() {
    ano.value = '' 
    mes.value = '' 
    dia.value = ''
    tipo.value = ''
    descricao.value = '' 
    valor.value = ''
}

function mostrarModal(msg) {
    const modalTitulo = document.querySelector('#modal-titulo')
    const modalDescricao = document.querySelector('#modal-descricao')
    const modalBotao = document.querySelector('#modal-botao')
    
    if(msg === 'sucesso') {
        modalTitulo.className = 'modal-title text-success'
        modalTitulo.innerHTML = 'Sucesso'
        modalDescricao.innerHTML = 'A despesa foi cadastrada com sucesso!'
        modalBotao.className = 'btn btn-success'
        modalBotao.innerHTML = 'Voltar'
  
    } else if (msg === 'erro') {
        modalTitulo.className = 'modal-title text-danger'
        modalTitulo.innerHTML = 'Erro na gravação'
        modalDescricao.innerHTML = 'Existem campos obrigatórios que não foram preenchidos'
        modalBotao.className = 'btn btn-danger'
        modalBotao.innerHTML = 'Voltar e corrigir'
    }
    new bootstrap.Modal(document.querySelector('#modal-registra-despesa')).show()
}

function carregarDespesas() {
    let despesas = Array()
    despesas = bd.recuperarRegistros()

    //inserir dados na tabela:
    const tabela = document.querySelector('#corpo-tabela')

    despesas.forEach((d) => {
        let linha = tabela.insertRow()
        let dia = d.dia < 10 ? `0${d.dia}` : d.dia
        let mes = d.mes < 10 ? `0${d.mes}` : d.mes

        linha.insertCell(0).innerHTML = `${dia}/${mes}/${d.ano}`
        linha.insertCell(1).innerHTML = verificarTipo(d.tipo)
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

    function verificarTipo(tipo) {
        switch (tipo) {
            case '1': return 'Alimentacao'
            case '2': return 'Educacao';
            case '3': return 'Lazer' ;
            case '4': return 'Saúde';
            case '5': return 'Transporte';
        }
    }
} 