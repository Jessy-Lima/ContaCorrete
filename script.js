let contaCorrente = null;

// 1. Classe Cliente
class Cliente {
    constructor(nome, cpf, agencia, conta) {
        this.nome = nome;
        this.cpf = cpf;
        this.agencia = agencia;
        this.conta = conta;
    }
}

// 2. Classe ContaCorrente
class ContaCorrente {
    constructor(cliente) {
        this.cliente = cliente;
        this.saldo = 0;
    }

    depositar(valor) {
        let saldoAnterior = this.saldo;
        this.saldo += valor;

        return {
            valor: valor,
            saldoAnterior: saldoAnterior,
            saldoAtual: this.saldo,
            tipo: "Depósito",
            data: new Date().toLocaleDateString(),
        };
    }

    sacar(valor) {
        if (valor > this.saldo) {
            return {
                tipo: "Erro",
                mensagem: "Saldo insuficiente!"
            };
        }

        let saldoAnterior = this.saldo;
        this.saldo -= valor;

        return {
            valor: valor,
            saldoAnterior: saldoAnterior,
            saldoAtual: this.saldo,
            tipo: "Saque",
            data: new Date().toLocaleDateString(),
        };
    }
}

// 3. Função principal
function criarConta() {
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let agencia = document.getElementById("agencia").value;
    let conta = document.getElementById("conta").value;
    let valor = parseFloat(document.getElementById("valor").value);
    let tipo = document.getElementById("tipo").value;

    // Validação
    if (!nome || !cpf || !agencia || !conta || isNaN(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Criar conta apenas uma vez
    if (!contaCorrente) {
        let cliente = new Cliente(nome, cpf, agencia, conta);
        contaCorrente = new ContaCorrente(cliente);
    }

    let operacao;

    if (tipo === "deposito") {
        operacao = contaCorrente.depositar(valor);
    } else {
        operacao = contaCorrente.sacar(valor);
    }

    // Se der erro
    if (operacao.tipo === "Erro") {
        document.getElementById("extrato").innerText = operacao.mensagem;
        return;
    }

    // Exibir resultado
    document.getElementById("extrato").innerText = `

--------Dados do Cliente------
Nome: ${contaCorrente.cliente.nome}
CPF: ${contaCorrente.cliente.cpf}
Agência: ${contaCorrente.cliente.agencia}
Conta: ${contaCorrente.cliente.conta}

--------Conta Corrente----
Tipo: ${operacao.tipo}
Valor: ${operacao.valor}
Data: ${operacao.data}
Saldo anterior: ${operacao.saldoAnterior}
Saldo atual: ${operacao.saldoAtual}

Mensagem: Operação realizada com sucesso!
`;
}
