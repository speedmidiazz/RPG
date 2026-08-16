// ============================================
// MAGIA LEGENDS - JAVASCRIPT ONLINE
// ============================================

// IMPORTANTE:
// O servidor está no Render.
const socket = io("https://magia-legends.onrender.com");


// ============================================
// VARIÁVEIS
// ============================================

let codigoSalaAtual = null;
let meuMago = null;
let jogadorNaSala = false;


// ============================================
// ELEMENTOS
// ============================================

const criarSala = document.getElementById("criarSala");
const entrarSala = document.getElementById("entrarSala");
const codigoEntrada = document.getElementById("codigoEntrada");


// ============================================
// CONEXÃO
// ============================================

socket.on("connect", () => {

    console.log("🟢 Conectado ao servidor!");
    console.log("🆔 ID:", socket.id);

});


// ============================================
// ERRO DE CONEXÃO
// ============================================

socket.on("connect_error", (erro) => {

    console.error(
        "❌ Erro ao conectar:",
        erro.message
    );

});


// ============================================
// CRIAR SALA
// ============================================

if (criarSala) {

    criarSala.addEventListener("click", () => {

        console.log("🏠 Criando sala...");

        socket.emit("criarSala");

    });

}


// ============================================
// SALA CRIADA
// ============================================

socket.on("salaCriada", (codigo) => {

    console.log(
        "🔑 Sala criada:",
        codigo
    );

    codigoSalaAtual = codigo;

    jogadorNaSala = true;

    mostrarSala(codigo);

});


// ============================================
// ENTRAR EM SALA
// ============================================

if (entrarSala) {

    entrarSala.addEventListener("click", () => {

        const codigo =
            codigoEntrada
                ? codigoEntrada.value
                    .trim()
                    .toUpperCase()
                : "";

        console.log(
            "🚪 Tentando entrar:",
            codigo
        );

        if (!codigo) {

            alert(
                "❌ Digite o código da sala!"
            );

            return;

        }

        if (codigo.length !== 5) {

            alert(
                "❌ O código deve ter 5 caracteres!"
            );

            return;

        }

        socket.emit(
            "entrarSala",
            codigo
        );

    });

}


// ============================================
// ENTROU NA SALA
// ============================================

socket.on("entrouSala", (codigo) => {

    console.log(
        "✅ Entrei na sala:",
        codigo
    );

    codigoSalaAtual = codigo;

    jogadorNaSala = true;

    mostrarSala(codigo);

});


// ============================================
// ERRO AO ENTRAR
// ============================================

socket.on("erroSala", (mensagem) => {

    console.error(
        "❌ Erro da sala:",
        mensagem
    );

    alert(mensagem);

});


// ============================================
// JOGADORES NA SALA
// ============================================

socket.on("jogadoresSala", (quantidade) => {

    console.log(
        "👥 Jogadores na sala:",
        quantidade
    );

    atualizarQuantidadeJogadores(
        quantidade
    );

});


// ============================================
// BATALHA COMEÇOU
// ============================================

socket.on("batalhaComecou", () => {

    console.log(
        "⚔️ BATALHA COMEÇOU!"
    );

    mostrarBatalha();

});


// ============================================
// MOSTRAR SALA
// ============================================

function mostrarSala(codigo) {

    console.log(
        "🏠 Mostrando sala:",
        codigo
    );


    // Procura elementos da tela

    const menu =
        document.getElementById("menuOnline");

    const sala =
        document.getElementById("salaOnline");

    const codigoTela =
        document.getElementById("codigoSala");

    const codigoTexto =
        document.getElementById("codigoDaSala");


    // Esconder menu

    if (menu) {

        menu.style.display = "none";

    }


    // Mostrar sala

    if (sala) {

        sala.style.display = "block";

    }


    // Mostrar código

    if (codigoTela) {

        codigoTela.textContent =
            codigo;

    }


    if (codigoTexto) {

        codigoTexto.textContent =
            codigo;

    }


    // Se não existir uma tela de sala,
    // criar uma automaticamente.

    if (!sala) {

        criarTelaSala(codigo);

    }

}


// ============================================
// CRIAR TELA DA SALA
// ============================================

function criarTelaSala(codigo) {

    const tela =
        document.createElement("div");

    tela.id = "salaCriadaAutomaticamente";

    tela.innerHTML = `

        <div style="
            position: fixed;
            inset: 0;
            background: #080b16;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: Arial;
        ">

            <div style="
                background: #11182b;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 0 40px rgba(0,0,0,.6);
            ">

                <h1>🏠 SALA ONLINE</h1>

                <p>🔑 Código da sala:</p>

                <div style="
                    font-size: 42px;
                    font-weight: bold;
                    letter-spacing: 8px;
                    margin: 20px;
                    color: #7c5cff;
                ">
                    ${codigo}
                </div>

                <p id="jogadoresTexto">
                    👥 Jogadores: 1/2
                </p>

                <p>
                    Compartilhe o código
                    com outro jogador.
                </p>

                <button
                    id="copiarCodigo"
                    style="
                        padding: 14px 25px;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 16px;
                    "
                >
                    📋 COPIAR CÓDIGO
                </button>

                <br><br>

                <button
                    id="sairSala"
                    style="
                        padding: 12px 25px;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        background: #c0392b;
                        color: white;
                    "
                >
                    🚪 SAIR DA SALA
                </button>

            </div>

        </div>
    `;


    document.body.appendChild(tela);


    // Copiar código

    const copiar =
        document.getElementById(
            "copiarCodigo"
        );

    if (copiar) {

        copiar.addEventListener(
            "click",
            async () => {

                try {

                    await navigator.clipboard.writeText(
                        codigo
                    );

                    copiar.textContent =
                        "✅ COPIADO!";

                } catch {

                    alert(
                        "Código: " + codigo
                    );

                }

            }
        );

    }


    // Sair

    const sair =
        document.getElementById(
            "sairSala"
        );

    if (sair) {

        sair.addEventListener(
            "click",
            () => {

                location.reload();

            }
        );

    }

}


// ============================================
// ATUALIZAR JOGADORES
// ============================================

function atualizarQuantidadeJogadores(
    quantidade
) {

    const texto =
        document.getElementById(
            "jogadoresTexto"
        );

    if (texto) {

        texto.textContent =
            `👥 Jogadores: ${quantidade}/2`;

    }


    const contador =
        document.getElementById(
            "jogadoresSala"
        );

    if (contador) {

        contador.textContent =
            `👥 Jogadores: ${quantidade}/2`;

    }

}


// ============================================
// MOSTRAR BATALHA
// ============================================

function mostrarBatalha() {

    console.log(
        "⚔️ Abrindo batalha..."
    );


    const sala =
        document.getElementById(
            "salaCriadaAutomaticamente"
        );

    if (sala) {

        sala.remove();

    }


    const batalhaExistente =
        document.getElementById(
            "batalhaOnline"
        );

    if (batalhaExistente) {

        batalhaExistente.style.display =
            "flex";

        return;

    }


    criarTelaBatalha();

}


// ============================================
// CRIAR TELA DE BATALHA
// ============================================

function criarTelaBatalha() {

    const batalha =
        document.createElement("div");

    batalha.id =
        "batalhaOnline";


    batalha.innerHTML = `

        <div style="
            position: fixed;
            inset: 0;
            background:
                radial-gradient(
                    circle at center,
                    #192347,
                    #050711
                );
            color: white;
            z-index: 100000;
            font-family: Arial;
            padding: 30px;
            overflow: auto;
        ">

            <h1 style="text-align:center">
                ⚔️ MAGIA LEGENDS
            </h1>

            <div style="
                display:flex;
                justify-content:space-around;
                align-items:center;
                margin-top:50px;
            ">

                <div style="text-align:center">

                    <div style="
                        font-size:80px;
                    ">
                        🧙
                    </div>

                    <h2>VOCÊ</h2>

                    <div>
                        ❤️ Vida: 100/100
                    </div>

                    <div>
                        🔵 Mana: 100/100
                    </div>

                </div>


                <div style="
                    font-size:50px;
                ">
                    ⚔️
                </div>


                <div style="text-align:center">

                    <div style="
                        font-size:80px;
                    ">
                        🧙‍♂️
                    </div>

                    <h2>OPONENTE</h2>

                    <div>
                        ❤️ Vida: 100/100
                    </div>

                    <div>
                        🔵 Mana: 100/100
                    </div>

                </div>

            </div>


            <div style="
                text-align:center;
                margin-top:50px;
            ">

                <button
                    class="poderOnline"
                    data-poder="Bola de Fogo"
                >
                    🔥 BOLA DE FOGO
                </button>

                <button
                    class="poderOnline"
                    data-poder="Raio"
                >
                    ⚡ RAIO
                </button>

                <button
                    class="poderOnline"
                    data-poder="Gelo"
                >
                    ❄️ GELO
                </button>

                <button
                    class="poderOnline"
                    data-poder="Cura"
                >
                    💚 CURA
                </button>

            </div>


            <div
                id="mensagensBatalha"
                style="
                    max-width:600px;
                    margin:40px auto;
                    background:#10162b;
                    padding:20px;
                    border-radius:15px;
                    min-height:100px;
                "
            >
                ⚔️ Escolha um poder!
            </div>

        </div>

    `;


    document.body.appendChild(batalha);


    // Poderes

    const poderes =
        document.querySelectorAll(
            ".poderOnline"
        );


    poderes.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    const poder =
                        botao.dataset.poder;

                    console.log(
                        "⚔️ Usando:",
                        poder
                    );


                    socket.emit(
                        "atacarJogador",
                        {
                            poder: poder,
                            dano: calcularDano(poder)
                        }
                    );


                    mostrarMensagem(
                        `🔥 Você usou ${poder}!`
                    );

                }
            );

        }
    );

}


// ============================================
// CALCULAR DANO
// ============================================

function calcularDano(poder) {

    const danos = {

        "Bola de Fogo": 35,

        "Raio": 45,

        "Gelo": 30,

        "Cura": -25

    };

    return danos[poder] || 10;

}


// ============================================
// ATAQUE RECEBIDO
// ============================================

socket.on(
    "ataqueRecebido",
    (dados) => {

        console.log(
            "💥 Ataque recebido:",
            dados
        );


        mostrarMensagem(
            `💥 O inimigo usou ${dados.poder} causando ${dados.dano} de dano!`
        );

    }
);


// ============================================
// MAGO ESCOLHIDO
// ============================================

socket.on(
    "magoEscolhido",
    (mago) => {

        console.log(
            "🧙 Mago do adversário:",
            mago
        );

    }
);


// ============================================
// JOGADOR SAIU
// ============================================

socket.on(
    "jogadorSaiu",
    () => {

        alert(
            "🚪 O outro jogador saiu da sala."
        );

        location.reload();

    }
);


// ============================================
// MENSAGEM
// ============================================

socket.on(
    "mensagem",
    (dados) => {

        mostrarMensagem(
            "💬 " + dados.texto
        );

    }
);


// ============================================
// MOSTRAR MENSAGEM
// ============================================

function mostrarMensagem(texto) {

    const caixa =
        document.getElementById(
            "mensagensBatalha"
        );

    if (!caixa) {

        return;

    }

    const mensagem =
        document.createElement("p");

    mensagem.textContent =
        texto;

    caixa.appendChild(
        mensagem
    );

}


// ============================================
// ESCOLHER MAGO
// ============================================

function escolherMago(mago) {

    meuMago = mago;

    console.log(
        "🧙 Meu mago:",
        mago
    );


    socket.emit(
        "escolherMago",
        mago
    );

}


// ============================================
// DISPONIBILIZAR GLOBALMENTE
// ============================================

window.escolherMago =
    escolherMago;


console.log(
    "🔥 MAGIA LEGENDS ONLINE CARREGADO!"
);
