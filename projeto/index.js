const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    
    //variaveis
    var nome = "fran";
    var lang = "js";
    var exibirMsg = false;

    res.render("index", {
        nome: nome,
        lang: lang,
        alunos: 40,
        msg: exibirMsg
    });
});

app.listen(8080, () => {
    console.log("app rodando!!");
});

