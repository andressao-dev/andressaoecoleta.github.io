//código para selecionar estado e cidade//

function populateUFs() {
    const ufSelect = document.querySelector("select[name=state]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(resposta => resposta.json() )
    .then(states => {

        for (uf of states){
            ufSelect.innerHTML += `<option value ="${uf.id}">${uf.nome}</option>`
        }

    } )
}

populateUFs ()

function getCities (event){
    const citySelect = document.querySelector("select[name=city]")
    console.log(event.target.value)
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "" //limpa as cidades, para não concatenar cidades de estados diferentes
    citySelect.disabled = true; //bloqueia o conteúdo
    
    fetch (url)
    .then(resposta => resposta.json() )
    .then(cities => {

        for (const city of cities){
            citySelect.innerHTML += `<option value ="${city.id}">${city.nome}</option>` //preenche as cidades
        }

        citySelect.disabled = false; //habilita o conteúdo
})
}

document
.querySelector("select[name=state]")
.addEventListener("change", getCities)

//Itens de coleta

const itemsToCollect = document.querySelectorAll(".cards li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [] //array para armazenar os itens selecionados

function handleSelectedItem(event){
    //adicionar ou remover uma classe com Javascript
   const itemLi = event.target
   itemLi.classList.toggle("selected")
   const itemId = event.target.dataset.id

   //console.log(event.target.dataset.id) para aparecer os ids no console quando clica

    //verificar se tem itens selecionados
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId //verifica se o que tem clicado é o que tem no array
        return itemFound
    })

    //caso clicar em um selecionado, des-selecionar

    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems

    } else{//ao clicar em um normal, selecionar

        selectedItems.push(itemId)

    }

    collectedItems.value = selectedItems

    //atualizar o campo escondido com os itens selecionados

}