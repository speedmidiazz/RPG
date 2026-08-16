// ============================================================
// ⚔️ MAGIA LEGENDS
// SCRIPT.JS COMPLETO
// ============================================================


// ============================================================
// 🌐 CONEXÃO ONLINE
// ============================================================

const socket = io();


// ============================================================
// 🎮 VARIÁVEIS DO JOGO
// ============================================================

let nivelJogador = 1;
let xpJogador = 0;

let salaAtual = null;

let meuMago = null;
let magoInimigo = null;

let vidaAtual = 0;
let manaAtual = 0;

let vidaInimigo = 0;

let turnoMeu = true;

let tutorialEtapa = 0;


// ============================================================
// 🧙 25 MAGOS
// ============================================================

const personagens = [

    {
        nome: "Arcanus",
        classe: "Mago Arcano",
        emoji: "🧙",
        nivel: 1,
        vida: 500,
        mana: 400,
        ataque: 80,
        defesa: 40,
        velocidade: 50,
        critico: 15
    },

    {
        nome: "Flamara",
        classe: "Maga do Fogo",
        emoji: "🔥",
        nivel: 5,
        vida: 550,
        mana: 450,
        ataque: 100,
        defesa: 35,
        velocidade: 45,
        critico: 20
    },

    {
        nome: "Aquaris",
        classe: "Mago da Água",
        emoji: "🌊",
        nivel: 10,
        vida: 600,
        mana: 500,
        ataque: 90,
        defesa: 50,
        velocidade: 45,
        critico: 15
    },

    {
        nome: "Terron",
        classe: "Mago da Terra",
        emoji: "🪨",
        nivel: 15,
        vida: 800,
        mana: 300,
        ataque: 110,
        defesa: 80,
        velocidade: 25,
        critico: 10
    },

    {
        nome: "Zephyrus",
        classe: "Mago do Vento",
        emoji: "🌪️",
        nivel: 20,
        vida: 600,
        mana: 550,
        ataque: 120,
        defesa: 40,
        velocidade: 90,
        critico: 25
    },

    {
        nome: "Noctis",
        classe: "Mago das Sombras",
        emoji: "🌑",
        nivel: 25,
        vida: 650,
        mana: 600,
        ataque: 140,
        defesa: 50,
        velocidade: 80,
        critico: 30
    },

    {
        nome: "Lumina",
        classe: "Maga da Luz",
        emoji: "✨",
        nivel: 30,
        vida: 700,
        mana: 650,
        ataque: 130,
        defesa: 70,
        velocidade: 55,
        critico: 20
    },

    {
        nome: "Voltaris",
        classe: "Mago do Raio",
        emoji: "⚡",
        nivel: 35,
        vida: 650,
        mana: 700,
        ataque: 160,
        defesa: 45,
        velocidade: 95,
        critico: 30
    },

    {
        nome: "Glacius",
        classe: "Mago do Gelo",
        emoji: "❄️",
        nivel: 40,
        vida: 750,
        mana: 700,
        ataque: 150,
        defesa: 75,
        velocidade: 45,
        critico: 20
    },

    {
        nome: "Inferno",
        classe: "Mago Infernal",
        emoji: "😈",
        nivel: 45,
        vida: 800,
        mana: 800,
        ataque: 190,
        defesa: 60,
        velocidade: 55,
        critico: 35
    },

    {
        nome: "Drakon",
        classe: "Mago Dragão",
        emoji: "🐉",
        nivel: 50,
        vida: 1000,
        mana: 850,
        ataque: 220,
        defesa: 100,
        velocidade: 50,
        critico: 35
    },

    {
        nome: "Venom",
        classe: "Mago Venenoso",
        emoji: "☠️",
        nivel: 55,
        vida: 850,
        mana: 800,
        ataque: 210,
        defesa: 65,
        velocidade: 75,
        critico: 40
    },

    {
        nome: "Storm",
        classe: "Mago da Tempestade",
        emoji: "⛈️",
        nivel: 60,
        vida: 900,
        mana: 900,
        ataque: 240,
        defesa: 70,
        velocidade: 85,
        critico: 35
    },

    {
        nome: "Chronos",
        classe: "Mago do Tempo",
        emoji: "⏳",
        nivel: 65,
        vida: 950,
        mana: 1000,
        ataque: 250,
        defesa: 80,
        velocidade: 90,
        critico: 45
    },

    {
        nome: "Cosmos",
        classe: "Mago Cósmico",
        emoji: "🌌",
        nivel: 70,
        vida: 1100,
        mana: 1100,
        ataque: 280,
        defesa: 90,
        velocidade: 70,
        critico: 45
    },

    {
        nome: "Phoenix",
        classe: "Mago Fênix",
        emoji: "🔥",
        nivel: 75,
        vida: 1200,
        mana: 1000,
        ataque: 300,
        defesa: 100,
        velocidade: 75,
        critico: 40
    },

    {
        nome: "Void",
        classe: "Mago do Vazio",
        emoji: "🕳️",
        nivel: 80,
        vida: 1300,
        mana: 1200,
        ataque: 330,
        defesa: 110,
        velocidade: 80,
        critico: 50
    },

    {
        nome: "Celestia",
        classe: "Maga Celestial",
        emoji: "👼",
        nivel: 85,
        vida: 1400,
        mana: 1300,
        ataque: 350,
        defesa: 130,
        velocidade: 75,
        critico: 45
    },

    {
        nome: "Abyss",
        classe: "Mago Abissal",
        emoji: "👹",
        nivel: 90,
        vida: 1500,
        mana: 1400,
        ataque: 390,
        defesa: 120,
        velocidade: 80,
        critico: 50
    },

    {
        nome: "Eclipse",
        classe: "Mago Eclipse",
        emoji: "🌘",
        nivel: 95,
        vida: 1600,
        mana: 1500,
        ataque: 420,
        defesa: 140,
        velocidade: 90,
        critico: 55
    },

    {
        nome: "Infinity",
        classe: "Mago do Infinito",
        emoji: "♾️",
        nivel: 100,
        vida: 1800,
        mana: 1700,
        ataque: 500,
        defesa: 160,
        velocidade: 100,
        critico: 60
    },

    {
        nome: "Titan",
        classe: "Mago Titânico",
        emoji: "🗿",
        nivel: 105,
        vida: 2000,
        mana: 1500,
        ataque: 550,
        defesa: 200,
        velocidade: 45,
        critico: 40
    },

    {
        nome: "Galaxy",
        classe: "Mago Galáctico",
        emoji: "🌠",
        nivel: 110,
        vida: 2200,
        mana: 2000,
        ataque: 600,
        defesa: 180,
        velocidade: 90,
        critico: 60
    },

    {
        nome: "Divine",
        classe: "Mago Divino",
        emoji: "☀️",
        nivel: 115,
        vida: 2500,
        mana: 2200,
        ataque: 650,
        defesa: 220,
        velocidade: 100,
        critico: 65
    },

    {
        nome: "Supreme",
        classe: "Mago Supremo",
        emoji: "👑",
        nivel: 120,
        vida: 3000,
        mana: 2500,
        ataque: 800,
        defesa: 250,
        velocidade: 120,
        critico: 70
    }

];


// ============================================================
// 🪄 PODERES
// ============================================================

const poderes = [

    {
        nome: "Bola de Fogo",
        emoji: "🔥",
        dano: 100,
        mana: 40
    },

    {
        nome: "Raio Arcano",
        emoji: "⚡",
        dano: 130,
        mana: 60
    },

    {
        nome: "Explosão Mágica",
        emoji: "💥",
        dano: 180,
        mana: 90
    },

    {
        nome: "Tempestade",
        emoji: "🌪️",
        dano: 230,
        mana: 120
    },

    {
        nome: "Meteoro",
        emoji: "☄️",
        dano: 300,
        mana: 170
    },

    {
        nome: "Golpe Supremo",
        emoji: "🌌",
        dano: 450,
        mana: 250
    }

];


// ============================================================
// 🚀 INICIAR
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    iniciarJogo
);


function iniciarJogo() {

    mostrarTela("online");

    criarPersonagens();

    configurarOnline();

    configurarChat();

}


// ============================================================
// 🎮 TROCAR TELAS
// ============================================================

function mostrarTela(id) {

    const telas = [

        "online",
        "tutorial",
        "menu",
        "jogo"

    ];


    telas.forEach(
        function(tela) {

            const elemento =
                document.getElementById(tela);

            if (elemento) {

                elemento.classList.add(
                    "escondido"
                );

            }

        }
    );


    const alvo =
        document.getElementById(id);


    if (alvo) {

        alvo.classList.remove(
            "escondido"
        );

    }

}


// ============================================================
// 🌲 TUTORIAL
// ============================================================

function iniciarTutorial() {

    mostrarTela("tutorial");

    tutorialEtapa = 0;

    atualizarTutorial();

}


function atualizarTutorial() {

    const texto =
        document.getElementById(
            "textoTutorial"
        );

    const opcoes =
        document.getElementById(
            "opcoesTutorial"
        );


    if (!texto || !opcoes) {

        return;

    }


    opcoes.innerHTML = "";


    if (tutorialEtapa === 0) {

        texto.textContent =
            "Você acorda em uma floresta misteriosa. O Mestre pergunta: o que você quer fazer?";


        criarOpcao(
            opcoes,
            "🌲 Explorar a floresta",
            function() {

                tutorialEtapa = 1;

                atualizarTutorial();

            }
        );


        criarOpcao(
            opcoes,
            "🔮 Procurar magia",
            function() {

                tutorialEtapa = 2;

                atualizarTutorial();

            }
        );

    }


    else if (tutorialEtapa === 1) {

        texto.textContent =
            "Você encontra uma antiga torre mágica. Uma energia poderosa vem de dentro.";


        criarOpcao(
            opcoes,
            "🏰 Entrar na torre",
            terminarTutorial
        );


        criarOpcao(
            opcoes,
            "🌲 Continuar andando",
            terminarTutorial
        );

    }


    else {

        texto.textContent =
            "Você encontra um cristal mágico. O Mestre diz que sua aventura está apenas começando.";


        criarOpcao(
            opcoes,
            "🔮 Tocar no cristal",
            terminarTutorial
        );

    }

}


function criarOpcao(
    container,
    texto,
    funcao
) {

    const botao =
        document.createElement("button");


    botao.textContent =
        texto;


    botao.onclick =
        funcao;


    container.appendChild(
        botao
    );

}


function terminarTutorial() {

    mostrarTela("menu");

    atualizarNivel();

}


// ============================================================
// 🧙 CRIAR 25 PERSONAGENS
// ============================================================

function criarPersonagens() {

    const container =
        document.getElementById(
            "personagens"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    personagens.forEach(
        function(mago, index) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            const desbloqueado =
                nivelJogador >= mago.nivel;


            if (!desbloqueado) {

                card.classList.add(
                    "bloqueado"
                );

            }


            card.innerHTML = `

                <div class="emoji">
                    ${mago.emoji}
                </div>

                <h2>
                    ${mago.nome}
                </h2>

                <h3>
                    ${mago.classe}
                </h3>

                <hr>

                <p>
                    ❤️ Vida:
                    <b>${mago.vida}</b>
                </p>

                <p>
                    💧 Mana:
                    <b>${mago.mana}</b>
                </p>

                <p>
                    ⚔️ Ataque:
                    <b>${mago.ataque}</b>
                </p>

                <p>
                    🛡️ Defesa:
                    <b>${mago.defesa}</b>
                </p>

                <p>
                    💨 Velocidade:
                    <b>${mago.velocidade}</b>
                </p>

                <p>
                    🎯 Crítico:
                    <b>${mago.critico}%</b>
                </p>

                <p>
                    ⭐ Necessário:
                    <b>Nível ${mago.nivel}</b>
                </p>

            `;


            if (desbloqueado) {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.textContent =
                    "🧙 Escolher";


                botao.onclick =
                    function() {

                        escolherMago(
                            index
                        );

                    };


                card.appendChild(
                    botao
                );

            }

            else {

                const bloqueio =
                    document.createElement(
                        "div"
                    );


                bloqueio.className =
                    "bloqueio";


                bloqueio.textContent =
                    `🔒 Desbloqueia no nível ${mago.nivel}`;


                card.appendChild(
                    bloqueio
                );

            }


            container.appendChild(
                card
            );

        }
    );

}


// ============================================================
// 🧙 ESCOLHER MAGO
// ============================================================

function escolherMago(index) {

    const mago =
        personagens[index];


    if (nivelJogador < mago.nivel) {

        alert(
            `🔒 Você precisa do nível ${mago.nivel}!`
        );

        return;

    }


    meuMago =
        mago;


    vidaAtual =
        mago.vida;


    manaAtual =
        mago.mana;


    socket.emit(
        "escolherMago",
        {
            nome: mago.nome,
            emoji: mago.emoji,
            classe: mago.classe,
            vida: mago.vida,
            mana: mago.mana,
            ataque: mago.ataque,
            defesa: mago.defesa
        }
    );


    atualizarStatusPartida(
        `🧙 Você escolheu ${mago.nome}!`
    );


    iniciarBatalha();

}


// ============================================================
// ⚔️ INICIAR BATALHA
// ============================================================

function iniciarBatalha() {

    mostrarTela("jogo");


    atualizarJogadorNaTela();

    criarPoderes();

    adicionarMensagem(
        `⚔️ ${meuMago.nome} entrou na batalha!`
    );


    if (magoInimigo) {

        atualizarInimigoNaTela();

    }

}


// ============================================================
// 🧙 ATUALIZAR JOGADOR
// ============================================================

function atualizarJogadorNaTela() {

    if (!meuMago) {

        return;

    }


    const nome =
        document.getElementById(
            "nomeHeroi"
        );


    const emoji =
        document.getElementById(
            "emojiHeroi"
        );


    if (nome) {

        nome.textContent =
            meuMago.nome;

    }


    if (emoji) {

        emoji.textContent =
            meuMago.emoji;

    }


    atualizarVida();

    atualizarMana();

}


// ============================================================
// ❤️ VIDA
// ============================================================

function atualizarVida() {

    const texto =
        document.getElementById(
            "vidaTexto"
        );


    const barra =
        document.getElementById(
            "vidaHeroi"
        );


    if (!meuMago) {

        return;

    }


    if (texto) {

        texto.textContent =
            `${vidaAtual}/${meuMago.vida}`;

    }


    if (barra) {

        const porcentagem =
            (vidaAtual / meuMago.vida) * 100;


        barra.style.width =
            `${Math.max(0, porcentagem)}%`;

    }

}


// ============================================================
// 💧 MANA
// ============================================================

function atualizarMana() {

    const texto =
        document.getElementById(
            "manaTexto"
        );


    const barra =
        document.getElementById(
            "manaHeroi"
        );


    if (!meuMago) {

        return;

    }


    if (texto) {

        texto.textContent =
            `${manaAtual}/${meuMago.mana}`;

    }


    if (barra) {

        const porcentagem =
            (manaAtual / meuMago.mana) * 100;


        barra.style.width =
            `${Math.max(0, porcentagem)}%`;

    }

}


// ============================================================
// 👹 INIMIGO
// ============================================================

function atualizarInimigoNaTela() {

    if (!magoInimigo) {

        return;

    }


    document.getElementById(
        "nomeInimigo"
    ).textContent =
        magoInimigo.nome;


    document.getElementById(
        "emojiInimigo"
    ).textContent =
        magoInimigo.emoji;


    vidaInimigo =
        magoInimigo.vida;


    atualizarVidaInimigo();

}


// ============================================================
// ❤️ VIDA DO INIMIGO
// ============================================================

function atualizarVidaInimigo() {

    const texto =
        document.getElementById(
            "vidaInimigoTexto"
        );


    const barra =
        document.getElementById(
            "vidaInimigo"
        );


    if (!magoInimigo) {

        return;

    }


    if (texto) {

        texto.textContent =
            `${Math.max(0, vidaInimigo)}/${magoInimigo.vida}`;

    }


    if (barra) {

        const porcentagem =
            (vidaInimigo /
                magoInimigo.vida) * 100;


        barra.style.width =
            `${Math.max(0, porcentagem)}%`;

    }

}


// ============================================================
// 🪄 CRIAR PODERES
// ============================================================

function criarPoderes() {

    const container =
        document.getElementById(
            "magias"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    poderes.forEach(
        function(poder, index) {

            const botao =
                document.createElement(
                    "button"
                );


            botao.className =
                "botao-poder";


            botao.innerHTML = `

                <span>
                    ${poder.emoji}
                    ${poder.nome}
                </span>

                <small>
                    ⚔️ ${poder.dano}
                    |
                    💧 ${poder.mana}
                </small>

            `;


            botao.onclick =
                function() {

                    usarPoder(index);

                };


            container.appendChild(
                botao
            );

        }
    );

}


// ============================================================
// ⚔️ USAR PODER
// ============================================================

function usarPoder(index) {

    if (!meuMago) {

        return;

    }


    if (!magoInimigo) {

        adicionarMensagem(
            "⏳ Espere o outro jogador escolher um mago."
        );

        return;

    }


    if (!turnoMeu) {

        adicionarMensagem(
            "⏳ Espere sua vez!"
        );

        return;

    }


    const poder =
        poderes[index];


    if (manaAtual < poder.mana) {

        adicionarMensagem(
            "❌ Você não tem mana suficiente!"
        );

        return;

    }


    manaAtual -=
        poder.mana;


    atualizarMana();


    let dano =
        poder.dano +
        meuMago.ataque;


    const critico =
        Math.random() * 100 <
        meuMago.critico;


    if (critico) {

        dano *= 2;

    }


    dano =
        Math.floor(dano);


    adicionarMensagem(
        `${meuMago.emoji} ${meuMago.nome} usou ${poder.nome} e causou ${dano} de dano!`
    );


    if (critico) {

        adicionarMensagem(
            "💥 ACERTO CRÍTICO!"
        );

    }


    // Enviar ataque para o servidor

    socket.emit(
        "atacarJogador",
        {
            dano: dano,
            poder: poder.nome
        }
    );


    // Esperar o servidor responder

    turnoMeu = false;

}


// ============================================================
// 💥 RECEBER ATAQUE
// ============================================================

socket.on(
    "ataqueRecebido",
    function(dados) {

        const dano =
            Number(dados.dano) || 0;


        vidaAtual -=
            dano;


        vidaAtual =
            Math.max(
                0,
                vidaAtual
            );


        atualizarVida();


        adicionarMensagem(
            `💥 Você recebeu ${dano} de dano!`
        );


        turnoMeu = true;


        if (vidaAtual <= 0) {

            jogadorMorreu();

        }

    }
);


// ============================================================
// 💀 MORTE
// ============================================================

function jogadorMorreu() {

    adicionarMensagem(
        "💀 Você morreu!"
    );


    alert(
        "💀 Você morreu! Voltando para a escolha de magos..."
    );


    meuMago = null;

    magoInimigo = null;

    vidaAtual = 0;

    manaAtual = 0;

    mostrarTela("menu");

    criarPersonagens();

}


// ============================================================
// 🏆 VITÓRIA
// ============================================================

function inimigoMorreu() {

    adicionarMensagem(
        "🏆 VOCÊ VENCEU!"
    );


    alert(
        "🏆 VITÓRIA!"
    );


    ganharXP(100);


    mostrarTela("menu");

}


// ============================================================
// ⭐ XP
// ============================================================

function ganharXP(valor) {

    xpJogador +=
        valor;


    if (
        xpJogador >= 100
    ) {

        xpJogador -= 100;

        nivelJogador++;

        alert(
            `⭐ VOCÊ SUBIU PARA O NÍVEL ${nivelJogador}!`
        );

        criarPersonagens();

    }


    atualizarNivel();

}


// ============================================================
// ⭐ ATUALIZAR NÍVEL
// ============================================================

function atualizarNivel() {

    const elementos = [

        "nivel",
        "nivelMenu"

    ];


    elementos.forEach(
        function(id) {

            const elemento =
                document.getElementById(
                    id
                );


            if (elemento) {

                elemento.textContent =
                    nivelJogador;

            }

        }
    );


    const xp =
        document.getElementById(
            "xp"
        );


    if (xp) {

        xp.textContent =
            xpJogador;

    }

}


// ============================================================
// 🧪 POÇÃO
// ============================================================

function usarPocao() {

    if (!meuMago) {

        return;

    }


    const cura =
        150;


    vidaAtual +=
        cura;


    vidaAtual =
        Math.min(
            vidaAtual,
            meuMago.vida
        );


    adicionarMensagem(
        `🧪 Você recuperou ${cura} de vida!`
    );


    atualizarVida();

}


// ============================================================
// 📜 MENSAGENS
// ============================================================

function adicionarMensagem(
    texto
) {

    const mensagens =
        document.getElementById(
            "mensagens"
        );


    if (!mensagens) {

        return;

    }


    const div =
        document.createElement(
            "div"
        );


    div.className =
        "mensagem";


    div.textContent =
        texto;


    mensagens.appendChild(
        div
    );


    mensagens.scrollTop =
        mensagens.scrollHeight;

}


// ============================================================
// 🌐 CONFIGURAR ONLINE
// ============================================================

function configurarOnline() {

    const criar =
        document.getElementById(
            "criarSala"
        );


    const entrar =
        document.getElementById(
            "entrarSala"
        );


    const codigo =
        document.getElementById(
            "codigoEntrada"
        );


    if (criar) {

        criar.onclick =
            function() {

                socket.emit(
                    "criarSala"
                );

            };

    }


    if (entrar) {

        entrar.onclick =
            function() {

                const valor =
                    codigo.value
                        .trim()
                        .toUpperCase();


                if (
                    valor.length !== 5
                ) {

                    alert(
                        "❌ Digite um código de 5 caracteres."
                    );

                    return;

                }


                socket.emit(
                    "entrarSala",
                    valor
                );

            };

    }

}


// ============================================================
// 🏠 SALA CRIADA
// ============================================================

socket.on(
    "salaCriada",
    function(codigo) {

        salaAtual =
            codigo;


        const div =
            document.getElementById(
                "salaCriada"
            );


        const codigoDiv =
            document.getElementById(
                "codigoSala"
            );


        if (div) {

            div.classList.remove(
                "escondido"
            );

        }


        if (codigoDiv) {

            codigoDiv.textContent =
                codigo;

        }


        atualizarStatusOnline(
            1
        );


        iniciarTutorial();

    }
);


// ============================================================
// 🚪 ENTROU NA SALA
// ============================================================

socket.on(
    "entrouSala",
    function(codigo) {

        salaAtual =
            codigo;


        atualizarStatusOnline(
            2
        );


        iniciarTutorial();

    }
);


// ============================================================
// 👥 JOGADORES
// ============================================================

socket.on(
    "jogadoresSala",
    function(quantidade) {

        atualizarStatusOnline(
            quantidade
        );

    }
);


function atualizarStatusOnline(
    quantidade
) {

    const status =
        document.getElementById(
            "statusOnline"
        );


    if (!status) {

        return;

    }


    status.textContent =
        `👥 Jogadores: ${quantidade}/2`;

}


// ============================================================
// 🧙 MAGO DO INIMIGO
// ============================================================

socket.on(
    "magoEscolhido",
    function(mago) {

        magoInimigo =
            mago;


        atualizarStatusPartida(
            `👹 O inimigo escolheu ${mago.nome}!`
        );


        if (
            document.getElementById(
                "jogo"
            ).classList.contains(
                "escondido"
            )
        ) {

            if (meuMago) {

                iniciarBatalha();

            }

        }
        else {

            atualizarInimigoNaTela();

        }

    }
);


// ============================================================
// ⚔️ BATALHA COMEÇOU
// ============================================================

socket.on(
    "batalhaComecou",
    function() {

        atualizarStatusPartida(
            "⚔️ A batalha começou!"
        );

    }
);


// ============================================================
// ❌ ERRO DA SALA
// ============================================================

socket.on(
    "erroSala",
    function(mensagem) {

        alert(mensagem);

    }
);


// ============================================================
// 🔴 JOGADOR SAIU
// ============================================================

socket.on(
    "jogadorSaiu",
    function() {

        alert(
            "🔴 O outro jogador saiu!"
        );


        magoInimigo =
            null;


        mostrarTela("menu");

    }
);


// ============================================================
// 🟢 CONECTADO
// ============================================================

socket.on(
    "connect",
    function() {

        console.log(
            "🟢 Conectado ao servidor!"
        );

        console.log(
            "ID:",
            socket.id
        );

    }
);


// ============================================================
// 📢 STATUS DA PARTIDA
// ============================================================

function atualizarStatusPartida(
    texto
) {

    const elemento =
        document.getElementById(
            "statusPartida"
        );


    if (elemento) {

        elemento.textContent =
            texto;

    }

}


// ============================================================
// 💬 CHAT
// ============================================================

function configurarChat() {

    const input =
        document.getElementById(
            "chatInput"
        );


    const botao =
        document.getElementById(
            "enviarChat"
        );


    if (!input || !botao) {

        return;

    }


    botao.onclick =
        function() {

            enviarMensagemChat();

        };


    input.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter"
            ) {

                enviarMensagemChat();

            }

        }
    );

}


function enviarMensagemChat() {

    const input =
        document.getElementById(
            "chatInput"
        );


    if (!input) {

        return;

    }


    const texto =
        input.value.trim();


    if (!texto) {

        return;

    }


    socket.emit(
        "mensagem",
        texto
    );


    input.value = "";

}


// ============================================================
// 💬 RECEBER CHAT
// ============================================================

socket.on(
    "mensagem",
    function(dados) {

        const container =
            document.getElementById(
                "chatMensagens"
            );


        if (!container) {

            return;

        }


        const mensagem =
            document.createElement(
                "div"
            );


        mensagem.className =
            "mensagem";


        mensagem.textContent =
            `💬 ${dados.texto}`;


        container.appendChild(
            mensagem
        );


        container.scrollTop =
            container.scrollHeight;

    }
);


// ============================================================
// 🎯 CONTROLE DE DANO RECEBIDO
// ============================================================

socket.on(
    "ataqueRecebido",
    function(dados) {

        const dano =
            Number(dados.dano);


        if (
            Number.isNaN(dano)
        ) {

            return;

        }


        vidaAtual -=
            dano;


        vidaAtual =
            Math.max(
                0,
                vidaAtual
            );


        atualizarVida();


        adicionarMensagem(
            `💥 Você recebeu ${dano} de dano!`
        );


        turnoMeu = true;


        if (
            vidaAtual <= 0
        ) {

            jogadorMorreu();

        }

    }
);


// ============================================================
// 🔄 TESTE DE VIDA INIMIGA
// ============================================================

function receberDanoNoInimigo(
    dano
) {

    if (!magoInimigo) {

        return;

    }


    vidaInimigo -=
        dano;


    vidaInimigo =
        Math.max(
            0,
            vidaInimigo
        );


    atualizarVidaInimigo();


    if (
        vidaInimigo <= 0
    ) {

        inimigoMorreu();

    }

}