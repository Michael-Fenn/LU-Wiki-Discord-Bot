const Discord = require('discord.js')
module.exports = {
    name: "help",
    description: "bot related help and commands",
    execute(message, args){
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#ffd000')
            .setTitle('Help')
            .setThumbnail('https://i.imgur.com/ScsUAFG.png')
            .setDescription('make sure to use the prefix "u-" before each command')
            .addFields(
                //{name: '__Commands__', value: ''},
                {name: '\u200b', value: '__**Commands List**__'},
                {name: 'u-search "search term"', value: 'Enter a search term and the bot will reply with an article from the LU wiki if it finds one. Example: u-search pet cove'}
            )

            
        message.channel.send(embedMessage)
    }
}