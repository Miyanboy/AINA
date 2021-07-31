require('dotenv').config();
const mongoose = require('mongoose');
const{ Client } = require('discord.js'); 
const client = new Client();
const Levels = require('discord-xp');
const PREFIX = 'aina@' 
Levels.setURL(process.env.mongoPath);

const jokes = [
  'I went to a street where the houses were numbered 8k, 16k, 32k, 64k, 128k, 256k and 512k. It was a trip down Memory Lane.',
  '“Debugging” is like being the detective in a crime drama where you are also the murderer.',
  'Without requirements or design, programming is the art of adding bugs to an empty text file.',
  'Before software can be reusable it first has to be usable.',
  'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.',
  'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
  'There are two ways to write error-free programs; only the third one works.',
];
client.login(process.env.DISCORDJS_BOT_TOKEN);

client.on('message',async (message) =>{
    if(message.content === 'aina@Hello' || message.content === 'aina@hello') message.reply('Hi! Who are u?');
    if(message.content === 'aina@hi' || message.content === 'aina@Hi') message.reply('Hi! Hottie🤩');
    if(message.content === 'aina@hey' || message.content === 'aina@Hey') message.reply('Howdy! U look ravishing today😗');
    if(message.author.bot) return;

    const randomXp = Math.floor(Math.random() * 100) + 10;
    const hasLevelUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp)

    if(hasLevelUp){
      const user = await Levels.fetch(message.author.id,message.guild.id);
      message.channel.send(`You have leveled up to ${user.level}`);
    /*  const lvl = `${user.level}`
      switch(lvl){
          case '1':
            message.guild.members.cache.get(message.author.id).roles.add('834061620854259763');
            message.channel.send(`You are now @Initiate`);
            break;
          case '5':
            message.guild.members.cache.get(message.author.id).roles.add('834061993144090644');
            message.channel.send(`You are now @Apprentice`);
            break;
          case '10':
            message.guild.members.cache.get(message.author.id).roles.add('831067138558787614');
            message.channel.send(`You are now @Scholar`);
            break;
          case '15':
            message.guild.members.cache.get(message.author.id).roles.add('786612725378711572');
            message.channel.send(`You are now @Acolyte`);
            break;
            }*/
    }

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
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
            description: "These role i can charm you with!!😉 \n use aina@role <rolename>\n\n @toxic\n @kingslayer \n@dj",
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
    else if (CMD_NAME === 'help') {
          message.channel.send({ embed: {
            color: 7209215,
            title: "Available Commands: ",
            description: "These are my available spells. You can cast them with the aina@ prefix, like you did with this spell.",
            fields: [
              {
                name: 'Enhactments',
                value: '``help`` , ``role``, ``joke`` ',
              }],
            timestamp: new Date()
          }
        });
      }
    else if (CMD_NAME === 'joke') {
      message.channel.send({ embed: {
        color: 4871151,
        description: jokes[Math.floor(Math.random() * jokes.length)],
        timestamp: new Date()
      }
    });
   }
   else if (CMD_NAME === 'rank') {
     if(args.length === 0) {
     const user = await Levels.fetch(message.author.id,message.guild.id);  
      message.channel.send({ embed: {
        color: 4871151,
        title: "Level",
        description: `<@!${message.author.id}> is of currently Level **${user.level}**!!`,
      }
    });
    }
    else{
    const target = message.mentions.users.first() || message.author;
    const user = await Levels.fetch(target.id, message.guild.id);
      message.channel.send({ embed: {
        color: 4871151,
        title: "Level",
        description: `${target.tag} is of currently Level **${user.level}**!!`,
      }
    });
    }
   }
/*   else if (CMD_NAME === 'leaderboard') {
     const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id,10);
     
     if (rawLeaderboard.length < 1)
      return message.channel.send("Noone is on the leaderboard yet.");
    else{
     const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard)
     const lb = leaderboard.map(e => `**${e.position}.${e.username}#${e.discriminator}**\n**Level:** ${e.level}\n**XP**: ${e.xp.toLocaleString()}`);
     message.channel.send({embed: {
       color: 4871151,
       title: "Leaderboard",
       description:`${lb.join("\n\n")}`
     }
     });
    }
   }*/
  }
})
const keep_alive = require('./keep_alive.js');