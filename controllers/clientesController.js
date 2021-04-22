const Cliente = require('../models/clientes')

module.exports = app => {
    app.get('/clientes', (req, res) => { // função para listar clientes
        Cliente.lista(res)
    })

    app.get('/clientes/:id', (req, res) => { // função de buscar clientes por ID 
        const id = parseInt(req.params.id)

        Cliente.buscaPorId(id, res)
    })

    app.post('/clientes', (req, res) => { // função para adcionar clientes
       const cliente = req.body

        Cliente.adiciona(cliente, res)
    }) 

    app.patch('/clientes/:id', (req, res) => { // função para alterar cliente
        const id = parseInt(req.params.id)
        const valores = req.body

        Cliente.altera(id, valores, res)
    })

    app.delete('/clientes/:id', (req, res) => { // função para deletar cliente
        const id = parseInt(req.params.id)

        Cliente.deleta(id, res)
    })
}