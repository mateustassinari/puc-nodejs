const express = require('express');
const db = require("./db.js"); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/times', (req, res) => {

    db.select('*').from('times')
    .then (times => res.json(times))
    .catch (err => res.json ({ message: `Erro ao recuperar times: ${err.message}` }))
   
});

app.get('/times/:id', (req, res) => {

    let id = req.params.id;

    db.select('*').from('times').where({ id })
    .then (time => { 
        if(time.length == 0) { 
            res.statusCode = 404; 
            res.json({ message: "Time não encontrado" }) 
        } else {
            res.json(time)
        } 
    })
    .catch (err => res.json ({ message: `Erro ao recuperar time: ${err.message}` }))

});

app.post('/times', (req, res) => {

    if(req.body.nome && req.body.local) {

        db('times').insert(req.body,['id', 'nome','local','apelido'])
        .then (times => {
            
            let novoTime = {
                id: times[0].id,
                descricao: times[0].nome,
                valor: times[0].local,
                marca: times[0].apelido
            }

            res.statusCode = 201;
            res.json(novoTime)

        })
        .catch (err => res.json ({ message: `Erro ao inserir time: ${err.message}` }))

    } else {
        res.statusCode = 400;
        res.json({ message: "Necessário passar no body os campos obrigatórios: nome, local" });
    }
   
});

app.delete('/times/:id', (req, res) => {

    let id = req.params.id;

    db('times').del().where({ id })
    .then (result => { res.statusCode = 204; res.end(); })
    .catch (err => res.json ({ message: `Erro ao deletar time: ${err.message}` }))
       
});

app.put('/times/:id', (req, res) => {

    let id = req.params.id;

    if(req.body.nome && req.body.local) {

        db('times').update({nome: req.body.nome, local: req.body.local, apelido: req.body.apelido },['id', 'nome','local','apelido']).where({ id })
        .then (time => {
            if(time.length == 0) { 
                res.statusCode = 404; 
                res.json({ message: "Time não encontrado" }) 
            } else {
                res.json(time)
            } 
        }) 
        .catch (err => res.json ({ message: `Erro ao atualizar time: ${err.message}` }))

    } else {
        res.statusCode = 400;
        res.json({ message: "Necessário passar no body os campos obrigatórios: nome, local" });
    }
   
});


module.exports = app;
