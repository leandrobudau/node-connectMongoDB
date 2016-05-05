var express  = require('express');
var mongoose = require('mongoose');

var app = express();

//PASSO 1 - Conectando com o banco MongoDB
mongoose.connect('mongodb://localhost/test');



//PASSO 2 - VALIDANDO SE FOI CONECTADO COM SUCESSO
var db = mongoose.connection;
db.on('error', function () {
    console.log('Occorreu um erro durante a tentativa de conectar com o banco MongoDB');
});
db.once('open', function () {
    console.log('Conectado com o bando MongoDB')
});


//PASSO 3 - Criando um schema para depois criar um modelo de dados
var schema = mongoose.Schema({
    nome: String,
    telefone: String
});

/*
PASSO 4 - Compilando o Schema para dentro de um modelo
          Models é uma classe com o qual nós construimos os documentos
*/
var Modelo = mongoose.model('Modelo', schema);


//PASSO 5 - Criando um documento
var document = new Modelo({nome:"Leandro", telefone:"(11) 1234-5678"});


//PASSO 6 - Exibindo os dados
console.log("Nome: ", document.nome);
console.log("Telefone: ", document.telefone);


app.listen(3000, function () {
    console.log('\nRunning project in port 3000');
});