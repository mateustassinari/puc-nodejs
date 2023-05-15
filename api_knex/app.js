const express = require('express');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const db = require("./db.js"); 

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","*");
    res.header("Access-Control-Allow-Headers","*");
    next();
})

const checkToken = (req, res, next) => {
    let authInfo = req.get('authorization')
    if (authInfo) {
      const [bearer, token] = authInfo.split(' ')
      
      if (!/Bearer/.test(bearer)) {
        res.status(400).json({ message: 'Tipo de token esperado não informado...', error: true })
        return 
      }
  
      jwt.verify(token, process.env.SECRET_KEY, (err, decodeToken) => {
          if (err) {
              res.status(401).json({ message: 'Acesso expirado'})
              return
          }
          req.roles = decodeToken.roles
          next()
      })
    } 
    else
      res.status(401).json({ message: 'Acesso negado'})
  }
  
const isAdmin  = (req, res, next) => {
    if (req.roles?.split(';').includes('ADMIN')){
        next()
    }
    else {
        res.status(403).json({ message: 'Acesso negado'})
    }
}

app.post('/seguranca/register', function (req, res) {
    db('usuarios').insert({
          nome: req.body.nome, 
          login: req.body.login, 
          senha: bcrypt.hashSync(req.body.senha, 8), 
          email: req.body.email,
          roles: !req.body.roles ? "USER" : req.body.roles
      }, ['id'])
      .then((result) => {
          let usuario = result[0]
          res.status(200).json({
            "message": "Usuário inserido com sucesso",
            "id": usuario.id }) 
          return
      })
      .catch(err => {
          res.status(500).json({ 
              message: 'Erro ao registrar usuario - ' + err.message })
      })  
});

app.post('/seguranca/login', function (req, res) {
    
    db.select('*').from('usuarios').where( { login: req.body.login })
    .then( usuarios => {
        if(usuarios.length){
            let usuario = usuarios[0]
            let checkSenha = bcrypt.compareSync (req.body.senha, usuario.senha)
            if (checkSenha) {
               var tokenJWT = jwt.sign({ id: usuario.id, roles: usuario.roles }, 
                    process.env.SECRET_KEY, {
                      expiresIn: 3600
                    })
  
                res.status(200).json ({
                    id: usuario.id,
                    login: usuario.login, 
                    nome: usuario.nome, 
                    roles: usuario.roles,
                    token: tokenJWT
                })  
                return 
            }
        }
          
        res.status(401).json({ message: 'Login ou senha incorretos' })
    })
    .catch (err => {
        res.status(500).json({ 
           message: 'Erro ao verificar login - ' + err.message })
    })
  
})

app.get('/times', checkToken, (req, res) => {

    db.select('*').from('times')
    .then (times => res.json(times))
    .catch (err => res.json ({ message: `Erro ao recuperar times: ${err.message}` }))
   
});

app.get('/times/:id', checkToken, (req, res) => {

    let id = req.params.id;

    db.select('*').from('times').where({ id })
    .then (times => { 
        if(times.length == 0) { 
            res.statusCode = 404; 
            res.json({ message: "Time não encontrado" }) 
        } else {
            let time = times[0]
            res.json(time)
        } 
    })
    .catch (err => res.json ({ message: `Erro ao recuperar time: ${err.message}` }))

});

app.post('/times', checkToken, isAdmin, (req, res) => {

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

app.delete('/times/:id', checkToken, isAdmin, (req, res) => {

    let id = req.params.id;

    db('times').del().where({ id })
    .then (result => { res.statusCode = 204; res.end(); })
    .catch (err => res.json ({ message: `Erro ao deletar time: ${err.message}` }))
       
});

app.put('/times/:id', checkToken, isAdmin, (req, res) => {

    let id = req.params.id;

    if(req.body.nome && req.body.local) {

        db('times').update({nome: req.body.nome, local: req.body.local, apelido: req.body.apelido },['id', 'nome','local','apelido']).where({ id })
        .then (times => {
            if(times.length == 0) { 
                res.statusCode = 404; 
                res.json({ message: "Time não encontrado" }) 
            } else {
                let time = times[0]
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
