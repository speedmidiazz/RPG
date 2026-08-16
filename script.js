// =====================================================
// 🧙 MAGIA LEGENDS ONLINE
// SCRIPT.JS COMPLETO
// =====================================================

const socket = io("https://magia-legends.onrender.com");

// =====================================================
// VARIÁVEIS
// =====================================================

let codigoSalaAtual = null;
let meuMago = null;
let magoSelecionado = null;

let minhaVida = 100;
let minhaMana = 100;

let vidaInimigo = 100;
let manaInimigo = 100;

let batalhaAtiva = false;

// =====================================================
// 25 PERSONAGENS
// =====================================================

const personagens = [

    {
        id: 1,
        nome: "Aeris",
        classe: "Mago do Vento",
        nivel: 1,
        vida: 100,
        mana: 150,
        ataque: 25,
        defesa: 15,
        poder: "Tornado",
        dano: 30,
        emoji: "🌪️",
        descricao: "Mago especialista em controlar o vento."
    },

    {
        id: 2,
        nome: "Ignis",
        classe: "Mago de Fogo",
        nivel: 5,
        vida: 110,
        mana: 140,
        ataque: 35,
        defesa: 10,
        poder: "Inferno",
        dano: 45,
        emoji: "🔥",
        descricao: "Controla chamas extremamente poderosas."
    },

    {
        id: 3,
        nome: "Glacius",
        classe: "Mago de Gelo",
        nivel: 10,
        vida: 120,
        mana: 160,
        ataque: 30,
        defesa: 20,
        poder: "Tempestade de Gelo",
        dano: 40,
        emoji: "❄️",
        descricao: "Congela seus inimigos usando magia de gelo."
    },

    {
        id: 4,
        nome: "Volt",
        classe: "Mago do Trovão",
        nivel: 15,
        vida: 105,
        mana: 155,
        ataque: 45,
        defesa: 10,
        poder: "Raio Divino",
        dano: 55,
        emoji: "⚡",
        descricao: "Manipula eletricidade e raios."
    },

    {
        id: 5,
        nome: "Terra",
        classe: "Mago da Terra",
        nivel: 20,
        vida: 160,
        mana: 100,
        ataque: 30,
        defesa: 40,
        poder: "Muralha de Pedra",
        dano: 25,
        emoji: "🪨",
        descricao: "Possui uma defesa extremamente alta."
    },

    {
        id: 6,
        nome: "Luna",
        classe: "Maga da Lua",
        nivel: 25,
        vida: 115,
        mana: 180,
        ataque: 40,
        defesa: 20,
        poder: "Raio Lunar",
        dano: 50,
        emoji: "🌙",
        descricao: "Usa a energia da lua para atacar."
    },

    {
        id: 7,
        nome: "Solaris",
        classe: "Mago do Sol",
        nivel: 30,
        vida: 130,
        mana: 170,
        ataque: 50,
        defesa: 20,
        poder: "Explosão Solar",
        dano: 60,
        emoji: "☀️",
        descricao: "Controla a energia do sol."
    },

    {
        id: 8,
        nome: "Shadow",
        classe: "Mago das Sombras",
        nivel: 35,
        vida: 100,
        mana: 190,
        ataque: 60,
        defesa: 10,
        poder: "Lâmina Sombria",
        dano: 65,
        emoji: "🌑",
        descricao: "Especialista em ataques das sombras."
    },

    {
        id: 9,
        nome: "Aqua",
        classe: "Maga da Água",
        nivel: 40,
        vida: 125,
        mana: 175,
        ataque: 35,
        defesa: 25,
        poder: "Tsunami",
        dano: 55,
        emoji: "🌊",
        descricao: "Controla grandes quantidades de água."
    },

    {
        id: 10,
        nome: "Flora",
        classe: "Maga da Natureza",
        nivel: 45,
        vida: 140,
        mana: 180,
        ataque: 35,
        defesa: 30,
        poder: "Raízes Gigantes",
        dano: 45,
        emoji: "🌿",
        descricao: "Controla plantas e possui poderes de cura."
    },

    {
        id: 11,
        nome: "Drakon",
        classe: "Mago Dragão",
        nivel: 50,
        vida: 180,
        mana: 150,
        ataque: 70,
        defesa: 40,
        poder: "Sopro de Dragão",
        dano: 80,
        emoji: "🐉",
        descricao: "Usa o poder ancestral dos dragões."
    },

    {
        id: 12,
        nome: "Necro",
        classe: "Mago da Morte",
        nivel: 55,
        vida: 120,
        mana: 200,
        ataque: 70,
        defesa: 15,
        poder: "Alma Sombria",
        dano: 75,
        emoji: "💀",
        descricao: "Manipula energia dos mortos."
    },

    {
        id: 13,
        nome: "Crystal",
        classe: "Maga Cristal",
        nivel: 60,
        vida: 150,
        mana: 190,
        ataque: 50,
        defesa: 45,
        poder: "Cristais Mágicos",
        dano: 65,
        emoji: "💎",
        descricao: "Cria cristais mágicos para atacar e defender."
    },

    {
        id: 14,
        nome: "Mystic",
        classe: "Mago Arcano",
        nivel: 65,
        vida: 130,
        mana: 220,
        ataque: 75,
        defesa: 25,
        poder: "Explosão Arcana",
        dano: 85,
        emoji: "🔮",
        descricao: "Um dos maiores usuários de magia arcana."
    },

    {
        id: 15,
        nome: "Storm",
        classe: "Mago da Tempestade",
        nivel: 70,
        vida: 145,
        mana: 210,
        ataque: 80,
        defesa: 25,
        poder: "Tempestade Suprema",
        dano: 90,
        emoji: "🌩️",
        descricao: "Invoca tempestades devastadoras."
    },

    {
        id: 16,
        nome: "Phoenix",
        classe: "Mago Fênix",
        nivel: 75,
        vida: 160,
        mana: 200,
        ataque: 85,
        defesa: 30,
        poder: "Renascimento",
        dano: 80,
        emoji: "🔥",
        descricao: "Possui o poder lendário da fênix."
    },

    {
        id: 17,
        nome: "Void",
        classe: "Mago do Vazio",
        nivel: 80,
        vida: 140,
        mana: 250,
        ataque: 90,
        defesa: 20,
        poder: "Buraco Negro",
        dano: 100,
        emoji: "🕳️",
        descricao: "Manipula o misterioso poder do vazio."
    },

    {
        id: 18,
        nome: "Time",
        classe: "Mago do Tempo",
        nivel: 85,
        vida: 150,
        mana: 240,
        ataque: 85,
        defesa: 35,
        poder: "Parar o Tempo",
        dano: 95,
        emoji: "⏳",
        descricao: "Consegue manipular o fluxo temporal."
    },

    {
        id: 19,
        nome: "Galaxy",
        classe: "Mago Galáctico",
        nivel: 90,
        vida: 180,
        mana: 260,
        ataque: 100,
        defesa: 40,
        poder: "Explosão Galáctica",
        dano: 110,
        emoji: "🌌",
        descricao: "Utiliza energia de estrelas e galáxias."
    },

    {
        id: 20,
        nome: "Demon",
        classe: "Mago Demoníaco",
        nivel: 95,
        vida: 200,
        mana: 230,
        ataque: 110,
        defesa: 45,
        poder: "Inferno Demoníaco",
        dano: 120,
        emoji: "😈",
        descricao: "Usa uma poderosa energia demoníaca."
    },

    {
        id: 21,
        nome: "Angel",
        classe: "Mago Celestial",
        nivel: 100,
        vida: 190,
        mana: 280,
        ataque: 105,
        defesa: 50,
        poder: "Julgamento Celestial",
        dano: 125,
        emoji: "👼",
        descricao: "Possui poderes vindos dos céus."
    },

    {
        id: 22,
        nome: "Chaos",
        classe: "Mago do Caos",
        nivel: 105,
        vida: 210,
        mana: 300,
        ataque: 130,
        defesa: 35,
        poder: "Caos Absoluto",
        dano: 140,
        emoji: "☯️",
        descricao: "Manipula uma energia imprevisível."
    },

    {
        id: 23,
        nome: "Eclipse",
        classe: "Mago Eclipse",
        nivel: 110,
        vida: 220,
        mana: 290,
        ataque: 135,
        defesa: 50,
        poder: "Eclipse Mortal",
        dano: 150,
        emoji: "🌘",
        descricao: "Combina luz e escuridão."
    },

    {
        id: 24,
        nome: "Infinity",
        classe: "Mago Infinito",
        nivel: 115,
        vida: 250,
        mana: 350,
        ataque: 150,
        defesa: 60,
        poder: "Energia Infinita",
        dano: 170,
        emoji: "♾️",
        descricao: "Possui uma quantidade absurda de energia mágica."
    },

    {
        id: 25,
        nome: "Legend",
        classe: "Mago Lendário",
        nivel: 120,
        vida: 300,
        mana: 400,
        ataque: 180,
        defesa: 80,
        poder: "Magia Lendária",
        dano: 200,
        emoji: "👑",
        descricao: "O mago mais poderoso de Magia Legends."
    }

];

// =====================================================
// CONEXÃO
// =====================================================

socket.on("connect", () => {

    console.log("🟢 CONECTADO AO SERVIDOR!");
    console.log("🆔 ID:", socket.id);

});

// =====================================================
// ERRO
// =====================================================

socket.on("connect_error", erro => {

    console.error(
        "❌ Erro de conexão:",
        erro.message
    );

});

// =====================================================
// CRIAR SALA
// =====================================================

const botaoCriar =
    document.getElementById("criarSala");

if (botaoCriar) {

    botaoCriar.onclick = () => {

        console.log("🏠 Criando sala...");

        socket.emit("criarSala");

    };

}

// =====================================================
// SALA CRIADA
// =====================================================

socket.on("salaCriada", codigo => {

    codigoSalaAtual = codigo;

    console.log(
        "🏠 SALA CRIADA:",
        codigo
    );

    mostrarSala(codigo);

});

// =====================================================
// ENTRAR NA SALA
// =====================================================

const botaoEntrar =
    document.getElementById("entrarSala");

const campoCodigo =
    document.getElementById("codigoEntrada");

if (botaoEntrar) {

    botaoEntrar.onclick = () => {

        const codigo =
            campoCodigo.value
                .trim()
                .toUpperCase();

        if (!codigo) {

            alert("Digite o código da sala!");

            return;

        }

        console.log(
            "🚪 Entrando na sala:",
            codigo
        );

        socket.emit(
            "entrarSala",
            codigo
        );

    };

}

// =====================================================
// ENTROU NA SALA
// =====================================================

socket.on("entrouSala", codigo => {

    codigoSalaAtual = codigo;

    console.log(
        "✅ ENTREI NA SALA:",
        codigo
    );

    mostrarSala(codigo);

});

// =====================================================
// ERRO DA SALA
// =====================================================

socket.on("erroSala", mensagem => {

    alert(mensagem);

});

// =====================================================
// JOGADORES
// =====================================================

socket.on(
    "jogadoresSala",
    quantidade => {

        const elemento =
            document.getElementById(
                "jogadoresTexto"
            );

        if (elemento) {

            elemento.textContent =
                `👥 Jogadores: ${quantidade}/2`;

        }

    }
);

// =====================================================
// BATALHA COMEÇOU
// =====================================================

socket.on(
    "batalhaComecou",
    () => {

        console.log(
            "⚔️ BATALHA COMEÇOU!"
        );

        batalhaAtiva = true;

        mostrarBatalha();

    }
);

// =====================================================
// MOSTRAR SALA
// =====================================================

function mostrarSala(codigo) {

    const menu =
        document.getElementById(
            "menuOnline"
        );

    if (menu) {

        menu.style.display = "none";

    }

    let sala =
        document.getElementById(
            "salaOnline"
        );

    if (!sala) {

        sala =
            document.createElement("div");

        sala.id = "salaOnline";

        sala.style.cssText = `
            position:fixed;
            inset:0;
            z-index:9999;
            background:#080b18;
            color:white;
            display:flex;
            justify-content:center;
            align-items:center;
            font-family:Arial;
        `;

        document.body.appendChild(sala);

    }

    sala.innerHTML = `

        <div style="
            background:#121a30;
            padding:40px;
            border-radius:20px;
            text-align:center;
            width:90%;
            max-width:500px;
        ">

            <h1>🏠 SALA ONLINE</h1>

            <p>🔑 Código:</p>

            <h2 style="
                font-size:45px;
                letter-spacing:8px;
                color:#8b6cff;
            ">
                ${codigo}
            </h2>

            <p id="jogadoresTexto">
                👥 Jogadores: 1/2
            </p>

            <p>
                Envie esse código para outro jogador.
            </p>

            <button
                id="copiarSala"
                style="
                    padding:15px;
                    margin:5px;
                    cursor:pointer;
                "
            >
                📋 COPIAR CÓDIGO
            </button>

            <button
                id="sairSala"
                style="
                    padding:15px;
                    margin:5px;
                    cursor:pointer;
                    background:#b83232;
                    color:white;
                    border:0;
                "
            >
                🚪 SAIR
            </button>

        </div>
    `;

    document
        .getElementById("copiarSala")
        .onclick = async () => {

            await navigator.clipboard
                .writeText(codigo);

            alert("✅ Código copiado!");

        };

    document
        .getElementById("sairSala")
        .onclick = () => {

            location.reload();

        };

}

// =====================================================
// BATALHA
// =====================================================

function mostrarBatalha() {

    const sala =
        document.getElementById(
            "salaOnline"
        );

    if (sala) {

        sala.remove();

    }

    let batalha =
        document.getElementById(
            "batalhaOnline"
        );

    if (!batalha) {

        criarBatalha();

    }

}

// =====================================================
// CRIAR BATALHA
// =====================================================

function criarBatalha() {

    const batalha =
        document.createElement("div");

    batalha.id =
        "batalhaOnline";

    batalha.style.cssText = `
        position:fixed;
        inset:0;
        z-index:99999;
        background:
        radial-gradient(circle,#202b52,#050711);
        color:white;
        overflow:auto;
        font-family:Arial;
        padding:25px;
    `;

    batalha.innerHTML = `

        <h1 style="text-align:center">
            ⚔️ MAGIA LEGENDS
        </h1>

        <div style="
            display:flex;
            justify-content:space-around;
            align-items:center;
            margin-top:40px;
        ">

            <div style="text-align:center">

                <div style="font-size:70px">
                    ${meuMago?.emoji || "🧙"}
                </div>

                <h2>
                    VOCÊ
                </h2>

                <p id="minhaVida">
                    ❤️ Vida: ${minhaVida}
                </p>

                <p id="minhaMana">
                    🔵 Mana: ${minhaMana}
                </p>

            </div>

            <div style="font-size:50px">
                ⚔️
            </div>

            <div style="text-align:center">

                <div style="font-size:70px">
                    🧙‍♂️
                </div>

                <h2>
                    OPONENTE
                </h2>

                <p id="vidaInimigo">
                    ❤️ Vida: ${vidaInimigo}
                </p>

                <p>
                    🔵 Mana: ${manaInimigo}
                </p>

            </div>

        </div>

        <div style="
            text-align:center;
            margin-top:35px;
        ">

            <button
                class="poderOnline"
                data-dano="30"
                data-mana="15"
            >
                🔥 Bola de Fogo
            </button>

            <button
                class="poderOnline"
                data-dano="45"
                data-mana="25"
            >
                ⚡ Raio
            </button>

            <button
                class="poderOnline"
                data-dano="35"
                data-mana="20"
            >
                ❄️ Gelo
            </button>

            <button
                class="poderOnline"
                data-dano="25"
                data-mana="20"
            >
                🌪️ Tornado
            </button>

            <br><br>

            <button
                id="trocarPersonagem"
                style="
                    padding:15px 25px;
                    background:#704cff;
                    color:white;
                    border:0;
                    border-radius:10px;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                🔄 TROCAR PERSONAGEM
            </button>

        </div>

        <div
            id="mensagensBatalha"
            style="
                max-width:650px;
                margin:30px auto;
                background:#10162b;
                padding:20px;
                border-radius:15px;
            "
        >
            ⚔️ A batalha começou!
        </div>
    `;

    document.body.appendChild(batalha);

    document
        .querySelectorAll(".poderOnline")
        .forEach(botao => {

            botao.onclick = () => {

                usarPoder(
                    Number(botao.dataset.dano),
                    Number(botao.dataset.mana),
                    botao.textContent
                );

            };

        });

    document
        .getElementById("trocarPersonagem")
        .onclick =
        abrirPersonagens;

}

// =====================================================
// USAR PODER
// =====================================================

function usarPoder(dano, mana, nome) {

    if (minhaMana < mana) {

        mostrarMensagem(
            "🔵 Você não tem mana suficiente!"
        );

        return;

    }

    minhaMana -= mana;

    atualizarStatus();

    console.log(
        "⚔️ ATAQUE:",
        nome,
        "Dano:",
        dano
    );

    socket.emit(
        "atacarJogador",
        {
            dano: dano,
            poder: nome
        }
    );

    mostrarMensagem(
        `🔥 Você usou ${nome} e causou ${dano} de dano!`
    );

}

// =====================================================
// RECEBER ATAQUE
// =====================================================

socket.on(
    "ataqueRecebido",
    dados => {

        const dano =
            Number(dados.dano) || 0;

        minhaVida -= dano;

        if (minhaVida < 0) {

            minhaVida = 0;

        }

        atualizarStatus();

        mostrarMensagem(
            `💥 Você recebeu ${dano} de dano!`
        );

        if (minhaVida <= 0) {

            morreu();

        }

    }
);

// =====================================================
// ATUALIZAR STATUS
// =====================================================

function atualizarStatus() {

    const vida =
        document.getElementById(
            "minhaVida"
        );

    const mana =
        document.getElementById(
            "minhaMana"
        );

    if (vida) {

        vida.textContent =
            `❤️ Vida: ${minhaVida}`;

    }

    if (mana) {

        mana.textContent =
            `🔵 Mana: ${minhaMana}`;

    }

}

// =====================================================
// MOSTRAR DANO NO INIMIGO
// =====================================================

socket.on(
    "vidaInimigo",
    vida => {

        vidaInimigo = vida;

        const elemento =
            document.getElementById(
                "vidaInimigo"
            );

        if (elemento) {

            elemento.textContent =
                `❤️ Vida: ${vidaInimigo}`;

        }

    }
);

// =====================================================
// MORTE
// =====================================================

function morreu() {

    mostrarMensagem(
        "💀 Você morreu!"
    );

    setTimeout(() => {

        const batalha =
            document.getElementById(
                "batalhaOnline"
            );

        if (batalha) {

            batalha.remove();

        }

        abrirPersonagens();

    }, 2000);

}

// =====================================================
// MENSAGENS
// =====================================================

function mostrarMensagem(texto) {

    const caixa =
        document.getElementById(
            "mensagensBatalha"
        );

    if (!caixa) return;

    const p =
        document.createElement("p");

    p.textContent = texto;

    caixa.appendChild(p);

    caixa.scrollTop =
        caixa.scrollHeight;

}

// =====================================================
// TROCAR PERSONAGEM
// =====================================================

function abrirPersonagens() {

    let tela =
        document.getElementById(
            "telaPersonagens"
        );

    if (tela) {

        tela.remove();

    }

    tela =
        document.createElement("div");

    tela.id =
        "telaPersonagens";

    tela.style.cssText = `
        position:fixed;
        inset:0;
        z-index:200000;
        background:#080b18;
        color:white;
        overflow:auto;
        font-family:Arial;
        padding:25px;
    `;

    tela.innerHTML = `

        <button
            id="fecharPersonagens"
            style="
                position:fixed;
                top:20px;
                right:25px;
                font-size:25px;
                background:#c0392b;
                color:white;
                border:0;
                border-radius:10px;
                width:50px;
                height:50px;
                cursor:pointer;
            "
        >
            X
        </button>

        <h1 style="text-align:center">
            🧙 ESCOLHA SEU PERSONAGEM
        </h1>

        <p style="text-align:center">
            Escolha um dos 25 magos.
        </p>

        <div
            id="listaPersonagens"
            style="
                display:grid;
                grid-template-columns:
                repeat(auto-fit,minmax(280px,1fr));
                gap:20px;
                max-width:1200px;
                margin:auto;
            "
        ></div>
    `;

    document.body.appendChild(tela);

    document
        .getElementById(
            "fecharPersonagens"
        )
        .onclick = () => {

            tela.remove();

        };

    const lista =
        document.getElementById(
            "listaPersonagens"
        );

    personagens.forEach(mago => {

        const card =
            document.createElement("div");

        card.style.cssText = `
            background:#141d35;
            border-radius:18px;
            padding:20px;
            border:1px solid #29365d;
        `;

        card.innerHTML = `

            <div style="
                font-size:55px;
                text-align:center;
            ">
                ${mago.emoji}
            </div>

            <h2>
                ${mago.nome}
            </h2>

            <p>
                🧙 Classe: ${mago.classe}
            </p>

            <p>
                ⭐ Nível necessário: ${mago.nivel}
            </p>

            <p>
                ❤️ Vida: ${mago.vida}
            </p>

            <p>
                🔵 Mana: ${mago.mana}
            </p>

            <p>
                ⚔️ Ataque: ${mago.ataque}
            </p>

            <p>
                🛡️ Defesa: ${mago.defesa}
            </p>

            <p>
                💥 Poder: ${mago.poder}
            </p>

            <p>
                🔥 Dano: ${mago.dano}
            </p>

            <p>
                📖 ${mago.descricao}
            </p>

            <button
                class="equiparMago"
                style="
                    width:100%;
                    padding:12px;
                    border:0;
                    border-radius:10px;
                    background:#704cff;
                    color:white;
                    cursor:pointer;
                    font-size:16px;
                "
            >
                🧙 EQUIPAR
            </button>

        `;

        card
            .querySelector(
                ".equiparMago"
            )
            .onclick = () => {

                equiparPersonagem(mago);

            };

        lista.appendChild(card);

    });

}

// =====================================================
// EQUIPAR PERSONAGEM
// =====================================================

function equiparPersonagem(mago) {

    meuMago = mago;

    minhaVida =
        mago.vida;

    minhaMana =
        mago.mana;

    console.log(
        "🧙 PERSONAGEM EQUIPADO:",
        mago.nome
    );

    socket.emit(
        "escolherMago",
        mago
    );

    const tela =
        document.getElementById(
            "telaPersonagens"
        );

    if (tela) {

        tela.remove();

    }

    atualizarStatus();

    mostrarMensagem(
        `🧙 Você equipou ${mago.nome}!`
    );

}

// =====================================================
// JOGADOR SAIU
// =====================================================

socket.on(
    "jogadorSaiu",
    () => {

        alert(
            "🚪 O outro jogador saiu da sala."
        );

        location.reload();

    }
);

// =====================================================
// FINAL
// =====================================================

console.log(
    "🔥 MAGIA LEGENDS - SCRIPT COMPLETO CARREGADO!"
);
