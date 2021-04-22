const conexao = require('../infraestrutura/conexao');

class Produto {
    adiciona(produto, res){ // Inserindo produtos na tabela

        const produtoEhValido = produto.title.length >= 5
        const precoEhValido = produto.price > 0
        
        
        

        const validacoes = [
            {
                nome: 'nome',
                valido: produtoEhValido,
                mensagem: 'Produto deve ter pelo menos cinco caracteres'
            },
            {
                nome: 'price',
                valido: precoEhValido,
                mensagem: 'Preço deve ser maior que 0'
            }
        ]
        
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const sql = 'INSERT INTO Produtos SET ?'
    
            conexao.query(sql, produto, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
            
    }

    lista(res) {
        
        const sql = 'SELECT * FROM Produtos' //Listando produtos

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) { // Buscando produtos pelo ID
        const sql = `SELECT * FROM Produtos WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const produto = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(produto)
            }
        })
    }

    altera(id, valores, res) { // Alterando produtos
    
        const sql = 'UPDATE Produtos SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) { // Deleta produtos pelo ID
        const sql = 'DELETE FROM Produtos WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Produto