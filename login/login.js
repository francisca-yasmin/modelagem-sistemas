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

app.post('/auth', function(request, response){
    let username = request.body.username;
    let password = request.body.password;

    if(username && password){
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if (error) throw error;
            if(results.lengt > 0){
                request.session.loggedin = true;
                request.session.username = username; //deixar mais dinamico
                response.redirect('/home');
            }else {
                response.send('usuário ou senha incoretos')
            }
            response.end();
        });   
    }else{
        response.send('preencha o usuario e a senha');
        response.end();
    }
)};

app.get('/home', function(request, response){
    if(request.session.loggedin){
        response.send('bem vindo, ' + request.session.username + '!');
    }else{
        response.send('faça o login para acessar essa pagina!!');
    }
    response.end();
});

app.listen(3001);
