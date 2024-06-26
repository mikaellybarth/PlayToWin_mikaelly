require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require ("./models/Usuario");
const Jogo = require ("./models/Jogo");

const express = require("express");
const exphbs = require("express-handlebars")

//instalacao do servidor:
const app = express();

//vinculação do handlebars ao express:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
    express.urlencoded({
        extended: true,
    })
)

///////paginas
app.use(express.json());

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/usuarios", async (req,res)=>{
  
    const usuarios = await Usuario.findAll({ raw: true });

    res.render("usuarios", { usuarios });
});

app.get("/usuarios/novo",(req,res)=>{
    res.render("formUsuario");
});


app.post("/usuarios/novo", async (req, res) => {
    try {
        const { nickname, nome } = req.body;
        
        const dadosUsuario = {
            nickname,
            nome,
        };
        const usuario = await Usuario.create(dadosUsuario);

        res.send("Usuário inserido sob o id " + usuario.id);
    } catch (error) {
        console.error("Erro ao inserir usuário:", error);
        res.status(500).send("Erro ao inserir usuário");
    }
});


app.get("/jogos/novo", (req, res) => {
    res.sendFile(`${__dirname}/views/formJogo.html`);
});

app.post("/jogos/novo", async (req, res) => {
    try {
        const { nome, valorJogo, descricaoJogo} = req.body;
        
        const dadosJogo = {
            nome,
            valorJogo, 
            descricaoJogo,
        };
        const jogo = await Jogo.create(dadosJogo);
        console.log(jogo)

        res.send("Jogo inserido sob o id " + jogo.id);
    } catch (error) {
        console.error("Erro ao inserir jogo:", error);
        res.status(500).send("Erro ao inserir jogo");
    }
});


app.listen(8000, () =>{
    console.log("Server rodando na porta 8000!")
})

conn
.sync()
.then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
}).catch((err) => {
    console.log("Ocorreu um erro:" + err);
});