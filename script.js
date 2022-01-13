let id = 0

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
    recuperarRegistros() {
        let despesas = Array()
        let ultimoId = localStorage.getItem('Último id')
        for (let i = 0; i <= ultimoId; i++) {
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
        localStorage.setItem(id.toString(), JSON.stringify(despesa))
        localStorage.setItem("Último id", id)
        id++
    } else {
        mostrarModal('erro')
    }
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
    console.log(despesas)
}

