const sequelize = require("sequelize");
const connection = require("./db");

const Resposta = connection.define("respostas", {
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => 
    {console.log("Tabela Resposta criada com sucesso!")
})
.catch(() => {
    console.log("Erro ao criar tabela Resposta!");
});

module.exports = Resposta;
