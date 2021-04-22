const Wishlist = require('../models/wishlist')

module.exports = app => {
    app.get('/wishlist', (req, res) => { // função para listar produtos favoritos
        Wishlist.lista(res)
    })

    app.get('/wishlist/:id', (req, res) => { // função de buscar produtos favoritos por ID 
        const id = parseInt(req.params.id)

        Wishlist.buscaPorId(id, res)
    })

    app.post('/wishlist', (req, res) => { // função para adicionar produtos favoritos
       const wishlist = req.body

       Wishlist.adiciona(wishlist, res)
    }) 

    app.patch('/wishlist/:id', (req, res) => { // função para alterar produtos favoritos
        const id = parseInt(req.params.id)
        const valores = req.body

        Wishlist.altera(id, valores, res)
    })

    app.delete('/wishlist/:id', (req, res) => { // função para deletar produtos favoritos
        const id = parseInt(req.params.id)

        Wishlist.deleta(id, res)
    })
}