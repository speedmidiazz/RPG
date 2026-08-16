const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

const salas = {};

function gerarCodigo() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";

    for (let i = 0; i < 5; i++) {
        codigo += caracteres[
            Math.floor(Math.random() * caracteres.length)
        ];
    }

    return codigo;
}

io.on("connection", (socket) => {

    console.log("🟢 Jogador conectado:", socket.id);

    // ==============================
    // CRIAR SALA
    // ==============================

    socket.on("criarSala", () => {

        let codigo;

        do {
            codigo = gerarCodigo();
        } while (salas[codigo]);

        salas[codigo] = {
            jogadores: [],
            magos: {},
            vida: {}
        };

        salas[codigo].jogadores.push(socket.id);

        salas[codigo].vida[socket.id] = 100;

        socket.join(codigo);
        socket.sala = codigo;

        console.log("🏠 Sala criada:", codigo);

        socket.emit("salaCriada", codigo);

        io.to(codigo).emit(
            "jogadoresSala",
            salas[codigo].jogadores.length
        );
    });


    // ==============================
    // ENTRAR NA SALA
    // ==============================

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

        sala.vida[socket.id] = 100;

        socket.join(codigo);
        socket.sala = codigo;

        console.log(
            "🚪 Jogador entrou:",
            socket.id,
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

        if (sala.jogadores.length === 2) {

            io.to(codigo).emit(
                "batalhaComecou"
            );

            // Enviar vida inicial
            sala.jogadores.forEach(id => {

                io.to(id).emit(
                    "vidaAtualizada",
                    100
                );

            });
        }
    });


    // ==============================
    // ATAQUE
    // ==============================

    socket.on("atacarJogador", (dados) => {

        const codigo = socket.sala;

        if (!codigo) {
            return;
        }

        const sala = salas[codigo];

        if (!sala) {
            return;
        }

        // Encontrar o inimigo
        const inimigo = sala.jogadores.find(
            id => id !== socket.id
        );

        if (!inimigo) {

            socket.emit(
                "mensagem",
                {
                    texto:
                        "⚠️ Você ainda não tem adversário!"
                }
            );

            return;
        }

        let dano = Number(dados.dano) || 0;

        // Cura não causa dano
        if (dano < 0) {

            sala.vida[socket.id] =
                Math.min(
                    100,
                    sala.vida[socket.id] - dano
                );

            io.to(socket.id).emit(
                "vidaAtualizada",
                sala.vida[socket.id]
            );

            return;
        }

        // Tirar vida
        sala.vida[inimigo] -= dano;

        if (sala.vida[inimigo] < 0) {
            sala.vida[inimigo] = 0;
        }

        console.log(
            "⚔️",
            socket.id,
            "causou",
            dano,
            "de dano"
        );

        // Avisar o inimigo
        io.to(inimigo).emit(
            "ataqueRecebido",
            {
                poder: dados.poder,
                dano: dano
            }
        );

        // Atualizar HP do inimigo
        io.to(inimigo).emit(
            "vidaAtualizada",
            sala.vida[inimigo]
        );

        // Verificar morte
        if (sala.vida[inimigo] <= 0) {

            io.to(codigo).emit(
                "jogadorMorreu",
                {
                    vencedor: socket.id,
                    derrotado: inimigo
                }
            );

            console.log(
                "💀 Jogador derrotado:",
                inimigo
            );

            return;
        }
    });


    // ==============================
    // ESCOLHER MAGO
    // ==============================

    socket.on("escolherMago", (mago) => {

        const codigo = socket.sala;

        if (!codigo || !salas[codigo]) {
            return;
        }

        salas[codigo].magos[socket.id] = mago;

        socket.to(codigo).emit(
            "magoEscolhido",
            mago
        );
    });


    // ==============================
    // CHAT
    // ==============================

    socket.on("mensagem", (texto) => {

        const codigo = socket.sala;

        if (!codigo) {
            return;
        }

        io.to(codigo).emit(
            "mensagem",
            {
                texto: String(texto)
            }
        );
    });


    // ==============================
    // DESCONECTAR
    // ==============================

    socket.on("disconnect", () => {

        const codigo = socket.sala;

        console.log(
            "🔴 Jogador desconectou:",
            socket.id
        );

        if (!codigo || !salas[codigo]) {
            return;
        }

        const sala = salas[codigo];

        sala.jogadores =
            sala.jogadores.filter(
                id => id !== socket.id
            );

        delete sala.vida[socket.id];
        delete sala.magos[socket.id];

        socket.to(codigo).emit(
            "jogadorSaiu"
        );

        if (sala.jogadores.length === 0) {

            delete salas[codigo];

        } else {

            io.to(codigo).emit(
                "jogadoresSala",
                sala.jogadores.length
            );
        }
    });

});


server.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            "🧙 MAGIA LEGENDS ONLINE"
        );

        console.log(
            "🌐 Porta:",
            PORT
        );

    }
);
