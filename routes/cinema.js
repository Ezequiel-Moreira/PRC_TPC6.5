var express = require('express')
var router = express.Router()
var Cinema = require('../controllers/cinema')



function transformData(dados){
  var dataFromQuery = dados.results.bindings
  var resultArray = []
  for(var i=0;i<dataFromQuery.length;i++){
    var datapoint = dataFromQuery[i]
    var keysDatapoint = Object.keys(datapoint)
    var valuesDatapoint = Object.values(datapoint)
    var correctedDatapoint = {}
    for(var j=0;j<keysDatapoint.length;j++){
      var currentDatapointKey = keysDatapoint[j]
      var currentDatapointValue = valuesDatapoint[j].value
      correctedDatapoint[currentDatapointKey] = currentDatapointValue
    }
    resultArray.push(correctedDatapoint)
  }
  return resultArray
} 


//---------------------------------FILMES-------------------------------------------------
router.get('/filmes', async function(req, res) {
  try {
    const dados = await Cinema.listarFilmes() 
    res.jsonp( transformData(dados) )
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos filmes: " + err) 
  }
})


router.get('/filmes/:id', async function(req, res) {
  try {
    const dados = await Cinema.infoFilme(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem do filme: " + err) 
  }
})


router.get('/filmes/:id/anos', async function(req, res) {
  try {
    const dados = await Cinema.filmeAnos(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem do ano do filme: " + err) 
  }
})


router.get('/filmes/:id/atores', async function(req, res) {
  try {
    const dados = await Cinema.filmeAtores(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos atores do filme: " + err) 
  }
})


router.get('/filmes/:id/generos', async function(req, res) {
  try {
    const dados = await Cinema.filmeGeneros(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos géneros do filme: " + err) 
  }
})






//---------------------------------Atores-------------------------------------------------
router.get('/atores', async function(req, res) {
  try {
    const dados = await Cinema.listarAtores() 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos atores: " + err) 
  }
})


router.get('/atores/:id', async function(req, res) {
  try {
    const dados = await Cinema.infoAtor(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem de info do ator: " + err) 
  }
})


router.get('/atores/:id/filmes', async function(req, res) {
  try {
    const dados = await Cinema.atorFilmes(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos filmes do ator: " + err) 
  }
})






//---------------------------------Géneros-------------------------------------------------
router.get('/generos', async function(req, res) {
  try {
    const dados = await Cinema.listarGeneros() 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos generos: " + err) 
  }
})


router.get('/generos/:id/filmes', async function(req, res) {
  try {
    const dados = await Cinema.generosFilmes(req.params.id) 
    res.jsonp( transformData(dados) ) 
  }
  catch (err) {
    res.status(500).send("Erro na listagem dos generos do filme: " + err) 
  }
})



module.exports = router
