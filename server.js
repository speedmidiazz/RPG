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

    // CRIAR SALA
    socket.on("criarSala", () => {

        let codigo;

        do {
            codigo = gerarCodigo();
        } while (salas[codigo]);

        salas[codigo] = {
            jogadores: [],
            magos: {}
        };

        salas[codigo].jogadores.push(socket.id);

        socket.join(codigo);
        socket.sala = codigo;

        console.log("🏠 Sala criada:", codigo);

        socket.emit("salaCriada", codigo);

        io.to(codigo).emit(
            "jogadoresSala",
            salas[codigo].jogadores.length
        );
    });


    // ENTRAR NA SALA
    socket.on("entrarSala", (codigo) => {

        codigo = String(codigo).trim().toUpperCase();

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
            "🚪 Jogador entrou na sala:",
            codigo
        );

        socket.emit("entrouSala", codigo);

        io.to(codigo).emit(
            "jogadoresSala",
            sala.jogadores.length
        );

        if (sala.jogadores.length === 2) {
            io.to(codigo).emit("batalhaComecou");
        }
    });


    // ESCOLHER MAGO
    socket.on("escolherMago", (mago) => {

        const codigo = socket.sala;

        if (!codigo || !salas[codigo]) {
            return;
        }

        salas[codigo].magos[socket.id] = mago;

        console.log(
            socket.id,
            "escolheu",
            mago.nome
        );

        socket.to(codigo).emit(
            "magoEscolhido",
            mago
        );
    });


    // ATAQUE
    socket.on("atacarJogador", (dados) => {

        const codigo = socket.sala;

        if (!codigo) {
            return;
        }

        console.log("⚔️ Ataque:", dados);

        socket.to(codigo).emit(
            "ataqueRecebido",
            dados
        );
    });


    // CHAT
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


    // DESCONEXÃO
    socket.on("disconnect", () => {

        console.log(
            "🔴 Jogador desconectou:",
            socket.id
        );

        const codigo = socket.sala;

        if (!codigo || !salas[codigo]) {
            return;
        }

        const sala = salas[codigo];

        sala.jogadores =
            sala.jogadores.filter(
                id => id !== socket.id
            );

        delete sala.magos[socket.id];

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
    });
});


server.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("⚔️ ===============================");
    console.log("🧙 MAGIA LEGENDS ONLINE");
    console.log(`🌐 Porta: ${PORT}`);
    console.log("⚔️ ===============================");
    console.log("");

});
