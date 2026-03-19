const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const path = require("path");
const { Z_DATA_ERROR } = require("zlib");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodelogin'
});

const app = express();

const crypto = require('crypto');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUnintialized: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {

        // Gera o hash SHA-256 da senha informada
        const hash = crypto.createHash('sha256').update(password).digest('hex');

        // Busca o usuário com a senha criptografada
        connection.query(
            'SELECT * FROM accounts WHERE username = ? AND password = ?',
            [username, hash],
            function(error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect('/home');
                } else {
                    response.send('Usuário ou senha incorretos!');
                }
                response.end();
            }
        );

    } else {
        response.send('Informe usuário e senha!');
        response.end();
    }
});

app.get('/home', function(request,response){
    if(request.session.loggedin){
        response.sendFile(path.join(__dirname + '/static/home.html'));
    }else {
        response.redirect('/');
    }
});

app.get('/logout', function(request,response){
    request.session.destroy((err) => {
        if (err){
            return responde.send('Erro ao encerrar a sessao.');
        }
        response.redirect('/')
    });
})


app.listen(1950);