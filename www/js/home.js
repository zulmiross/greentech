fetch("js/backend.json")
    .then(resp => resp.json())
    .then(data => {
        // salvando dados no local storage 
        localStorage.setItem('produtos', JSON.stringify(data))
        console.log("Dados salvos em local storage com sucesso!")

        // simulando carregamento online 
        setTimeout(function() {
            // limpando tabela produtos 
            $("#produtos").empty();

            // recuperando dados de localstorage e exibindo no DOM 
            data.forEach(produto => {

                var produtosHTML = `
                    <!-- ITEM CARD  -->
                    <div class="item-card">
                        <a data-id="${produto.id}" href="#" class="item">
                            <div class="img-container">
                                <img class="img-fluid" src="${produto.imagem}" alt="">
                            </div>
                            <div class="name-rating">
                                <span class="color-gray">${produto.nome}</span>
                                <span style="font-size:12px" class="bold margin-right">
                                    <i class="mdi mdi-star"></i>${produto.rating}
                                </span>
                            </div>
                            <div class="price">
                                ${produto.preco_promocional.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'})}
                            </div>
                        </a>
                    </div>
                 `

                $("#produtos").append(produtosHTML)

            })

            $(".item").on('click', function() {
                var id = $(this).attr('data-id')
                console.log(id)
                localStorage.setItem("detalhe", id)
                app.views.main.router.navigate('/detalhes/')
            })


        }, 1000)









    })
    .catch(error => console.error("Nao foi possível carregar dados" + error))


setTimeout(function() {
    var contador_carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    $(".btn-cart").attr("data-count", contador_carrinho.length)
}, 300)