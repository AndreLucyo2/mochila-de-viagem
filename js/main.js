//console.log(document.getElementById("novoItem"));
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
//Array que representa uma "tabela" no local storage do navengador
const localStName = 'ITENS';
//Obtem os dados salvos no local storage converte de string para JSON
const itens = JSON.parse(localStorage.getItem(localStName)) || [];

//cira os teins ao carregar a pagina:
itens.forEach(element => {
    criarElementoHTML(element);
});

form.addEventListener('submit', (evento) => {
    //Intercepta e interrompe o comportamento padrão:
    evento.preventDefault();

    //Obtem os campos:
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //Faz busca pelo nome: Percorre o array de elementos se encontrar retorna o elemento
    const itemExist = itens.find(element => element.nome === nome.value)

    //Cria o objeto js:
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //Valida se esta criando ou atualizando:
    if (itemExist) {
        //Se ele existe ele mantem o id
        itemAtual.id = itemExist.id;

        atualizarElementoHTML(itemAtual);

        //Atualiza item do array: sobrescreve totalmente o item na posição
        itens[itens.findIndex(element => element.id === itemExist.id)] = itemAtual;

    } else {
        //Se elemento não é encontrado cria o elemto novo com o id do ultimo elemento
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0; //verifica se o array esta vazio, caso nao estiver, obtem o ultimo id e somar mais um

        criarElementoHTML(itemAtual);

        //add novo item no array
        itens.push(itemAtual);

    }

    //salva na memoria do navegador: array atualizado
    setItensLocalStorage(itens);

    //Limpa o form
    limparForm({ nome: nome, quantidade: quantidade });
})

/** Limpa os campos do form */
function limparForm({ nome, quantidade }) {
    nome.value = '';
    quantidade.value = '';
}

//Vai criar um novo item ali na pagina:
function criarElementoHTML(item) {
    //Criar este elemento html no js: <li class="item"><strong>7</strong>Camisas</li>
    //<li class="item">
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //<strong>7</strong>
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;//cria um atributo nomeado

    //<li class="item"><strong>7</strong>
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    //adiciona o elemento botao de deletar: informa o id do item a ser removido
    novoItem.appendChild(criarBotaoDeletarById(item.id));

    //adiciona o elemento como filho da lista:
    lista.appendChild(novoItem);
}

function atualizarElementoHTML(item) {
    //Vai atualizar para a quantida de atual do item: já atualiza o dataSet
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

//Salva todo o array no local Storage : maximo até 5MB
function setItensLocalStorage(arrItens) {
    //Sava o array convertendo o JOSON em string pois, local Storage só permite guardar string
    localStorage.setItem(localStName, JSON.stringify(arrItens));
}

function criarBotaoDeletarById(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = "X";

    //criar o eventlistner: precisa passar uma funsão para poder usar as propriedades do proprio elemento
    elementoBotao.addEventListener('click', function () {
        //remove o elemento html da pagina
        deletaElemento(this.parentNode, id);
    });

    return elementoBotao;
}

function deletaElemento(tagHtml, id) {
    tagHtml.remove();

    //remover o item do array
    console.log(id);

    //romove o elemento pelo id:    
    itens.splice(itens.findIndex(element => element.id === id), 1);

    //atualizar o localstorage
    setItensLocalStorage(itens);
}


