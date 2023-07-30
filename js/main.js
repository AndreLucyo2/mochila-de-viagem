//console.log(document.getElementById("novoItem"));
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');
//Array que representa uma "tabela" no local storage do navengador
const itens = [];


form.addEventListener('submit', (evento) => {
    //Intercepta e interrompe o comportamento padrão:
    evento.preventDefault();

    //Obtem os campos:
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    criarElementoHTML(nome.value, quantidade.value);

    addItemLocalStorage({ nome: nome.value, quantidade: quantidade.value });

    limparForm({ nome: nome, quantidade: quantidade });
})

/** Limpa os campos do form */
function limparForm({ nome, quantidade }) {
    nome.value = '';
    quantidade.value = '';
}

//Vai criar um novo item ali na pagina:
function criarElementoHTML(nome, quantidade) {

    console.log(nome);
    console.log(quantidade);

    //Criar este elemento html no js: <li class="item"><strong>7</strong>Camisas</li>
    //<li class="item">
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //<strong>7</strong>
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = quantidade;

    //<li class="item"><strong>7</strong>
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += nome;

    lista.appendChild(novoItem);
}

function addItemLocalStorage({ nome, quantidade }) {

    //Cria o objeto js:
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual);

    //Sava o array convertido em string: local Storage só permite guardar string
    localStorage.setItem('ITEM', JSON.stringify(itens));

}
