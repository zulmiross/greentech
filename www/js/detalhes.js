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
    $("#descricao-detalhe").html(item.descricao)
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))


    item.detalhes.forEach(detalhe => {
        var tabDetalhes = $("#tabdetalhes")
        var linha = `
        <tr>
            <td>${detalhe.caracteristica}</td>
            <td>${detalhe.detalhes}</td>
        </tr>
        `;

        tabDetalhes.append(linha)

    })

} else {
    console.log("Produto não encontrado")
}


// funcao adcionar item no carrinho

var carrinho = JSON.parse(localStorage.getItem('carrinho')) || []

function adicionarNoCarrinho(item, quantidade) {

    var itemNoCarrinho = carrinho.find(c => c.item.id === item.id)

    if (itemNoCarrinho) {
        // se item ja existe no carrinho entao basta somar 
        itemNoCarrinho.quantidade += quantidade;
        itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional
    } else {
        carrinho.push({
            item: item,
            quantidade: quantidade,
            total_item: quantidade * item.preco_promocional
        })
    }

    // atualizar carrinho 
    localStorage.setItem('carrinho', JSON.stringify(carrinho))

}


// clicou em adicionar ao carrinho
$(".add-cart").on('click', function() {
    // adicionado ao carrinho 
    adicionarNoCarrinho(item, 1);

    var toastMessage = app.toast.create({
        text: `${item.nome} foi adicionado ao carrinho`,
        position: 'center',
        closeTimeout: 2000,
    });

    toastMessage.open();

});