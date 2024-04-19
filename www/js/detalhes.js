var id = parseInt(localStorage.getItem('detalhe'))

var produtos = JSON.parse(localStorage.getItem('produtos'))

var item = produtos.find(produto => produto.id === id)

if (item) {
    console.log("item: ", item)

    $("#imagem-detalhe").attr('src', item.imagem)
    $("#nome-detalhe").html(item.nome)
    $("#rating-detalhe").html(item.rating)
    $("#reviews-detalhe").html(item.reviews != 1 ? item.reviews + " visualizações" : item.reviews + " visualização")
    $("#likes-detalhe").html(item.likes)






} else {
    console.log("Produto não encontrado")
}