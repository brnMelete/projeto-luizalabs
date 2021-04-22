const conexao = require('../infraestrutura/conexao');
const wishlist = require('../infraestrutura/tables')

class Wishlist {
    adiciona(wishlist, res){ // Inserindo produtos na tabela

    const sql = 'INSERT INTO Wishlist SET ?' // inserindo os produtos na lista

    conexao.query(sql, wishlist, (erro, resultados) => {
        if(erro) {
            res.status(400).json(erro)
        } else {
            res.status(201).json(resultados)
        }
    })
            
    }

    lista(res) {
        
        const sql = 'SELECT * FROM Wishlist' //Listando produtos favoritos

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) { // Buscando produtos pelo ID
        const sql = `SELECT * FROM Wishlist WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const produto = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(produto)
            }
        })
    }

    altera(id, valores, res) { // Alterando produtos favoritos
    
        const sql = 'UPDATE Wishlist SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) { // Deleta produtos pelo ID
        const sql = 'DELETE produto_id FROM Wishlist WHERE id=?' // deletando o item da lista de produtos favoritos atrvés de seu ID

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Wishlist