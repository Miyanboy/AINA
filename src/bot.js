require('dotenv').config();

const{ Client } = require('discord.js');
const client = new Client();
const PREFIX = 'aina@' 

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('message',(message) =>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
        console.log(CMD_NAME);
        console.log(args[0]);
        if(CMD_NAME === 'kick'){
            if (!message.member.hasPermission('KICK_MEMBERS')){
             return message.reply('You do not have permissions to use that command');
        }
        
        if(args.length === 0) {
             return message.reply("Please Provide an ID");
        }
        var ag = args[0];
        let user = message.guild.members.cache.get(ag);
        console.log(user);

        if (user) {
            user
                .kick()
                .then((user) => message.channel.send(`${user} was kicked.`));
        } else {
         return message.channel.send('That member was not found');
      }
    } else if (CMD_NAME === 'ban') {
        if (!message.member.hasPermission('BAN_MEMBERS'))
          return message.reply("You do not have permissions to use that command");
        if (args.length === 0) return message.reply("Please provide an ID");
        try {
          const user = message.guild.members.ban(args[0]);
          message.channel.send('User was banned successfully');
        } catch (err) {
          console.log(err);
          message.channel.send('An error occured. Either I do not have permissions or the user was not found');
        }
      } 
    }
});
    /*  else if(CMD_NAME === "unban"){
        let member = client.user.fetch(unbanned.ag);

        if (member == null) {
          message.reply('Cannot find a ban for the given user.');
          return;
        }
        message.guild.members.unban(member, 'Unbanned by ' + message.author.tag).then(user => {
          message.channel.send('Unbanned <@' + ag + '>.');
        }).catch(() => console.error);}*/