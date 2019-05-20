var axios = require('axios')
const Cinema = module.exports


async function execQuery(query){
  try{
    var encoded = encodeURIComponent(query)
    var response = await axios.get("http://localhost:7200/repositories/cinema" + '?query=' + encoded)
    return (response.data)
  }
  catch(error){
    return("Erro" + error)
  }
}



//---------------------------------FILMES-------------------------------------------------

Cinema.listarFilmes = async () => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select * where { 
      ?s a :Filme .
        ?s :título ?tit .
        ?s  :ano ?ano  .
    } 
    order by desc(?ano) ?tit
  `
  var res = await execQuery(query)
  return res
}

Cinema.infoFilme = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select * where { 
      :${id} :título ?tit ;
            :ano ?ano  .
    }
    `
    var res = await execQuery(query)
    return res
}

Cinema.filmeAnos = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?ano where { 
      :${id} :ano ?ano  .
    }
    `
    var res = await execQuery(query)
    return res
}

Cinema.filmeAtores = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?ator ?nomeAtor where { 
      :${id} :temAtor ?ator  .
      ?ator :nome ?nomeAtor .
    }
    `
    var res = await execQuery(query)
    return res
}

Cinema.filmeGeneros = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?genero where { 
      :${id} :temGénero ?genero .
    }
    `
    var res = await execQuery(query)
    return res
}




//---------------------------------Atores-------------------------------------------------

Cinema.listarAtores = async () => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?s ?nome where { 
      ?s a :Pessoa .
      ?s :atuou ?filme .
      ?s :nome ?nome .
    } 
    order by ?nome
  `
  var res = await execQuery(query)
  return res
}


Cinema.infoAtor = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select * where { 
      :${id} :nome ?nome .
    }
    `
    var res = await execQuery(query)
    return res
}

Cinema.atorFilmes = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?filme where { 
      :${id} :atuou ?filme  .
    }
    `
    var res = await execQuery(query)
    return res
}


//---------------------------------Géneros-------------------------------------------------

Cinema.listarGeneros = async () => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?s where { 
      ?s a :Género .
    } 
    order by ?s
  `
  var res = await execQuery(query)
  return res
}

Cinema.generosFilmes = async (id) => {
  const query = `PREFIX : <http://prc.di.uminho.pt/2019/cinema#>
    select ?filme where { 
      :${id} :éGeneroDe ?filme .
    }
    `
    var res = await execQuery(query)
    return res
}
