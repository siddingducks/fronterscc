function toDiscordMarkdown(str) {
    //custom emojis
    let emojiRegEx = /<a:.+?:\d+> | <.+?:\d+>/g;
    var emojis = str.match(emojiRegEx);
    if (emojis) {
        for (var emoji of emojis) {
            let discordEmoji = ' <img class="d-emoji" ';
            var emojiID = emoji.match(/:(\d+)>/);
            emojiID = emojiID[1];
            var emojiName;
  
            if (emoji.includes('<a:')) {
                discordEmoji += 'src="https://cdn.discordapp.com/emojis/' + emojiID + '.gif" ';
                emojiName = emoji.match(/<a:(.*?):/);
                emojiName = emojiName[1];
            }
            else{
                discordEmoji += 'src="https://cdn.discordapp.com/emojis/' + emojiID + '.png" ';
                emojiName = emoji.match(/<:(.*?):/);
                emojiName = emojiName[1];
            }
  
            discordEmoji += `alt=${emojiName} title=${emojiName}>`;
            str = str.replaceAll(emoji, discordEmoji);
        }
    }
  
    //turn all new lines into line breaks
    str = str.replaceAll("\n", "<br />");
  
    //sinlge code lines (ex. `code`)
    let codeLineRegEx = /`.*?`/g;
    var codeLines = str.match(codeLineRegEx);
    if (codeLines != null) {
            for (var codeLine of codeLines) {
                var content = codeLine.match(/`(.*?)`/);
                content = content[1];
                str = str.replaceAll(codeLine, '<code> ' + content + ' </code>');    
        }
    }
  
    //spoilers
    let spoilersRegEx = /\|\|.*?\|\|/g;
    var spoilers = str.match(spoilersRegEx);
    if (spoilers != null) {
        for (var spoiler of spoilers) {
            var content = spoiler.match(/\|\|(.*?)\|\|/);
            content = content[1];
            str = str.replaceAll(spoiler, '<span id="spoilered" onclick="spoilered()"> ' + content + ' </span>');    
        }
        var spoiler = document.getElementById('spoilered');
        spoiler.style.backgroundColor = '#363c51';
        spoiler.style.color = 'inherit';
        spoiler.style.cursor = 'pointer';
    }
  
    //unordered lists
    let ulRegEx = /\*.*?(?!_*)/g;
    var uls = str.match(ulRegEx);
    if (uls != null) {
            for (var ul of uls) {
                var content = ul.match(/\*.*?(?!\*{2})/);
                content = content[1];
                str = str.replaceAll(ul, '<li> ' + content + ' </li>');    
        }
    }

    //blockquotes
    //DONE IN CSS
  
    return str;
}