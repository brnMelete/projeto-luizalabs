const Produto = require('../models/produtos')

module.exports = app => {

    app.get('/produtos', (req, res) => { // função de listar produtos
        Produto.lista(res)
    })

    app.get('/produtos/:id', (req, res) => { // função de buscar produtos por id
        const id = parseInt(req.params.id)

        Produto.buscaPorId(id, res)
    })

    app.post('/produtos', (req, res) => { // função de adcionar produtos
       const produto = req.body

        Produto.adiciona(produto, res)
    }) 

    app.patch('/produtos/:id', (req, res) => { // função para alterar produtos
        const id = parseInt(req.params.id)
        const valores = req.body

        Produto.altera(id, valores, res)
    })

    app.delete('/produtos/:id', (req, res) => { // função para deletar produtos
        const id = parseInt(req.params.id)

        Produto.deleta(id, res)
    })
}