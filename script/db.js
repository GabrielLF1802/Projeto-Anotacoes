const Sequelize= require('sequelize')
const sequelize= new Sequelize('notas', 'root', 'Jklx18xx!', {
    host: "localhost",
    dialect: "mysql"
})

const anotacao= sequelize.define('anotacoes',{
    titulo: {type:Sequelize.STRING},
    conteudo: {type:Sequelize.TEXT}
})

//anotacao.sync({force:true})


