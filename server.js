// ============================================
// 🧙 MAGIA LEGENDS - SERVIDOR ONLINE
// ============================================

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// Render usa PORT automaticamente
const PORT = process.env.PORT || 3000;

// ============================================
// ARQUIVOS DO JOGO
// ============================================

app.use(express.static(__dirname));

// ============================================
// SALAS
// ============================================

const salas = {};

// ============================================
// 25 MAGOS
// ============================================

const magos = [

    {
        id: 1,
        nome: "Auron",
        nivel: 1,
        vida: 100,
        mana: 100,
        ataque: 20,
        defesa: 10
    },

    {
        id: 2,
        nome: "Luna",
        nivel: 5,
        vida: 110,
        mana: 120,
        ataque: 25,
        defesa: 12
    },

    {
        id: 3,
        nome: "Drakon",
        nivel: 10,
        vida: 150,
        mana: 100,
        ataque: 35,
        defesa: 15
    },

    {
        id: 4,
        nome: "Aria",
        nivel: 15,
        vida: 120,
        mana: 160,
        ataque: 40,
        defesa: 10
    },

    {
        id: 5,
        nome: "Zarek",
        nivel: 20,
        vida: 180,
        mana: 100,
        ataque: 45,
        defesa: 20
    },

    {
        id: 6,
        nome: "Nyx",
        nivel: 25,
        vida: 130,
        mana: 180,
        ataque: 50,
        defesa: 15
    },

    {
        id: 7,
        nome: "Kael",
        nivel: 30,
        vida: 200,
        mana: 120,
        ataque: 55,
        defesa: 25
    },

    {
        id: 8,
        nome: "Elyra",
        nivel: 35,
        vida: 140,
        mana: 200,
        ataque: 60,
        defesa: 20
    },

    {
        id: 9,
        nome: "Ragnar",
        nivel: 40,
        vida: 250,
        mana: 100,
        ataque: 65,
        defesa: 35
    },

    {
        id: 10,
        nome: "Selene",
        nivel: 45,
        vida: 160,
        mana: 220,
        ataque: 70,
        defesa: 25
    },

    {
        id: 11,
        nome: "Orion",
        nivel: 50,
        vida: 220,
        mana: 180,
        ataque: 75,
        defesa: 30
    },

    {
        id: 12,
        nome: "Vex",
        nivel: 55,
        vida: 190,
        mana: 240,
        ataque: 80,
        defesa: 25
    },

    {
        id: 13,
        nome: "Thalia",
        nivel: 60,
        vida: 260,
        mana: 200,
        ataque: 85,
        defesa: 40
    },

    {
        id: 14,
        nome: "Dante",
        nivel: 65,
        vida: 280,
        mana: 160,
        ataque: 90,
        defesa: 35
    },

    {
        id: 15,
        nome: "Morgana",
        nivel: 70,
        vida: 200,
        mana: 300,
        ataque: 95,
        defesa: 30
    },

    {
        id: 16,
        nome: "Azrael",
        nivel: 75,
        vida: 300,
        mana: 220,
        ataque: 100,
        defesa: 45
    },

    {
        id: 17,
        nome: "Seraph",
        nivel: 80,
        vida: 240,
        mana: 320,
        ataque: 105,
        defesa: 40
    },

    {
        id: 18,
        nome: "Valkor",
        nivel: 85,
        vida: 350,
        mana: 200,
        ataque: 110,
        defesa: 50
    },

    {
        id: 19,
        nome: "Isolde",
        nivel: 90,
        vida: 260,
        mana: 350,
        ataque: 115,
        defesa: 45
    },

    {
        id: 20,
        nome: "Lucian",
        nivel: 95,
        vida: 380,
        mana: 250,
        ataque: 120,
        defesa: 55
    },

    {
        id: 21,
        nome: "Erebus",
        nivel: 100,
        vida: 400,
        mana: 300,
        ataque: 130,
        defesa: 60
    },

    {
        id: 22,
        nome: "Celestia",
        nivel: 105,
        vida: 300,
        mana: 400,
        ataque: 135,
        defesa: 50
    },

    {
        id: 23,
        nome: "Valerian",
        nivel: 110,
        vida: 450,
        mana: 300,
        ataque: 145,
        defesa: 70
    },

    {
        id: 24,
        nome: "Astra",
        nivel: 115,
        vida: 350,
        mana: 450,
        ataque: 150,
        defesa: 60
    },

    {
        id: 25,
        nome: "Archmage",
        nivel: 120,
        vida: 500,
        mana: 500,
        ataque: 180,
        defesa: 80
    }

];

// ============================================
// PODERES
// ============================================

const poderes = {

    "Bola de Fogo": {
        dano: 35,
        mana: 15
    },

    "Raio": {
        dano: 45,
        mana: 20
    },

    "Gelo": {
        dano: 30,
        mana: 12
    },

    "Meteoro": {
        dano: 70,
        mana: 35
    },

    "Explosão Arcana": {
        dano: 90,
        mana: 45
    },

    "Cura": {
        dano: 0,
        cura: 35,
        mana: 25
    }

};

// ============================================
// CONEXÃO
// ============================================

io.on("connection", (socket) => {

    console.log("🟢 Jogador conectado:", socket.id);

    // ========================================
    // CRIAR SALA
    // ========================================

    socket.on("criarSala", () => {

        let codigo;

        do {
            codigo = gerarCodigo();
        } while (salas[codigo]);

        salas[codigo] = {

            jogadores: [],

            estado: {},

            batalha: false

        };

        salas[codigo].jogadores.push(socket.id);

        socket.join(codigo);

        socket.sala = codigo;

        console.log("🏠 Sala criada:", codigo);

        socket.emit("salaCriada", codigo);

        io.to(codigo).emit(
            "jogadoresSala",
            1
        );

    });

    // ========================================
    // ENTRAR NA SALA
    // ========================================

    socket.on("entrarSala", (codigo) => {

        codigo = String(codigo)
            .trim()
            .toUpperCase();

        const sala = salas[codigo];

        if (!sala) {

            socket.emit(
                "erroSala",
                "❌ Essa sala não existe!"
            );

            return;
        }

        if (sala.jogadores.length >= 2) {

            socket.emit(
                "erroSala",
                "❌ Essa sala já está cheia!"
            );

            return;
        }

        sala.jogadores.push(socket.id);

        socket.join(codigo);

        socket.sala = codigo;

        console.log(
            "🚪 Jogador entrou:",
            socket.id,
            "Sala:",
            codigo
        );

        socket.emit(
            "entrouSala",
            codigo
        );

        io.to(codigo).emit(
            "jogadoresSala",
            sala.jogadores.length
        );

        // Quando tiver 2 jogadores
        if (sala.jogadores.length === 2) {

            sala.batalha = true;

            console.log(
                "⚔️ BATALHA COMEÇOU:",
                codigo
            );

            io.to(codigo).emit(
                "batalhaComecou"
            );

        }

    });

    // ========================================
    // ESCOLHER MAGO
    // ========================================

    socket.on("escolherMago", (mago) => {

        const codigo = socket.sala;

        if (!codigo) return;

        const sala = salas[codigo];

        if (!sala) return;

        const magoServidor =
            magos.find(
                m => m.id === Number(mago.id)
            );

        if (!magoServidor) {

            socket.emit(
                "erroMago",
                "❌ Mago inválido!"
            );

            return;
        }

        sala.estado[socket.id] = {

            mago: magoServidor,

            vida: magoServidor.vida,

            mana: magoServidor.mana

        };

        console.log(
            "🧙",
            socket.id,
            "escolheu",
            magoServidor.nome
        );

        socket.emit(
            "meuMagoConfirmado",
            sala.estado[socket.id]
        );

        socket.to(codigo).emit(
            "magoEscolhido",
            magoServidor
        );

    });

    // ========================================
    // TROCAR PERSONAGEM
    // ========================================

    socket.on("trocarPersonagem", (mago) => {

        const codigo = socket.sala;

        if (!codigo) return;

        const sala = salas[codigo];

        if (!sala) return;

        const novoMago =
            magos.find(
                m => m.id === Number(mago.id)
            );

        if (!novoMago) return;

        const jogador =
            sala.estado[socket.id];

        if (!jogador) return;

        jogador.mago = novoMago;

        jogador.vida = novoMago.vida;

        jogador.mana = novoMago.mana;

        console.log(
            "🔄",
            socket.id,
            "trocou para",
            novoMago.nome
        );

        socket.emit(
            "personagemTrocado",
            jogador
        );

        socket.to(codigo).emit(
            "oponenteTrocouPersonagem",
            novoMago
        );

    });

    // ========================================
    // ATAQUE
    // ========================================

    socket.on("atacarJogador", (dados) => {

        const codigo = socket.sala;

        if (!codigo) return;

        const sala = salas[codigo];

        if (!sala) return;

        const atacante =
            sala.estado[socket.id];

        if (!atacante) {

            socket.emit(
                "erroBatalha",
                "❌ Escolha um mago primeiro!"
            );

            return;
        }

        // Encontrar adversário
        const adversarioId =
            sala.jogadores.find(
                id => id !== socket.id
            );

        if (!adversarioId) {

            socket.emit(
                "erroBatalha",
                "⏳ Ainda não há adversário."
            );

            return;
        }

        const adversario =
            sala.estado[adversarioId];

        if (!adversario) return;

        const poder =
            poderes[dados.poder];

        if (!poder) {

            socket.emit(
                "erroBatalha",
                "❌ Poder inválido!"
            );

            return;
        }

        // ====================================
        // CURA
        // ====================================

        if (poder.cura) {

            atacante.mana -= poder.mana;

            if (atacante.mana < 0) {

                atacante.mana += poder.mana;

                socket.emit(
                    "erroBatalha",
                    "🔵 Mana insuficiente!"
                );

                return;
            }

            atacante.vida += poder.cura;

            if (
                atacante.vida >
                atacante.mago.vida
            ) {

                atacante.vida =
                    atacante.mago.vida;

            }

            socket.emit(
                "vidaAtualizada",
                atacante.vida
            );

            socket.emit(
                "manaAtualizada",
                atacante.mana
            );

            socket.emit(
                "curaRealizada",
                {
                    cura: poder.cura,
                    vida: atacante.vida
                }
            );

            return;
        }

        // ====================================
        // VERIFICAR MANA
        // ====================================

        if (
            atacante.mana <
            poder.mana
        ) {

            socket.emit(
                "erroBatalha",
                "🔵 Mana insuficiente!"
            );

            return;
        }

        atacante.mana -= poder.mana;

        // ====================================
        // CALCULAR DANO
        // ====================================

        let dano =
            poder.dano +
            Math.floor(
                atacante.mago.ataque * 0.25
            );

        // Defesa reduz um pouco
        dano -=
            Math.floor(
                adversario.mago.defesa * 0.15
            );

        // Dano mínimo
        if (dano < 5) {

            dano = 5;

        }

        // ====================================
        // TIRAR VIDA
        // ====================================

        adversario.vida -= dano;

        if (adversario.vida < 0) {

            adversario.vida = 0;

        }

        console.log(
            "💥",
            atacante.mago.nome,
            "usou",
            dados.poder,
            "causando",
            dano,
            "de dano"
        );

        // ====================================
        // ENVIAR PARA ATACANTE
        // ====================================

        socket.emit(
            "ataqueRealizado",
            {
                poder: dados.poder,
                dano: dano,
                vidaOponente: adversario.vida,
                mana: atacante.mana
            }
        );

        socket.emit(
            "manaAtualizada",
            atacante.mana
        );

        // ====================================
        // ENVIAR PARA OPONENTE
        // ====================================

        io.to(adversarioId).emit(
            "ataqueRecebido",
            {
                poder: dados.poder,
                dano: dano,
                vida: adversario.vida
            }
        );

        io.to(adversarioId).emit(
            "vidaAtualizada",
            adversario.vida
        );

        // ====================================
        // MORTE
        // ====================================

        if (adversario.vida <= 0) {

            console.log(
                "💀 Jogador morreu:",
                adversarioId
            );

            io.to(codigo).emit(
                "jogadorMorreu",
                {
                    vencedor: socket.id,
                    derrotado: adversarioId
                }
            );

            // Esperar 3 segundos
            setTimeout(() => {

                if (!salas[codigo]) return;

                const jogador =
                    salas[codigo].estado[
                        adversarioId
                    ];

                if (!jogador) return;

                jogador.vida =
                    jogador.mago.vida;

                jogador.mana =
                    jogador.mago.mana;

                io.to(adversarioId).emit(
                    "voltarEscolhaMago"
                );

            }, 3000);

        }

    });

    // ========================================
    // CHAT
    // ========================================

    socket.on("mensagem", (texto) => {

        const codigo = socket.sala;

        if (!codigo) return;

        io.to(codigo).emit(
            "mensagem",
            {
                texto: String(texto)
            }
        );

    });

    // ========================================
    // PEDIR LISTA DE MAGOS
    // ========================================

    socket.on("pedirMagos", () => {

        socket.emit(
            "listaMagos",
            magos
        );

    });

    // ========================================
    // SAIR DA SALA
    // ========================================

    socket.on("sairSala", () => {

        removerJogador(socket);

    });

    // ========================================
    // DESCONECTOU
    // ========================================

    socket.on("disconnect", () => {

        console.log(
            "🔴 Jogador desconectou:",
            socket.id
        );

        removerJogador(socket);

    });

});

// ============================================
// REMOVER JOGADOR
// ============================================

function removerJogador(socket) {

    const codigo = socket.sala;

    if (!codigo) return;

    const sala = salas[codigo];

    if (!sala) return;

    sala.jogadores =
        sala.jogadores.filter(
            id => id !== socket.id
        );

    delete sala.estado[socket.id];

    socket.leave(codigo);

    socket.to(codigo).emit(
        "jogadorSaiu"
    );

    if (sala.jogadores.length === 0) {

        delete salas[codigo];

        console.log(
            "🗑️ Sala removida:",
            codigo
        );

    } else {

        io.to(codigo).emit(
            "jogadoresSala",
            sala.jogadores.length
        );

    }

    socket.sala = null;

}

// ============================================
// GERAR CÓDIGO DA SALA
// ============================================

function gerarCodigo() {

    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let codigo = "";

    for (let i = 0; i < 5; i++) {

        codigo +=
            caracteres[
                Math.floor(
                    Math.random() *
                    caracteres.length
                )
            ];

    }

    return codigo;

}

// ============================================
// LISTA DE MAGOS
// ============================================

app.get("/api/magos", (req, res) => {

    res.json(magos);

});

// ============================================
// STATUS DO SERVIDOR
// ============================================

app.get("/api/status", (req, res) => {

    res.json({

        online: true,

        jogadores: io.engine.clientsCount,

        salas: Object.keys(salas).length

    });

});

// ============================================
// INICIAR SERVIDOR
// ============================================

server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log("");
        console.log(
            "⚔️ ==============================="
        );

        console.log(
            "🧙 MAGIA LEGENDS ONLINE"
        );

        console.log(
            "🌐 Porta:",
            PORT
        );

        console.log(
            "👥 Servidor pronto!"
        );

        console.log(
            "⚔️ ==============================="
        );

        console.log("");

    }
);
