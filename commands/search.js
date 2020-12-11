const fetch = require('node-fetch')
const Discord = require('discord.js')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
module.exports = {
    name: "search",
    description: "Returns result of a search through the LU wiki",
    execute(message, args) {
        //formats to fit the proper url
        var term = args.join().replace(/,/g, "_")
        term = term.toLowerCase()
        //creates the api url being used
        var apiurl = 'https://legouniverse.fandom.com/api/v1/Search/List?query=' + term + '&limit=1'


        fetch(apiurl)
            //converts response into a json format
            .then(response => response.json())
            //sends the proper url into the chat
            .then(data => {
                const page = data.items[0].id
                var pageurl = 'https://legouniverse.fandom.com/api/v1/Articles/AsSimpleJson?id=' + page
                fetch(pageurl)
                    .then(response => response.json())
                    .then(data => {
                        var test = data.sections[0].images.src
                        console.log(test)
                        const prev = page.snippet.replace(/\//g, '')
                        const embededSearch = new Discord.MessageEmbed()
                            .setTitle(page.title)
                            .setColor('#ffd000')
                            .setURL(page.url)
                            .setImage(test)
                            .addFields(
                                { name: '\u200b', value: prev.replace(/<span>|<span class=\"searchmatch\">|'<'|'>'/g, '') + '...' }
                            )
                        message.channel.send(embededSearch)
                    })        
            })
            //for when a page isn't found
            .catch(function (e) {
                message.channel.send('No results found')
            });




    }
}