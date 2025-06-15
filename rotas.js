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
app.use(express.static('public'))


// banco de dados
const Sequelize= require("sequelize")
const sequelize= new Sequelize('notas', 'root', 'Jklx18xx!', {
    host: "localhost",
    dialect: "mysql"
})

const anotacao= sequelize.define('anotacoes',{
    titulo: {
        type:Sequelize.STRING
    },
    texto: {
        type:Sequelize.TEXT
    },
    
})
//anotacao.sync({force:true})-> forçar criação da tabela 
/* anotacao.create(
    {
        titulo: "titulo",
        texto:"2025-06-11 14:30:00"
    }
)  */
// '2025-06-11 14:30:00' -> exemplo válido de date-time -> pegar uma biblioteca date

// ROTAS -----------------------------------

app.get("/NovaNota", function(req,res){
    res.render('nota')
})
app.get("/Nota/:id", async(req,res)=>{
    try{
        const id= req.params.id
        const nota = await anotacao.findByPk(id)
        if (nota){
            res.render('notaaberta', {nota: nota.toJSON()})
        }else{
            res.status(404).send('Item inválido')
        }
    }catch(erro){
        send(erro)
    }
})
app.get("/delet/:id", function(req,res){
    anotacao.destroy({where:{'id':req.params.id}}).then(function(){
        res.send('Nota Deletada com sucesso')
    }).catch(function(){
        res.send(erro)
    })
})


app.get("/anotacao", function(req,res){
    anotacao.findAll().then(function(notas){
        const notalimpa= notas.map(nota=> nota.toJSON())
        res.render('anotacao',{nota: notalimpa})
    })
})
app.post("/add", function(req,res){
    anotacao.create({
        titulo: req.body.titulo,
        data: req.body.data,
        texto: req.body.texto
    }).then(function(){
        res.redirect('/anotacao')
    }).catch(function(erro){
        res.send(`Erro! ${erro}`)
    })
})

// Pegar info do banco de dados:





app.listen(8081, function(){
    console.log('Servidor rodando! ')
})