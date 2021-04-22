class Tabelas {
    init(conexao) {
        this.conexao = conexao
        
        this.criarProdutos()
        this.criarClientes()
        this.criarWishlist()
    }

    criarClientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS Clientes (id int NOT NULL AUTO_INCREMENT, nome varchar(50),' 
                  + 'email varchar(50), PRIMARY KEY (id), UNIQUE INDEX email_UNIQUE (email ASC))'
                  // criando a tabela clientes já com a validação de email duplicado

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Clientes criada com sucesso')
            }
        })
    }

    criarProdutos() { // criando tabela produtos
        const sql = 'CREATE TABLE IF NOT EXISTS Produtos (id int NOT NULL AUTO_INCREMENT, title varchar(20), '
                  + 'price double, image varchar(50), brand varchar(20), reviewscore double, PRIMARY KEY (id))'
        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Produtos criada com sucesso')
            }
        })
    }

    criarWishlist() { // criando tabela de produtos favoritos
        const sql = 'CREATE TABLE IF NOT EXISTS Wishlist (cliente_id int NOT NULL, produto_id int NOT NULL,'
                    + 'INDEX fk_produto_idx (cliente_ ASC) VISIBLE,'
                    + 'CONSTRAINT fk_produto FOREIGN KEY (cliente_id) REFERENCES Clientes (id))' // referenciando as chaves estrangeiras de cliente e produto (sempre utilizando o ID)


        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Wishlist criada com sucesso')
            }
        })
    }
}





module.exports = new Tabelas