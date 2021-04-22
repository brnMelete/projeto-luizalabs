const conexao = require('../infraestrutura/conexao')
const mysql = require('mysql2/promise');
const  { body, validatorResult } = require('express') // importando biblioteca de validações



class Cliente {
    adiciona(cliente, res) { // Inserindo clientes na tabela
        const clienteEhValido = cliente.nome.length >= 5



        const validacoes = [
            {
                nome: 'nome',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]


        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        } else {

            const sql = 'INSERT INTO Clientes SET ?'
    
            conexao.query(sql, cliente, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            })
        }
       
    }

    lista(res) { // Listando clientes
        
        const sql = 'SELECT * FROM Clientes'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) { // Buscando clientes pelo ID
        const sql = `SELECT * FROM Clientes WHERE id=${id}`

        conexao.query(sql, (erro, resultados) => {
            const cliente = resultados[0]
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(cliente)
            }
        })
    }

    altera(id, valores, res) { // Alterando clientes
    
        const sql = 'UPDATE Clientes SET ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deleta(id, res) { // Deleta clientes pelo ID
        const sql = 'DELETE FROM Clientes WHERE id=?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Cliente