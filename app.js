const express = require('express');
const lista_produtos = require('./produtos');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/produtos', (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type','application/json;charset=utf-8');
    res.end(JSON.stringify({
        lista_produtos
    }));
   
});

app.get('/produtos/:id', (req, res) => {

    let id = req.params.id;

    let produto = lista_produtos.produtos.filter(u => u.id == id);

    if(produto.length == 0) {
        res.statusCode = 400;
        res.end('Produto não encontrado');
        return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type','application/json;charset=utf-8');
    res.end(JSON.stringify({
        produto
    }));
   
});

app.post('/produtos', (req, res) => {

    let lista_id = lista_produtos.produtos.map(p => p.id);

    let maiorId = lista_id.reduce((maiorId,idAtual) => idAtual > maiorId ? idAtual : maiorId);

    if(req.body.descricao && req.body.valor && req.body.marca) {

        let novoProduto = {
            id: maiorId+1,
            descricao: req.body.descricao,
            valor: req.body.valor,
            marca: req.body.marca
        }

        lista_produtos.produtos.push(novoProduto);

        res.statusCode = 201;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end(JSON.stringify({
            novoProduto
        }));

    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end("Necessário passar no body os campos: descricao, valor e marca");
    }
   
});

app.delete('/produtos/:id', (req, res) => {

    let id = req.params.id;

    const produtoIndex = lista_produtos.produtos.findIndex(u => u.id == id);

    lista_produtos.produtos.splice(produtoIndex,produtoIndex);

    res.statusCode = 204;
    res.end();
       
});

app.put('/produtos/:id', (req, res) => {

    let id = req.params.id;

    const produtoIndex = lista_produtos.produtos.findIndex(u => u.id == id);

    if(produtoIndex == -1) {
        res.statusCode = 400;
        res.end('Produto não encontrado');
        return;
    }

    if(req.body.descricao && req.body.valor && req.body.marca) {

        let produto = lista_produtos.produtos[produtoIndex];

        produto.descricao = req.body.descricao;
        produto.valor = req.body.valor;
        produto.marca = req.body.marca;

        res.statusCode = 200;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end(JSON.stringify({
            produto
        }));

    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type','application/json;charset=utf-8');
        res.end("Necessário passar no body os campos:  descricao, valor e marca");
    }
   
});


module.exports = app;
