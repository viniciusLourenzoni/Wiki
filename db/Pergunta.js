const sequelize = require("sequelize");
const connection = require("./db");

//model » Representa tabela em JS
const Pergunta = connection.define('pergunta', {
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => 
    {console.log("Tabela Pergunta criada com sucesso!")
})
.catch(() => {
    console.log("Erro ao criar tabela Pergunta!");
});

module.exports = Pergunta;
