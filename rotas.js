const express= require("express");
const app= express()
const bodyParser= require("body-parser")

// Config handlebars
const {engine}= require("express-handlebars")
app.engine('handlebars', engine({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

// Config Body- parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// banco de dados
const Sequelize= require("sequelize")
const sequelize= new Sequelize('notas', 'root', 'Jklx18xx!', {
    host: "localhost",
    dialect: "mysql"
})

const anotacao= sequelize.define('anotacoes',{
    titulo: {type:Sequelize.STRING},
    data:{type:Sequelize.DATE},
    texto: {type:Sequelize.TEXT},
    
})
//anotacao.sync({force:true})-> forçar criação da tabela 
anotacao.create(
    {
        titulo: "titulo",
        texto:"2025-06-11 14:30:00"
    }
) 
// '2025-06-11 14:30:00' -> exemplo válido de date-time -> pegar uma biblioteca date

// ROTAS -----------------------------------

app.get("/NovaNota", function(req,res){
    res.render('nota')
})






app.listen(8082, function(){
    console.log('Servidor rodando! ')
})