fetch("js/backend.json")
    .then(resp => resp.json())
    .then(data => {
        // salvando dados no local storage 
        localStorage.setItem('produtos', JSON.stringify(data))
        console.log("Dados salvos em local storage com sucesso!")

        // limpan do tabela produtos 
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
                                R$ ${produto.preco_promocional}
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





    })
    .catch(error => console.error("Nao foi possível carregar dados" + error))