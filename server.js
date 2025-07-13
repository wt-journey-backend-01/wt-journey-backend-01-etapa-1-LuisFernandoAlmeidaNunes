const express = require('express');
const morgan = require("morgan")

const path = require('path');
const lanches = require('./public/data/lanches.json');
const { error } = require('console');


const app = express();
const PORT = 3000;

app.use(morgan("common"));

app.use(express.urlencoded({ extended: true }));

//metodos GET
app.get('/', express.static(path.join(__dirname, 'views')));

app.get('/sugestao', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'agradecimentos.html'));
})

app.get('/contato', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
})

app.get('/contato-recebido', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato-recebido.html'));
});

app.get("/api/lanches", (req, res) => {
    res.json(lanches);
});



// metodos POST
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).sendFile(path.join(__dirname, 'views', '404.html'));
    }

    const queryParams = new URLSearchParams({
        nome,
        email,
        assunto,
        mensagem
    }).toString();

    res.redirect(`/contato-recebido?${queryParams}`);
});

// metodos USE
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});


// index.js
// const { error } = require('console');
// const express = require('express');
// const app = express();
// const port = 3000;
// // app.use(express.static(path.join(__dirname,'public')));

// app.use(express.json());

// app.get('/', 
// });

// app.post('/login', (req, res) => {
//     if (!req.header('x-auth-token')) {
//         return res.status(401).send({error: 'Unauthorized'});
//     }
//     if (req.header('x-auth-token') != "secret-token"){
//         return res.status(403).send({error: 'Forbidden'});
//     }
//     res.status(201).send({message: `Welcome, ${req.body.username}`}); 
// });