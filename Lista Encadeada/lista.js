const readline = require('readline');

class No {
    constructor(valor, prioridade) {
        this.valor = valor;
        this.prioridade = prioridade;
        this.proximo = null;
        this.anterior = null;
    }
}

function inserirInicio(lista, num, prioridade) {
    const novo = new No(num, prioridade);
    if (lista) {
        novo.proximo = lista;
        lista.anterior = novo;
    }
    return novo;
}

function inserirFim(lista, num, prioridade) {
    const novo = new No(num, prioridade);
    if (!lista) {
        return novo;
    }
    let aux = lista;
    while (aux.proximo) {
        aux = aux.proximo;
    }
    aux.proximo = novo;
    novo.anterior = aux;
    return lista;
}

function inserirMeio(lista, num, prioridade, ant) {
    const novo = new No(num, prioridade);
    if (!lista) {
        return novo;
    }
    let aux = lista;
    while (aux && aux.valor !== ant) {
        aux = aux.proximo;
    }
    if (aux) {
        novo.proximo = aux.proximo;
        novo.anterior = aux;
        if (aux.proximo) {
            aux.proximo.anterior = novo;
        }
        aux.proximo = novo;
    } else {
        console.log("Elemento de referência não encontrado.");
    }
    return lista;
}

function inserirPorPrioridade(lista, num, prioridade) {
    const novo = new No(num, prioridade);
    if (!lista || prioridade < lista.prioridade) {
        novo.proximo = lista;
        if (lista) {
            lista.anterior = novo;
        }
        return novo;
    }
    let aux = lista;
    while (aux.proximo && prioridade >= aux.proximo.prioridade) {
        aux = aux.proximo;
    }
    novo.proximo = aux.proximo;
    novo.anterior = aux;
    if (aux.proximo) {
        aux.proximo.anterior = novo;
    }
    aux.proximo = novo;
    return lista;
}

function remover(lista, num) {
    if (!lista) {
        return null;
    }
    let aux = lista;
    let no = null;
    if (aux.valor === num) {
        no = aux;
        lista = aux.proximo;
        if (lista) {
            lista.anterior = null;
        }
    } else {
        while (aux.proximo && aux.proximo.valor !== num) {
            aux = aux.proximo;
        }
        if (aux.proximo) {
            no = aux.proximo;
            aux.proximo = no.proximo;
            if (aux.proximo) {
                aux.proximo.anterior = aux;
            }
        }
    }
    return no;
}

function buscar(lista, num) {
    let aux = lista;
    while (aux && aux.valor !== num) {
        aux = aux.proximo;
    }
    return aux;
}

function ultimo(lista) {
    let aux = lista;
    while (aux && aux.proximo) {
        aux = aux.proximo;
    }
    return aux;
}

function imprimirIF(lista) {
    let aux = lista;
    let output = "\nLista: ";
    while (aux) {
        output += `${aux.valor} `;
        aux = aux.proximo;
    }
    console.log(output + "\n");
}

function imprimirFI(lista) {
    let aux = ultimo(lista);
    let output = "\nLista: ";
    while (aux) {
        output += `${aux.valor} `;
        aux = aux.anterior;
    }
    console.log(output + "\n");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lista = null;

function menu() {
    console.log("\n0 - Sair\n1 - Inserir no início\n2 - Inserir no fim\n3 - Inserir no meio\n4 - Inserir por prioridade\n5 - Remover\n6 - Imprimir\n7 - Imprimir Invertida\n8 - Buscar\n");
    rl.question('Opção: ', (opcao) => {
        switch (parseInt(opcao)) {
            case 1:
                rl.question('Valor: ', (valor) => {
                    rl.question('Prioridade: ', (prioridade) => {
                        lista = inserirInicio(lista, parseInt(valor), parseInt(prioridade));
                        menu();
                    });
                });
                break;

            case 2:
                rl.question('Valor: ', (valor) => {
                    rl.question('Prioridade: ', (prioridade) => {
                        lista = inserirFim(lista, parseInt(valor), parseInt(prioridade));
                        menu();
                    });
                });
                break;

            case 3:
                rl.question('Valor a ser inserido: ', (valor) => {
                    rl.question('Prioridade: ', (prioridade) => {
                        rl.question('Valor de referência: ', (anterior) => {
                            lista = inserirMeio(lista, parseInt(valor), parseInt(prioridade), parseInt(anterior));
                            menu();
                        });
                    });
                });
                break;

            case 4:
                rl.question('Valor: ', (valor) => {
                    rl.question('Prioridade: ', (prioridade) => {
                        lista = inserirPorPrioridade(lista, parseInt(valor), parseInt(prioridade));
                        menu();
                    });
                });
                break;

            case 5:
                rl.question('Remover o valor: ', (valor) => {
                    const no = remover(lista, parseInt(valor));
                    if (no) {
                        console.log(`Elemento removido: ${no.valor}`);
                    } else {
                        console.log("Elemento não encontrado.");
                    }
                    menu();
                });
                break;

            case 6:
                imprimirIF(lista);
                menu();
                break;

            case 7:
                imprimirFI(lista);
                menu();
                break;

            case 8:
                rl.question('Buscar: ', (valor) => {
                    const no = buscar(lista, parseInt(valor));
                    if (no) {
                        console.log(`Elemento encontrado: ${no.valor}`);
                    } else {
                        console.log("Elemento não encontrado.");
                    }
                    menu();
                });
                break;

            case 0:
                console.log("Saindo...");
                rl.close();
                break;

            default:
                console.log("Opção inválida.");
                menu();
                break;
        }
    });
}

menu();
