require('dotenv').config();

const{ Client } = require('discord.js'); 
const client = new Client();
const PREFIX = 'aina@' 

client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('message',(message) =>{
    if(message.content === 'aina@Hello') message.reply('Hi! Who are u?');
    if(message.content === 'aina@Hi') message.reply('Hi! Hottie🤩');
    if(message.content === 'aina@Hey') message.reply('Howdy! U look ravishing today😗');
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
    } 

    else if (CMD_NAME === 'ban') {
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
    else if (CMD_NAME === 'role') {
        if(args.length === 0) {
          return message.channel.send({ embed: {
            color: 7209215,
            title: "Available Roles: ",
            description: "These role i can charm you with!!😉 \n use aina@role <rolename>\n\n \n@toxic\n @kingslayer \n@dj",
          }
        })
        }
        var role = args[0]
        const member = message.guild.members.cache.get(ag);
        switch(role){
          case 'toxic':
            message.guild.members.cache.get(message.author.id).roles.add('834059351064707134');
            break;
          case 'dj':
            message.guild.members.cache.get(message.author.id).roles.add('831067138558787614');
            break;
          case 'kingslayer':
            message.guild.members.cache.get(message.author.id).roles.add('834062172534341643');
            break;
          default:
            message.channel.send({ embed: {
              color: 7209215,
              title: "Available Roles: ",
              description: "These role i can charm you with!!😉 \n@toxic\n @kingslayer \n@dj",
              timestamp: new Date()
            }}
            );
        }
      }
    
    else if (CMD_NAME === 'ping') {
        message.reply("Pong!!!");
    }
    
    else if (CMD_NAME === 'help') {
          message.channel.send({ embed: {
            color: 7209215,
            title: "Available Commands: ",
            description: "These are my available spells. You can cast them with the aina@ prefix, like you did with this spell.",
            fields: [
              {
                name: 'Enhactments',
                value: '``help`` , ``role``, ``ping`` ',
              }],
            timestamp: new Date()
          }
        });
      }
      else if (CMD_NAME === 'leaderboard') {
        message.channel.send({ embed: {
          color: 7209215,
          title: "Aina leaderboard ",
          description: "Top ten members",
          fields: [
            {
              name: 'leaderboard',
              value: '',
            }],
          timestamp: new Date()
        }
      });
    }
  }
})