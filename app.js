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
/* async function deletarAnotacao(id){
    try{
        const anotac= await fetch (`/anotacao/${id}`,{
            method: 'DELETE'
        })
        if (anotac.ok){
            window.alert('Deletado com sucesso')
        }else{
            window.alert('Erro ao deletar a nota')
        }
}catch(erro){
    window.alert(erro)
}
} */


app.delete("/anotacao/:id", async(req,res)=>{
    try{
        const {id} = req.params
        
        const delet= await anotacao.destroy({where: {id}})
        if (delet){
            res.status(200).send('Deletado com sucesso')
        }else{
            res.status(404).send('Não encontrada')
        }

    }catch(erro){
        res.status(500).send('Erro interno no server')
    }
})

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