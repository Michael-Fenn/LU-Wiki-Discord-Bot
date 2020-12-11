const Discord = require('discord.js')
const{token} = require('./package.json')
const fs = require('fs')

//initializes the bot
const client = new Discord.Client(token)

//the bot uses '-' for it's commands
const prefix = 'u-'

client.commands = new Discord.Collection()
//makes sure bot is only pulling from .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}
//prints message to the console to let me know its started
client.once('ready', () =>{
    console.log('bot is online')
});

client.on('message', message =>{
    client.user.setActivity('"u-help" for commands')
    //makes sure that the message starts with the assigned prefix and the bot is not coming from the bot itself
    if(!message.content.startsWith(prefix) || message.author.bot) 
        return;
    const args = message.content.slice(prefix.length).split(/ +/)
    //converts the users command into lower case (for ease of programming)
    const command = args.shift().toLowerCase()
    //executes the searchwiki function
    if(command === 'search'){
        client.commands.get('search').execute(message,args)
    }
    else if(command === 'help'){
        client.commands.get('help').execute(message, args)
    }
    else if(command === 'weapon'){
        client.commands.get('weapon').execute(message, args)
    }
});
client.login(token);