//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
document.addEventListener('deviceready', onDeviceReady, false);
var app = new Framework7({
    // App root element
    el: '#app',
    // App Name
    name: 'Green Tech',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: true,
    },
    dialog: {
        buttonOk: 'Sim',
        buttonCancel: 'Cancelar',
    },
    // Add default routes
    routes: [{
            path: '/home/',
            url: 'home.html',
            options: {
                transition: 'f7-cover-v'
            },
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida  
                    $("#menuToolbar").show("fast");
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    // fazer algo quando a página for inicializada
                    // app.views.main.router.navigate('/carrinho/')

                    $.getScript('js/home.js')
                    var swiper = new Swiper(".sliders", {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        autoplay: {
                            delay: 2000,
                        },
                        loop: true,
                        breakpoints: {
                            50: {
                                slidesPerView: 1,
                                spaceBetween: 30,
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            940: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            }
                        },
                    })
                    var swiper2 = new Swiper(".categorias", {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        // centeredSlides: true,
                        loop: false,
                        breakpoints: {
                            50: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            640: {
                                slidesPerView: 6,
                                spaceBetween: 15,
                            },
                            940: {
                                slidesPerView: 8,
                                spaceBetween: 15,
                            },
                            1200: {
                                slidesPerView: 10,
                                spaceBetween: 15,
                            }
                        },
                    })

                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
        {
            path: '/pesquisar/',
            url: 'pesquisar.html',
            animate: false,
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    // fazer algo quando a página for inicializada
                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
        {
            path: '/favoritos/',
            url: 'favoritos.html',
            animate: false,
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    // fazer algo quando a página for inicializada
                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
        {
            path: '/perfil/',
            url: 'perfil.html',
            animate: false,
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    // fazer algo quando a página for inicializada
                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
        {
            path: '/detalhes/',
            url: 'detalhes.html',
            animate: false,
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida
                    $("#menuToolbar").hide("fast");
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    $.getScript('js/detalhes.js')
                        // fazer algo quando a página for inicializada
                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
        {
            path: '/carrinho/',
            url: 'carrinho.html',
            options: {
                transition: 'f7-cover',
            },
            on: {
                pageBeforeIn: function(event, page) {
                    // fazer algo antes da página ser exibida
                    $("#menuToolbar").hide("fast");
                },
                pageAfterIn: function(event, page) {
                    // fazer algo depois da página ser exibida
                },
                pageInit: function(event, page) {
                    // fazer algo quando a página for inicializada
                    $.getScript('js/carrinho.js')
                },
                pageBeforeRemove: function(event, page) {
                    // fazer algo antes da página ser removida do DOM
                },
            }
        },
    ],
    // ... other parameters
});

//Para testes direto no navegador
var mainView = app.views.create('.view-main', { url: '/home/' });

//EVENTO PARA SABER O ITEM DO MENU ATUAL
app.on('routeChange', function(route) {
    var currentRoute = route.url;
    console.log(currentRoute);
    document.querySelectorAll('.tab-link').forEach(function(el) {
        el.classList.remove('active');
    });
    var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
    if (targetEl) {
        targetEl.classList.add('active');
    }
});


function onDeviceReady() {
    //Quando estiver rodando no celular
    var mainView = app.views.create('.view-main', { url: '/home/' });

    //COMANDO PARA "OUVIR" O BOTAO VOLTAR NATIVO DO ANDROID 	
    document.addEventListener("backbutton", function(e) {

        if (mainView.router.currentRoute.path === '/home/') {
            e.preventDefault();
            app.dialog.confirm('Deseja sair do aplicativo?', function() {
                navigator.app.exitApp();
            });
        } else {
            e.preventDefault();
            mainView.router.back({ force: true });
        }
    }, false);

}