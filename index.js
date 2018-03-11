const Discord = require('discord.js')
const config = require('./config.json')
const WolframAlphaAPI = require('wolfram-alpha-api')
const GphApiClient = require('giphy-js-sdk-core')
const fs = require('fs')

const client = new Discord.Client()
client.login(config.token)

const waApi = WolframAlphaAPI(config.wolframtoken)
const clientGph = GphApiClient(config.giphytoken)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  const args = msg.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  switch (command) {
    case 'moçada' :
      msg.channel.send('E ai moçada!', { tts: true })
      break
    case 'estudar' :
      msg.channel.send('Bora estudar moçada!', { tts: true })
      break
    case 'prefix' :
      let newPrefix = msg.content.split(' ').slice(1, 2)[0]
      config.prefix = newPrefix
      fs.writeFile('./config.json', JSON.stringify(config), (err) => console.log(err))
      break
    case 'math' :
      let op = args.join(' ')
      waApi.getShort(op).then(data => msg.channel.send(data)).catch(err => {
        console.log(err)
        msg.channel.send(
          'Ow moçada, não vou saber responder isso agora, mas podem ficar tranquilos que vou pesquisar e trago a resposta na proxima aula!')
      })
      break
    case 'gif' :
      let busca = args.join(' ')

      clientGph.random('gifs', {'tag': busca})
        .then((response) => {
          msg.channel.send(response.data.url)
        })
        .catch((err) => { console.log(err) })
      break
    case 'leal' :
      msg.channel.send('Yo, im Leal', {tts: true})
      break
  }
})
