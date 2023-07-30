//console.log(document.getElementById("novoItem"));
const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');

form.addEventListener('submit', (evento) => {
    //Intercepta e interrompe o comportamento padrão:
    evento.preventDefault();

    //obtem o objeto do evento:
    // console.log(evento);

    //obtendo o array de elementos e seus valores pela posição: 
    // console.log(evento.target[0].value);
    // console.log(evento.target[1].value);

    //obtendo o array de elementos e seus nomes : 
    // console.log(evento.target.elements['nome'].value);
    // console.log(evento.target.elements['quantidade'].value);

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    criarElemento(nome.value, quantidade.value);
    limparForm({nome:nome,quantidade:quantidade});
})

/** Limpa os campos do form */
function limparForm({ nome, quantidade }) {
    nome.value = '';
    quantidade.value = '';
}

//Vai criar um novo item ali na pagina:
function criarElemento(nome, quantidade) {

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

    //console.log(novoItem);

    lista.appendChild(novoItem);
}
