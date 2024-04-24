var itensNoCarrinho = localStorage.getItem('carrinho')

if (itensNoCarrinho) {

    var carrinho = JSON.parse(itensNoCarrinho)
    console.log(carrinho)

    if (carrinho.length > 0) {
        // ITENS NO CARRINHO 
        // RENDERIZAR CARRINHO
        renderizarCarrinho();
        // SOMA O TOTAL DOS ITENS 
        totalCarrinho()

    } else {
        // CARRINHO VAZIO 
        carrinhoVazio()
    }

} else {
    //CARRINHO VAZIO
    carrinhoVazio()
}

function renderizarCarrinho() {

    $("#lista-carrinho").empty();
    $.each(carrinho, function(index, itemCarrinho) {
        var itemDiv = `
        
            <!-- ITEM CARRINHO  -->
            <div class="item-carrinho">
                <div class="area-img ">
                    <img src="${itemCarrinho.item.imagem}" alt>
                </div>
                <div class="area-details">
                    <div class="sup">
                        <span class="name-prod">${itemCarrinho.item.nome}</span>
                        <a data-index="${index}" class="delete-item" href="#">
                            <i class="mdi mdi-close"></i>
                        </a>
                    </div>
                    <div class="middle ">
                        <span>${itemCarrinho.item.principal_caracteristica}</span>
                    </div>
                    <div class="preco-qtde ">
                        <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                        <div class="count ">
                            <a href="#" class="minus" data-index="${index}">-</a>
                            <input readonly class="item-qtde " value="${itemCarrinho.quantidade}" type="text ">
                            <a href="#" class="plus" data-index="${index}">+</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $("#lista-carrinho").append(itemDiv);

    })

    $(".delete-item").on('click', function() {
        var index = $(this).data('index');
        // console.log(index)

        app.dialog.confirm("Deseja remover este item?", "REMOVER", function() {
            carrinho.splice(index, 1)
            localStorage.setItem('carrinho', JSON.stringify(carrinho))
            app.views.main.router.refreshPage()
        })
    })

    $(".minus").on('click', function() {
        var index = $(this).data('index');
        // console.log(index)
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
            carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            app.views.main.router.refreshPage();
        } else {
            var nomeItem = carrinho[index].item.nome;
            app.dialog.confirm(`Deseja remover o item <strong>${nomeItem}</strong>?`, "<strong><small>REMOVER</small></strong>", function() {
                carrinho.splice(index, 1);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
                app.views.main.router.refreshPage();
            })
        }
    })

    $(".plus").on('click', function() {
        var index = $(this).data('index');
        // console.log(index)       
        carrinho[index].quantidade++;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        app.views.main.router.refreshPage();

    })


}


function totalCarrinho() {
    var totalItems = 0;
    $.each(carrinho, function(index, itemCarrinho) {
        totalItems += itemCarrinho.total_item;
        $("#subtotal").html(totalItems.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
    })
}

function carrinhoVazio() {
    console.log("Carrinho está vazio");
    $("#lista-carrinho").empty();

    $("#lista-carrinho").html(`
        <div class="text-align-center">
            <img width="300" src="img/empty.gif" />
            <br><span class="color-gray">Carrinho vazio</span>
        </div>
    `);


    $("#toolbar-checkout").addClass('display-none')
    $("#toolbar-totais").addClass('display-none')

}

$("#esvaziar-carrinho").on('click', function() {
    app.dialog.confirm("Deseja esvaziar o carrinho?", "<strong><small>ESVAZIAR CARRINHO</small></strong>", function() {
        localStorage.removeItem('carrinho');
        app.views.main.router.refreshPage();
    })
})