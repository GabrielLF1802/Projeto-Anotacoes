async function deletarAnotacao(id){
    try{
        const anotac= await fetch (`/anotacao/${id}`,{
            method: 'DELETE'
        })
        if (anotac.ok){
            console.log('Deletado com sucesso')
            window.location.reload()
        }else{
            console.log('Erro ao deletar a nota')
        }
}catch(erro){
    console.log(erro)
}
}