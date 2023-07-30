//console.log(document.getElementById("novoItem"));
const form = document.getElementById("novoItem");

form.addEventListener('submit', (evento) => {
    //interrompe o comportamento padrão:
    evento.preventDefault();

    //obtem o objeto do evento:
    console.log(evento);

    //obtendo o array de elementos e seus valores pela posição: 
    console.log(evento.target[0].value);
    console.log(evento.target[1].value);

    //obtendo o array de elementos e seus nomes : 
    console.log(evento.target.elements['nome'].value);
    console.log(evento.target.elements['quantidade'].value);

})