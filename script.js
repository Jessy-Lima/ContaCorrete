// 1.  Classe Cliente :

class Cliente {

    // Método construtor: executado quando criamos um novo cliente
    constructor(nome, cpf, agencia, conta) {

        // "this" representa o objeto que está sendo criado
        this.nome = nome; // Armazena o nome recebido
        this.cpf = cpf;
        this.agencia = agencia;
        this.conta = conta;
    }
}

// 2. Classe ContaCorrente:

class ContaCorrente {
    // Construtor recebe um cliente já criado
    constructor(cliente) {
        this.cliente = cliente; // Associa a conta a um cliente
        this.saldo = 0; // Inicia o saldo com 0
    }

    //2.1 Método para realizar depósito
    depositar(valor) {
        // Guarda o saldo antes da operação
        let saldoAnterior = this.saldo;

        // Soma o valor depositado ao saldo atual
        this.saldo += valor;

        // Retorna um "resumo" da operação (objeto)
        return {
            valor: valor, // Valor depositado
            saldoAnterior: saldoAnterior, // Saldo antes da operação
            saldoAtual: this.saldo, // Novo saldo após depósito
            tipo: "Depósito", // Tipo da operação
            data: new Date().toLocaleDateString(), // Data atual formatada
        };
    }
}

// 3. Função principal (executada ao clicar no botão)
function criarConta() {
    // Pega o valor digitado no input "nome" , assim para os demais
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let agencia = document.getElementById("agencia").value;
    let conta = document.getElementById("conta").value;

    // Converte o valor digitado para número (float)
    let valor = parseFloat(document.getElementById("valor").value);

    // 4. Criando objetos (instâncias das classes) :

    // Cria um objeto cliente com os dados digitados
    let cliente = new Cliente(nome, cpf, agencia, conta);

    // Cria uma conta vinculada ao cliente
    let contaCorrente = new ContaCorrente(cliente);

    // Executa o depósito e guarda o resultado
    let operacao = contaCorrente.depositar(valor);

    // 5.  Exibe o extrato na tela (dentro da div "extrato") :

    document.getElementById("extrato").innerText = `

  --------Dados do Cliente------
  Nome: ${cliente.nome}
  CPF: ${cliente.cpf}
  Agência: ${cliente.agencia}
  Conta: ${cliente.conta}


 --------Conta Corrente ----

 Tipo: ${operacao.tipo}
 Valor: ${operacao.valor}
 Data: ${operacao.data}
 Saldo anterior: ${operacao.saldoAnterior}
 Saldo atual : ${operacao.saldoAtual}

  Mensagem: Operação realizada com sucesso !

  `;


}