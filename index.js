import { Client } from "discord.js";
import config, { token, wolframtoken, giphytoken, prefix } from "./config.json";
import WolframAlphaAPI from "wolfram-alpha-api";
import GphApiClient from "giphy-js-sdk-core";
import { writeFile } from "fs";

//https://discordapp.com/oauth2/authorize?client_id=422530011912732682&scope=bot

const client = new Client();
client.login(token);

const waApi = WolframAlphaAPI(wolframtoken);
const clientGph = GphApiClient(giphytoken);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "moçada" :
      msg.channel.send('E ai moçada!', { tts: true });
      break;
    case "estudar" :
      msg.channel.send('Bora estudar moçada!', { tts: true });
      break;
    case "prefix" :
      let newPrefix = msg.content.split(" ").slice(1, 2)[0];
          prefix = newPrefix;
          writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      break;
    case "math" : 
      let op = args.join(' ')
      waApi.getShort(op).then(data => msg.channel.send(data)).catch(err => msg.channel.send(
        'Ow moçada, não vou saber responder isso agora, mas podem ficar tranquilos que vou pesquisar e trago a resposta na proxima aula!'));
      break;
    case "gif" :
      let busca = args.join(' ')
      clientGph.random('gifs', {"tag": busca})
      .then((response) => {
        msg.channel.send(response.data.url) })
      .catch((err) => {})
      break;
      case "leal" :
        msg.channel.send('Yo, im Leal', {tts: true})
      break;
  }
  
});


