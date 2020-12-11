const Discord = require('discord.js')
const { execute } = require('./search')
const fetch = require('node-fetch')
module.exports = {
    name: 'weapon',
    description: 'grabs and outputs data on specified weapon',
    execute(message, args){
        //make the inputed term fit the syntax of the wiki
        var term = args.join().replace(/,/g, " ")
        term = term.toLowerCase()
        //fetches the html of the weapons wiki article
        fetch('https://legouniverse.fandom.com/api.php?action=query&prop=revisions&titles=Weapons&rvprop=content&format=json')
            .then(response => response.json())
            .then(data => {
                //gets the specific html file that's needed
                var info = data.query.pages[2909].revisions[0]['*']         
                var cutinfo = info.split('\n')
                var i
                for(i = 0; i < cutinfo.length; i++){
                    //console.log(cutinfo[i])
                    cutinfo[i] = cutinfo[i].replace('|','').replace('|60px', '')
                    if(cutinfo[i].toLowerCase().includes('.png') && cutinfo[i-10].toLowerCase().includes(term)){
                        var abilities = cutinfo[i-7].split('<br />')
                        //removes html remnates and improves formating of the weapons abilities
                        var string = ""
                        function cleanString(item){
                            string += '-' + item.replace(/|/g, '') + '\n'
                        }
                        abilities.forEach(cleanString)
                        //creation of a new embeded discord message - makes output more customizable and clean
                        const embeded= new Discord.MessageEmbed()
                            .setColor('#ffd000')
                            .setTitle(cutinfo[i-10].replace(/=/g,''))
                            .addFields(
                                {name: 'Damage', value: cutinfo[i-8].replace('|','')},
                                {name: 'Abilities', value: string}
                            )
                        //sends the created embeded message into the discord channel
                        message.channel.send(embeded)
                        break;
                    }
                }
                message.channel.send('no data found')
            })
            //if an input that doesn't exist is entered
            .catch(function(e){
                message.channel.send('no results found')
            })
       
    }
}