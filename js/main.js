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

    //Faz busca pelo nome: Percorre o array de elementos se encontra retorna o elemento
    const itemExist = itens.find(element => element.nome === nome.value)

    //Cria o objeto js:
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (itemExist) {
        //Se ele existe ele mantem o id
        itemAtual.id = itemExist.id;
        atualizarElementoHTML(itemAtual);

    } else {
        //Se elemento não é encontrado cria o elemto novo com o id do ultimo elemento
        itemAtual.id = itens.lengt;
        criarElementoHTML(itemAtual);
    }

    limparForm({ nome: nome, quantidade: quantidade });
})

/** Limpa os campos do form */
function limparForm({ nome, quantidade }) {
    nome.value = '';
    quantidade.value = '';
}

//Vai criar um novo item ali na pagina:
function criarElementoHTML(item) {

    console.log(item.nome);
    console.log(item.quantidade);

    //Criar este elemento html no js: <li class="item"><strong>7</strong>Camisas</li>
    //<li class="item">
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    //<strong>7</strong>
    const numeroItem = document.createElement('strong');
    numeroItem.dataset.id = item.id;//cria um atributo nomeado
    numeroItem.innerHTML = item.quantidade;

    //<li class="item"><strong>7</strong>
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    lista.appendChild(novoItem);

    addItemLocalStorage(item);
}

//Salva o novo item no local Storage : maximo até 5MB
function addItemLocalStorage(item) {

    //add novo item no array
    itens.push(item);

    //Sava o array convertendo o JOSON em string pois, local Storage só permite guardar string
    localStorage.setItem(localStName, JSON.stringify(itens));

}

function atualizarElementoHTML(item) {
    //Vai atualizar para a quantida de atual do item: 
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}


