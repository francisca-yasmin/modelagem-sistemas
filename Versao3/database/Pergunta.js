// modulo - pra criar tabela

const Sequelize = require("Sequelize");
const connection = require("./database");

const Pergunta = connection.define('perguntas', { //criar tabela pergunta com duas colunas
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//se a tabela nao existir = ele cria
// se tabela existir = ele nao cria 
Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada já")
});

module.exports = Pergunta; 