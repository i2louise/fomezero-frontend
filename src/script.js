/* ── State ── */
let currentScreen = 'splash';
let onboardingSlide = 0;

const onboardingData = [
  { emoji:'🍕', bgClass:'slide-bg-0', icon:'🗺️', title:'Descubra Restaurantes', desc:'Encontre os melhores restaurantes perto de você com avaliações reais e cardápios completos.', btn:'Próximo' },
  { emoji:'🍨', bgClass:'slide-bg-1', icon:'⭐', title:'Avalie Seus Lugares Favoritos', desc:'Compartilhe sua experiência e ajude outros a descobrir os melhores sabores da cidade.', btn:'Começar' },
];

/* ── Restaurant data for simulation ── */
const restaurantData = {
  lanche: [
    { name:'Burguer House', emoji:'🍔', bg:'linear-gradient(160deg,#FFF0E8,#FFDDC8)', rating:'⭐ 5.0', items:[
      {emoji:'🍔',name:'X-Burguer Especial',price:28.90},{emoji:'🍟',name:'Batata Frita Grande',price:12.90},{emoji:'🥤',name:'Refrigerante 500ml',price:7.90},{emoji:'🧅',name:'Onion Rings',price:14.90}
    ]},
    { name:'Restaurante Mexicano', emoji:'🌮', bg:'linear-gradient(160deg,#ffecd2,#fcb69f)', rating:'⭐ 4.9', items:[
      {emoji:'🌮',name:'Taco Tradicional',price:22.90},{emoji:'🫔',name:'Burrito Especial',price:35.90},{emoji:'🥑',name:'Nachos + Guacamole',price:32.90},{emoji:'🫙',name:'Pico de Gallo',price:7.90}
    ]},
    { name:'Sanduíche Gourmet', emoji:'🥪', bg:'linear-gradient(160deg,#ffe8cc,#ffa07a)', rating:'⭐ 4.7', items:[
      {emoji:'🥪',name:'Club Sandwich',price:24.90},{emoji:'🥓',name:'BLT Especial',price:22.90},{emoji:'🧀',name:'Queijo Quente Premium',price:18.90}
    ]},
  ],
  almoco: [
    { name:'Casa do Strogonoff', emoji:'🥘', bg:'linear-gradient(160deg,#ffd89b,#19547b)', rating:'⭐ 4.8', items:[
      {emoji:'🍗',name:'Strogonoff de Frango',price:38.90},{emoji:'🥩',name:'Strogonoff de Carne',price:44.90},{emoji:'🍚',name:'Arroz + Feijão',price:8.90},{emoji:'🥔',name:'Batata Palha',price:5.90}
    ]},
    { name:'La Cucina Italiana', emoji:'🍝', bg:'linear-gradient(160deg,#e0c3fc,#8ec5fc)', rating:'⭐ 5.0', items:[
      {emoji:'🍝',name:'Espaguete à Bolonhesa',price:45.90},{emoji:'🫕',name:'Lasanha Tradicional',price:52.90},{emoji:'🍕',name:'Pizza Margherita',price:48.90},{emoji:'🥗',name:'Salada Caesar',price:22.90}
    ]},
    { name:'Comida Chinesa', emoji:'🍜', bg:'linear-gradient(160deg,#ffecd2,#fcb69f)', rating:'⭐ 4.8', items:[
      {emoji:'🍜',name:'Yakisoba de Frango',price:32.90},{emoji:'🥟',name:'Rolinho Primavera (6un)',price:18.90},{emoji:'🍗',name:'Frango Xadrez',price:38.90},{emoji:'🍚',name:'Arroz Chop Suey',price:28.90}
    ]},
  ],
  vegana: [
    { name:'Verde Vida', emoji:'🥗', bg:'linear-gradient(160deg,#E8F5E9,#C8E6C9)', rating:'⭐ 4.9', items:[
      {emoji:'🥗',name:'Bowl Vegano Completo',price:35.90},{emoji:'🌱',name:'Salada Proteica',price:28.90},{emoji:'🥑',name:'Toast de Abacate',price:22.90},{emoji:'🧃',name:'Suco Detox',price:14.90}
    ]},
    { name:'Naturalis', emoji:'🥦', bg:'linear-gradient(160deg,#a8edea,#fed6e3)', rating:'⭐ 4.7', items:[
      {emoji:'🥦',name:'Strogonoff Vegano',price:38.90},{emoji:'🌽',name:'Hamburguer de Grão-de-bico',price:32.90},{emoji:'🫛',name:'Wrap Vegetal',price:26.90}
    ]},
  ],
  doces: [
    { name:'Doce Encanto', emoji:'🍰', bg:'linear-gradient(160deg,#a8edea,#fed6e3)', rating:'⭐ 5.0', items:[
      {emoji:'🍰',name:'Torta de Limão',price:18.90},{emoji:'🍮',name:'Pudim Tradicional',price:12.90},{emoji:'🎂',name:'Bolo de Chocolate',price:15.90},{emoji:'🍩',name:'Sonho Recheado',price:8.90}
    ]},
    { name:'Cupcake Studio', emoji:'🧁', bg:'linear-gradient(160deg,#ffd6e7,#ffb3c6)', rating:'⭐ 4.8', items:[
      {emoji:'🧁',name:'Cupcake Red Velvet',price:12.90},{emoji:'🍫',name:'Brigadeiro Gourmet (6un)',price:22.90},{emoji:'🍬',name:'Trufa de Chocolate',price:16.90}
    ]},
  ],
  drinks: [
    { name:'Juice Bar', emoji:'🥤', bg:'linear-gradient(160deg,#ffecd2,#fcb69f)', rating:'⭐ 4.9', items:[
      {emoji:'🍊',name:'Suco de Laranja Natural',price:12.90},{emoji:'🍹',name:'Smoothie Tropical',price:18.90},{emoji:'🥝',name:'Vitamina Verde',price:15.90},{emoji:'🫐',name:'Açaí 300ml',price:22.90}
    ]},
    { name:'Shake & Co', emoji:'🧃', bg:'linear-gradient(160deg,#cce5ff,#99caff)', rating:'⭐ 4.6', items:[
      {emoji:'🥛',name:'Milkshake de Chocolate',price:19.90},{emoji:'🍦',name:'Sorvete Duplo',price:14.90},{emoji:'🧊',name:'Frappé Especial',price:22.90}
    ]},
  ],
};

let simQtys = [];

const API_BASE_URL = 'http://localhost:8080/api';

const API_AVALIACOES = `${API_BASE_URL}/avaliacoes`;
const API_USUARIOS = `${API_BASE_URL}/usuarios`;

let restauranteAvaliacaoAtual = null;
let notaSelecionada = 0;

/* ── Navigation ── */
function goTo(id) {
  document.getElementById(currentScreen).classList.remove('active');
  currentScreen = id;
  const el = document.getElementById(id);
  el.style.transform = 'translateX(30px)';
  el.classList.add('active');
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    el.style.transform  = '';
  });
}

/* ── Onboarding ── */
function nextSlide() {
  if (onboardingSlide === 0) {
    onboardingSlide = 1;
    applySlide(onboardingData[1]);
    document.getElementById('dot0').className = 'dot done';
    document.getElementById('dot1').className = 'dot active';
  } else {
    goTo('login');
    onboardingSlide = 0;
    setTimeout(() => {
      applySlide(onboardingData[0]);
      document.getElementById('dot0').className = 'dot active';
      document.getElementById('dot1').className = 'dot';
    }, 500);
  }
}

function applySlide(data) {
  document.getElementById('onboarding-emoji').textContent = data.emoji;
  document.getElementById('onboarding-img').className     = 'onboarding-img-placeholder ' + data.bgClass;
  document.getElementById('onboarding-icon').textContent  = data.icon;
  document.getElementById('onboarding-title').textContent = data.title;
  document.getElementById('onboarding-desc').textContent  = data.desc;
  document.getElementById('next-btn').textContent         = data.btn;
}

/* ── Forms ── */
function togglePwd(id) {
  const el = document.getElementById(id);
  el.type = el.type === 'password' ? 'text' : 'password';
}

async function cadastrarUsuario() {
    const nome =
        document.getElementById('signup-nome').value.trim();

    const email =
        document.getElementById('signup-email').value.trim();

    const senha =
        document.getElementById('signup-pwd').value;

    const telefone =
        document.getElementById('signup-telefone').value.trim();

    const dataNascimento =
        document.getElementById('signup-nascimento').value;

    const mensagem =
        document.getElementById('signup-mensagem');

    const botao =
        document.getElementById('signup-button');

    mensagem.textContent = '';
    mensagem.className = 'form-message';

    if (!nome || !email || !senha) {
        mostrarMensagemCadastro(
            'Preencha nome, e-mail e senha.',
            'erro'
        );
        return;
    }

    if (senha.length < 6) {
        mostrarMensagemCadastro(
            'A senha deve possuir pelo menos 6 caracteres.',
            'erro'
        );
        return;
    }

    const usuario = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone || null,
        dataNascimento: dataNascimento || null
    };

    try {
        botao.disabled = true;
        botao.textContent = 'Cadastrando...';

        const resposta = await fetch(API_USUARIOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!resposta.ok) {
            const erro = await resposta.text();

            mostrarMensagemCadastro(
                erro || 'Não foi possível realizar o cadastro.',
                'erro'
            );

            return;
        }

        const usuarioCadastrado = await resposta.json();

        sessionStorage.setItem(
            'usuario',
            JSON.stringify(usuarioCadastrado)
        );

        mostrarMensagemCadastro(
            'Cadastro realizado com sucesso!',
            'sucesso'
        );

        limparFormularioCadastro();

        setTimeout(() => {
            goTo('login');
        }, 1200);

    } catch (erro) {
        console.error('Erro ao cadastrar usuário:', erro);

        mostrarMensagemCadastro(
            'Não foi possível conectar ao backend.',
            'erro'
        );

    } finally {
        botao.disabled = false;
        botao.textContent = 'Registrar';
    }
}

function mostrarMensagemCadastro(texto, tipo) {
    const mensagem =
        document.getElementById('signup-mensagem');

    mensagem.textContent = texto;
    mensagem.className = `form-message ${tipo}`;
}

function limparFormularioCadastro() {
    document.getElementById('signup-nome').value = '';
    document.getElementById('signup-email').value = '';
    document.getElementById('signup-pwd').value = '';
    document.getElementById('signup-telefone').value = '';
    document.getElementById('signup-nascimento').value = '';
}

/* ── Home categories ── */
function selectCat(el, catKey) {
  document.querySelectorAll('.cat-item').forEach(e => e.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.cat-section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-' + catKey).classList.add('active');
}

/* ── Bottom nav ── */
function setNav(btn) {
  btn.closest('.bottom-nav').querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

/* ── Filter ── */
let filterBestRated = false;
let filtroPrecoMaximo = null;

function toggleFilterCat(el) { el.classList.toggle('active'); }
function toggleChip(el) { el.classList.toggle('active'); }

function toggleBestRated() {
  filterBestRated = !filterBestRated;
  const box   = document.getElementById('best-rated-box');
  const label = box.closest('.filter-checkbox-label');
  box.classList.toggle('checked', filterBestRated);
  label.classList.toggle('checked', filterBestRated);
}

function updateSlider(el) {
    const valor = Number(el.value);
    const minimo = Number(el.min);
    const maximo = Number(el.max);

    const porcentagem =
        ((valor - minimo) / (maximo - minimo)) * 100;

    el.style.background = `
        linear-gradient(
            to right,
            var(--orange) 0%,
            var(--orange) ${porcentagem}%,
            #ddd ${porcentagem}%,
            #ddd 100%
        )
    `;

    const elementoValor =
        document.getElementById('price-current-value');

    elementoValor.textContent = valor.toLocaleString(
        'pt-BR',
        {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0
        }
    );
}

function applyFilter() {
    const catMap = {
        'Snacks': 'lanche',
        'Almoço': 'almoco',
        'Vegano': 'vegana',
        'Doces': 'doces',
        'Drinks': 'drinks'
    };

    // Armazena todas as categorias selecionadas.
    const activeCats = [];

    document
        .querySelectorAll(
            '.filter-cat.active .filter-cat-label'
        )
        .forEach(elemento => {
            const categoria =
                catMap[elemento.textContent.trim()];

            if (categoria) {
                activeCats.push(categoria);
            }
        });

    const slider =
        document.getElementById('price-slider');

    const maxPrice =
        parseInt(slider.value);

    // Mantém o preço para filtrar os itens do cardápio.
    filtroPrecoMaximo = maxPrice;

    const activeChips = [];

    document
        .querySelectorAll('.chip.active')
        .forEach(elemento => {
            activeChips.push(
                elemento.textContent.trim().toLowerCase()
            );
        });

    let totalVisible = 0;

    const allSections = [
        'lanche',
        'almoco',
        'vegana',
        'doces',
        'drinks'
    ];

    allSections.forEach(categoria => {
        const section =
            document.getElementById(
                'sec-' + categoria
            );

        const cards =
            section.querySelectorAll(
                '.restaurant-item'
            );

        let sectionVisible = 0;

        /*
         * Se nenhuma categoria estiver marcada,
         * todas serão consideradas selecionadas.
         */
        const categoriaSelecionada =
            activeCats.length === 0 ||
            activeCats.includes(categoria);

        cards.forEach((card, indice) => {
            const restaurante =
                restaurantData[categoria][indice];

            if (!restaurante) {
                return;
            }

            // Esconde restaurantes de categorias não marcadas.
            if (!categoriaSelecionada) {
                card.style.display = 'none';
                return;
            }

            /*
             * O restaurante aparece se possuir pelo menos
             * um item dentro do preço selecionado.
             */
            const possuiItemNoPreco =
                restaurante.items.some(
                    item => item.price <= maxPrice
                );

            if (!possuiItemNoPreco) {
                card.style.display = 'none';
                return;
            }

            // Aplica os chips adicionais, caso existam.
            if (activeChips.length > 0) {
                const textoPesquisa = (
                    restaurante.name +
                    ' ' +
                    restaurante.items
                        .map(item => item.name)
                        .join(' ')
                ).toLowerCase();

                const correspondeAChip =
                    activeChips.some(chip =>
                        textoPesquisa.includes(chip)
                    );

                if (!correspondeAChip) {
                    card.style.display = 'none';
                    return;
                }
            }

            card.style.display = '';
            sectionVisible++;
            totalVisible++;
        });

        // Ordena os cards visíveis pela avaliação.
        if (
            filterBestRated &&
            sectionVisible > 0
        ) {
            const lista =
                section.querySelector(
                    '.restaurant-list'
                );

            const cardsOrdenados =
                Array.from(
                    lista.querySelectorAll(
                        '.restaurant-item'
                    )
                );

            cardsOrdenados.sort((cardA, cardB) => {
                const obterAvaliacao = elemento => {
                    const texto = elemento
                        .querySelector(
                            '.restaurant-item-rating'
                        )
                        .textContent;

                    const numero =
                        texto.match(/[\d.]+/);

                    return numero
                        ? parseFloat(numero[0])
                        : 0;
                };

                return (
                    obterAvaliacao(cardB) -
                    obterAvaliacao(cardA)
                );
            });

            cardsOrdenados.forEach(card => {
                lista.appendChild(card);
            });
        }

        /*
         * Esta é a correção principal:
         * todas as seções selecionadas recebem "active".
         */
        const deveMostrarSecao =
            categoriaSelecionada &&
            sectionVisible > 0;

        section.classList.toggle(
            'active',
            deveMostrarSecao
        );

        section.style.display =
            deveMostrarSecao ? '' : 'none';
    });

    /*
     * Marca no menu principal todas as categorias
     * selecionadas, e não somente a primeira.
     */
    const categoriasParaMostrar =
        activeCats.length > 0
            ? activeCats
            : allSections;

    document
        .querySelectorAll('.cat-item')
        .forEach(elemento => {
            const label = elemento
                .querySelector('.cat-label')
                .textContent
                .trim();

            const categoria = {
                'Lanche': 'lanche',
                'Almoço': 'almoco',
                'Vegana': 'vegana',
                'Doces': 'doces',
                'Drinks': 'drinks'
            }[label];

            elemento.classList.toggle(
                'active',
                categoriasParaMostrar.includes(
                    categoria
                )
            );
        });

    const partesFiltro = [];

    if (activeCats.length > 0) {
        const nomesCategorias = {
            lanche: 'Lanches',
            almoco: 'Almoço',
            vegana: 'Vegana',
            doces: 'Doces',
            drinks: 'Drinks'
        };

        partesFiltro.push(
            activeCats
                .map(categoria =>
                    nomesCategorias[categoria]
                )
                .join(', ')
        );
    }

    if (maxPrice < 100) {
        partesFiltro.push(
            'até R$' + maxPrice
        );
    }

    if (filterBestRated) {
        partesFiltro.push(
            'melhor avaliados'
        );
    }

    const banner =
        document.getElementById(
            'filter-banner'
        );

    const bannerText =
        document.getElementById(
            'filter-banner-text'
        );

    if (totalVisible === 0) {
        bannerText.textContent =
            'Nenhum restaurante encontrado com esses filtros';
    } else {
        bannerText.textContent =
            partesFiltro.length > 0
                ? '🔍 Filtro: ' +
                  partesFiltro.join(' · ')
                : '🔍 Todas as categorias';
    }

    banner.classList.add('visible');

    goTo('home');
}

function clearFilter() {
  filtroPrecoMaximo = null;

  document.querySelectorAll('.restaurant-item').forEach(el => el.style.display = '');
  document.querySelectorAll('.cat-section').forEach(s => s.style.display = '');

  document.querySelectorAll('.cat-section').forEach(s => s.classList.remove('active'));
  document.getElementById('sec-lanche').classList.add('active');
  document.querySelectorAll('.cat-item').forEach((el, i) => el.classList.toggle('active', i === 0));

  document.getElementById('filter-banner').classList.remove('visible');

  filterBestRated = false;
  const box = document.getElementById('best-rated-box');
  if (box) { box.classList.remove('checked'); box.closest('.filter-checkbox-label').classList.remove('checked'); }
  document.getElementById('price-slider').value = 100;
  updateSlider(document.getElementById('price-slider'));
  document.querySelectorAll('.filter-cat').forEach((el, i) => el.classList.toggle('active', i === 0));
  document.querySelectorAll('.chip').forEach(el => el.classList.remove('active'));
}

/* ── Misc ── */
function bounce(el) {
  el.style.transform = 'scale(0.96)';
  setTimeout(() => el.style.transform = '', 150);
}

/* ── Panels ── */
function openNotifPanel() {
  document.getElementById('notif-panel').classList.add('open');
  document.getElementById('panel-overlay').classList.add('open');
}
function openUserPanel() {
  document.getElementById('user-panel').classList.add('open');
  document.getElementById('panel-overlay').classList.add('open');
}
function closePanels() {
  document.getElementById('notif-panel').classList.remove('open');
  document.getElementById('user-panel').classList.remove('open');
  document.getElementById('panel-overlay').classList.remove('open');
}

/* ── Restaurant Modal ── */
function openRestModal(cat, idx) {
    const rest = restaurantData[cat][idx];

    const itensFiltrados = filtroPrecoMaximo === null
        ? rest.items
        : rest.items.filter(
                item => item.price <= filtroPrecoMaximo
        );

    restauranteAvaliacaoAtual = rest.name;
    notaSelecionada = 0;

    document.getElementById('modal-rest-name').textContent =
        rest.name;

    document.getElementById('modal-rest-img').style.background =
        rest.bg;

    document.getElementById('modal-rest-img').textContent =
        rest.emoji;

    document.getElementById('modal-rest-rating').textContent =
        'Carregando avaliações...';

    document.getElementById('review-rest-name').textContent =
        rest.name;

    document.getElementById('review-form')
        .classList.remove('visible');

    document.getElementById('reviews-section')
        .classList.add('visible');

    atualizarEstrelas();

    simQtys = itensFiltrados.map(() => 0);

    const list = document.getElementById('sim-items-list');

    const tituloCardapio =
        document.getElementById('menu-price-filter-info');

    if (tituloCardapio) {
        tituloCardapio.textContent =
                filtroPrecoMaximo === null
                        ? ''
                        : `Exibindo itens de até R$ ${filtroPrecoMaximo}`;
    }

    list.innerHTML = itensFiltrados.map((item, i) => `
        <div class="sim-item">
            <div class="sim-item-emoji">${item.emoji}</div>

            <div class="sim-item-info">
                <div class="sim-item-name">${item.name}</div>

                <div class="sim-item-price">
                    R$${item.price.toFixed(2).replace('.', ',')}
                </div>
            </div>

            <div class="sim-item-qty">
                <button
                    class="qty-btn"
                    onclick="changeQty(
                        ${i},
                        -1,
                        ${JSON.stringify(itensFiltrados)
                            .replace(/"/g, '&quot;')}
                    )"
                >
                    −
                </button>

                <span class="qty-num" id="qty-${i}">0</span>

                <button
                    class="qty-btn"
                    onclick="changeQty(
                        ${i},
                        1,
                        ${JSON.stringify(rest.items)
                            .replace(/"/g, '&quot;')}
                    )"
                >
                    +
                </button>
            </div>
        </div>
    `).join('');

    updateSimTotal(itensFiltrados);

    document.getElementById('rest-modal')
        .classList.add('open');

    carregarResumoAvaliacao();
    carregarAvaliacoes();
}

function changeQty(i, delta, items) {
  simQtys[i] = Math.max(0, simQtys[i] + delta);
  document.getElementById('qty-' + i).textContent = simQtys[i];
  updateSimTotal(items);
}

function updateSimTotal(items) {
  const total = simQtys.reduce((acc, q, i) => acc + q * items[i].price, 0);
  document.getElementById('sim-total-val').textContent = 'R$' + total.toFixed(2).replace('.', ',');
}

function closeModal() {
  document.getElementById('rest-modal').classList.remove('open');
}

function abrirFormularioAvaliacao() {
    document.getElementById('review-form').classList.add('visible');
}

function fecharFormularioAvaliacao() {
    document.getElementById('review-form').classList.remove('visible');
}

function selecionarNota(nota) {
    notaSelecionada = nota;
    atualizarEstrelas();
}

function atualizarEstrelas() {
    const botoes = document.querySelectorAll('#review-stars button');

    botoes.forEach((botao, indice) => {
        botao.textContent = indice < notaSelecionada ? '★' : '☆';
        botao.classList.toggle(
            'selected',
            indice < notaSelecionada
        );
    });
}

async function publicarAvaliacao() {
    const mensagem = document.getElementById('review-message');
    const comentario =
            document.getElementById('review-comment').value.trim();

    if (notaSelecionada === 0) {
        mensagem.textContent = 'Selecione uma nota de 1 a 5.';
        return;
    }

    const usuarioAtual = obterUsuarioAtual();

    const avaliacao = {
        restaurante: restauranteAvaliacaoAtual,
        usuarioNome: usuarioAtual.nome,
        usuarioEmail: usuarioAtual.email,
        nota: notaSelecionada,
        comentario: comentario
    };

    try {
        const resposta = await fetch(API_AVALIACOES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliacao)
        });

        if (!resposta.ok) {
            mensagem.textContent = await resposta.text();
            return;
        }

        mensagem.textContent = 'Avaliação publicada!';
        document.getElementById('review-comment').value = '';

        await carregarResumoAvaliacao();
        await carregarAvaliacoes();

        setTimeout(fecharFormularioAvaliacao, 800);
    } catch (erro) {
        console.error(erro);
        mensagem.textContent = 'Não foi possível conectar ao servidor.';
    }
}

async function carregarResumoAvaliacao() {
    const nome = encodeURIComponent(restauranteAvaliacaoAtual);
    const elementoNota =
        document.getElementById('modal-rest-rating');

    try {
        const resposta = await fetch(
            `${API_AVALIACOES}/restaurante/${nome}/media`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao carregar resumo');
        }

        const resumo = await resposta.json();

        const quantidade = resumo.quantidade;
        const botaoAvaliacoes =
          document.getElementById('show-reviews-button');

        botaoAvaliacoes.textContent =
            `Ver avaliações (${quantidade})`;

        const textoAvaliacoes =
            quantidade === 1 ? 'avaliação' : 'avaliações';

        if (quantidade === 0) {
            elementoNota.textContent = 'Ainda sem avaliações';
            return;
        }

        elementoNota.textContent =
            `⭐ ${resumo.media.toFixed(1)} · ` +
            `${quantidade} ${textoAvaliacoes}`;

    } catch (erro) {
        console.error(erro);
        elementoNota.textContent =
            'Não foi possível carregar as avaliações';
    }
}

async function alternarAvaliacoes() {
    const secao = document.getElementById('reviews-section');
    secao.classList.toggle('visible');

    if (secao.classList.contains('visible')) {
        await carregarAvaliacoes();
    }
}

async function carregarAvaliacoes() {
    const nome = encodeURIComponent(restauranteAvaliacaoAtual);
    const lista = document.getElementById('reviews-list');

    lista.innerHTML =
        '<div class="reviews-empty">Carregando avaliações...</div>';

    try {
        const resposta = await fetch(
            `${API_AVALIACOES}/restaurante/${nome}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao carregar avaliações');
        }

        const avaliacoes = await resposta.json();

        if (avaliacoes.length === 0) {
            lista.innerHTML = `
                <div class="reviews-empty">
                    Este restaurante ainda não possui avaliações.
                    Seja a primeira pessoa a avaliar!
                </div>
            `;
            return;
        }

        lista.innerHTML = avaliacoes.map(avaliacao => {
            const data = new Date(avaliacao.data)
                .toLocaleDateString('pt-BR');

            const estrelasPreenchidas =
                '★'.repeat(avaliacao.nota);

            const estrelasVazias =
                '☆'.repeat(5 - avaliacao.nota);

            return `
                <div class="review-item">
                    <div class="review-item-header">
                        <div class="review-user">
                            <div class="review-avatar">
                                ${obterIniciais(avaliacao.usuarioNome)}
                            </div>

                            <div>
                                <strong>${avaliacao.usuarioNome}</strong>
                                <div class="review-item-date">${data}</div>
                            </div>
                        </div>

                        <div class="review-item-stars">
                            ${estrelasPreenchidas}${estrelasVazias}
                        </div>
                    </div>

                    <div class="review-item-comment">
                        ${avaliacao.comentario || 'Sem comentário.'}
                    </div>
                </div>
            `;
        }).join('');

    } catch (erro) {
        console.error(erro);

        lista.innerHTML = `
            <div class="reviews-empty">
                Não foi possível carregar as avaliações.
            </div>
        `;
    }
}

function obterUsuarioAtual() {
    const usuarioSalvo = sessionStorage.getItem('usuario');

    if (usuarioSalvo) {
        return JSON.parse(usuarioSalvo);
    }

    return {
        nome: 'Maria da Silva',
        email: 'maria@email.com'
    };
}

function obterIniciais(nome) {
    if (!nome) {
        return '?';
    }

    const partes = nome.trim().split(' ');

    if (partes.length === 1) {
        return partes[0].charAt(0).toUpperCase();
    }

    return (
        partes[0].charAt(0) +
        partes[partes.length - 1].charAt(0)
    ).toUpperCase();
}

function abrirMinhasAvaliacoes() {
    closePanels();
    goTo('myreviews');
    carregarMinhasAvaliacoes();
}

async function carregarMinhasAvaliacoes() {
    const lista = document.getElementById('my-reviews-list');
    const usuarioAtual = obterUsuarioAtual();
    const email = encodeURIComponent(usuarioAtual.email);

    lista.innerHTML = `
        <div class="my-reviews-message">
            Carregando avaliações...
        </div>
    `;

    try {
        const resposta = await fetch(
            `${API_AVALIACOES}/usuario/${email}`
        );

        if (!resposta.ok) {
            throw new Error('Erro ao buscar avaliações');
        }

        const avaliacoes = await resposta.json();

        if (avaliacoes.length === 0) {
            lista.innerHTML = `
                <div class="my-reviews-empty">
                    <div class="my-reviews-empty-star">☆</div>

                    <strong>Você ainda não avaliou nenhum restaurante.</strong>

                    <span>
                        Abra um restaurante e compartilhe sua experiência.
                    </span>
                </div>
            `;

            return;
        }

        lista.innerHTML = avaliacoes
                .map(criarCardMinhaAvaliacao)
                .join('');

    } catch (erro) {
        console.error(erro);

        lista.innerHTML = `
            <div class="my-reviews-message erro">
                Não foi possível carregar suas avaliações.
            </div>
        `;
    }
}

function criarCardMinhaAvaliacao(avaliacao) {
    const data = new Date(avaliacao.data)
            .toLocaleDateString('pt-BR');

    const estrelas =
            '★'.repeat(avaliacao.nota) +
            '☆'.repeat(5 - avaliacao.nota);

    return `
        <div class="review-card">

            <div class="review-top">

                <div class="review-rest-emoji">
                    ${buscarEmojiRestaurante(avaliacao.restaurante)}
                </div>

                <div class="review-rest-info">

                    <div class="review-rest-name">
                        ${avaliacao.restaurante}
                    </div>

                    <div class="review-stars">
                        ${estrelas}
                    </div>
                </div>

                <div class="review-date">
                    ${data}
                </div>
            </div>

            <div class="review-text">
                ${avaliacao.comentario || 'Avaliação sem comentário.'}
            </div>

            <button
                class="delete-review-button"
                onclick="excluirMinhaAvaliacao(${avaliacao.id})"
            >
                Excluir avaliação
            </button>
        </div>
    `;
}

function buscarEmojiRestaurante(nomeRestaurante) {
    for (const restaurantes of Object.values(restaurantData)) {
        const restaurante = restaurantes.find(
            item => item.name === nomeRestaurante
        );

        if (restaurante) {
            return restaurante.emoji;
        }
    }

    return '🍽️';
}

async function excluirMinhaAvaliacao(id) {
    const confirmou = confirm(
        'Deseja realmente excluir esta avaliação?'
    );

    if (!confirmou) {
        return;
    }

    try {
        const resposta = await fetch(
            `${API_AVALIACOES}/${id}`,
            {
                method: 'DELETE'
            }
        );

        if (!resposta.ok) {
            throw new Error('Erro ao excluir avaliação');
        }

        await carregarMinhasAvaliacoes();

    } catch (erro) {
        console.error(erro);
        alert('Não foi possível excluir a avaliação.');
    }
}

/* ── Search ── */
function handleSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    closeSearchModal();
    return;
  }

  const results = [];

  Object.entries(restaurantData).forEach(([cat, restaurants]) => {
    restaurants.forEach((rest, restIdx) => {
      // Match restaurant name
      if (rest.name.toLowerCase().includes(q)) {
        results.push({
          type: 'restaurant',
          emoji: rest.emoji,
          bg: rest.bg,
          name: rest.name,
          sub: rest.rating,
          cat, idx: restIdx,
        });
      }
      // Match items
      rest.items.forEach(item => {
        if (item.name.toLowerCase().includes(q)) {
          results.push({
            type: 'item',
            emoji: item.emoji,
            bg: rest.bg,
            name: item.name,
            sub: 'em ' + rest.name,
            price: 'R$' + item.price.toFixed(2).replace('.', ','),
            cat, idx: restIdx,
          });
        }
      });
    });
  });

  const list = document.getElementById('search-results-list');

  if (results.length === 0) {
    list.innerHTML = `
      <div class="search-no-results">
        <div class="search-no-results-icon">🔍</div>
        <div>Nenhum resultado para "<strong>${query}</strong>"</div>
        <div style="font-size:12px;margin-top:6px;">Tente outro nome de restaurante ou prato.</div>
      </div>`;
  } else {
    list.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="closeSearchModal();openRestModal('${r.cat}',${r.idx})">
        <div class="search-result-emoji" style="background:${r.bg};">${r.emoji}</div>
        <div class="search-result-info">
          <div class="search-result-name">${r.name}</div>
          <div class="search-result-sub">${r.sub}</div>
        </div>
        ${r.price ? `<div class="search-result-price">${r.price}</div>` : ''}
      </div>
    `).join('');
  }

  document.getElementById('search-modal').classList.add('open');
}

function closeSearchModal() {
  document.getElementById('search-modal').classList.remove('open');
  // Don't clear the input so user can keep editing
}

/* ── Support Chat ── */
const botReplies = [
  'Entendido! Vou verificar isso para você. 😊',
  'Claro! Posso te ajudar com isso. Poderia dar mais detalhes?',
  'Ótima pergunta! Nossa equipe está sempre disponível para ajudar.',
  'Vou encaminhar sua solicitação para um atendente humano. Aguarde um momento!',
  'Obrigado pelo contato! Há mais alguma coisa em que posso ajudar?',
];
let botIdx = 0;

function sendChatMsg() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const body = document.getElementById('chat-body');

  const userDiv = document.createElement('div');
  userDiv.innerHTML = `<div class="chat-bubble user">${msg}</div><div class="chat-time right">Agora</div>`;
  body.appendChild(userDiv);

  setTimeout(() => {
    const reply = botReplies[botIdx % botReplies.length];
    botIdx++;
    const botDiv = document.createElement('div');
    botDiv.innerHTML = `<div class="chat-bot-row"><div class="chat-avatar">🤖</div><div><div class="chat-bubble bot">${reply}</div><div class="chat-time">Agora</div></div></div>`;
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 800);

  body.scrollTop = body.scrollHeight;
}

document.getElementById('chat-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') sendChatMsg();
});

/* ── Init ── */
setTimeout(() => goTo('welcome'), 2000);