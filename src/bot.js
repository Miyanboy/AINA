require('dotenv').config();

const{ Client } = require('discord.js');
const client = new Client();
const PREFIX = 'aina@' 

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('message',(message) =>{
    if(message.author.bot) return;
    if(message.author.userid == "485793313442627604"){
        
    }
})