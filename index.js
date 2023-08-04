const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Body Parser é usado para traduzir os dados do formulário para o JS
const connection = require("./db/db");
const Pergunta = require("./db/pergunta"); // model 
const Resposta = require("./db/Resposta");

//database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

//bodyParser
app.use(bodyParser.urlencoded({extended: false})) // Traduz os dados do formulário
app.use(bodyParser.json());

//rotas
app.get("/", function(req , res){
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(perguntas => { // equivale a select * from pergunta
        res.render("index.ejs", { 
            perguntas: perguntas
        }); 
    });
});

app.get("/perguntar", function(req, res){
    res.render("perguntar.ejs");
});

app.post("/salvarpergunta", function(req, res){ // POST usado geralmente para receber dados de formulários
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.render("formularioPergunta.ejs")
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    })
});

app.get("/pergunta/:id",(req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {id: pergunta.id}
            }).then(respostas => {
                res.render("pergunta.ejs", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else { // Não encontrada
            res.redirect("/");
        }
    });
});

app.post("/responder", (req, res) => {
    let descricao = req.body.descricao;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        descricao: descricao,
        perguntaId: perguntaId
    }).then(() => {
    res.render("formularioResposta.ejs");
    });
});

app.listen(8080, function(){
    console.log("Aplicação rodando");
});