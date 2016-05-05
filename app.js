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
    sobrenome: String
});


/*PASSO 3.1[optional] - Criando metodos para o schema
                        Deve ser antes da criação do Modelo
                        Para que assim ao criar o modelo, o método possa existir
*/
schema.methods.nomeCompleto = function () {
    return this.nome + ' ' + this.sobrenome;
};



/*
PASSO 4 - Compilando o Schema para dentro de um modelo
          Models é uma classe com o qual nós construimos os documentos
*/
var Modelo = mongoose.model('Modelo', schema);


//PASSO 5 - Criando um documento
var documento = new Modelo({nome: 'Leandro', sobrenome: "Budau de Moraes"});


//PASSO 6 - Exibindo os dados
console.log('Nome: ', documento.nome);
console.log('Sobrenome: ', documento.sobrenome);
console.log('Nome completo: ' + documento.nomeCompleto());

//PASSO 7 - Salvando o documento no banco de dados
documento.save(function (err, documento) {
    if(err) return console.erro(err);
    console.log('Documento salvo com sucesso');
});




app.listen(3000, function () {
    console.log('\nRunning project in port 3000');
});






