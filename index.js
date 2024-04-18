require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require ("./models/Usuario");
const Jogo = require ("./models/Jogo");

const express = require("express");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.get("/usuarios/novo",(req,res)=>{
    res.sendFile(`${__dirname}/views/formUsuario.html`);
});

app.post("/usuarios/novo", async (req,res) => {
    try{
    const nickname = req.body;
    const nome = req.body;

    const dadosUsuario = {
        nickname,
        nome,
    };

    const usuario = await Usuario.create(dadosUsuario);

res.send("Usuário inserido sob o id " + usuario.id);
}catch (error) {
    console.error("erro ao inserir usuário:",error);
    res.status(500).send("Erro ao inserir usuário")
               }
});


////
app.get("/jogos/novo",(req,res)=>{
    res.sendFile(`${__dirname}/views/formJogo.html`);
});

app.post("/jogos/novo", async (req,res) => {
    const jogoNickname = req.body.jogoNickname;
    const nome = req.body.nome;
    const valorJogo = req.body.valorJogo;
    const descricaoJogo = req.body.descricaoJogo;

    const dadosJogo = {
        jogoNickname,
        nome,
        valorJogo,
        descricaoJogo,

    };

    const jogo = await Jogo.create(dadosJogo);

res.send("Usuário inserido sob o id " + jogo.id);
});



app.listen(8000, () =>{
    console.log("Server rodando na porta 8000!")
})

conn
.authenticate()
.then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
}).catch((err) => {
    console.log("Ocorreu um erro:" + err);
});