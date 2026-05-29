const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas",{
    corpo: {
        type: Sequilize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTERGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;