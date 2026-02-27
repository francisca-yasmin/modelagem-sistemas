const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true, //salva informacoes no hook
    saveUninitialized: true //cria a sessao mesmo sem informacao 
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.json(__dirname, 'static')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+ '/login.html'))
});

app.listen(3001);