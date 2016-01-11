#!/usr/bin/env node
var request = require('request');
var fs = require('fs');

function repeat(char, length){
    var str = "";
    while(str.length < length){
        str += char;
    }
    return str;
}

if(process.argv[2] == "install"){
    var name = process.argv[3];
    var url = 'https://raw.githubusercontent.com/github/gitignore/master/' + name + '.gitignore';
    console.log("Downloading from:", url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          
        var message = "### " + name + " GitIgnore Entries - https://github.com/github/gitignore ###";
        
        body = repeat("#", message.length) + "\n" + body;
        body = message + "\n"  + body;
        body = repeat("#", message.length) + "\n"  + body;
        body = "\n\n" + body;
        fs.appendFile('.gitignore', body, (err) => {
          if (err) throw err;
          console.log('Installed!');
        });
      }else{
          console.log("Could not find ignore file. Did you spell it right?");
          console.log(error, body);
      }
    });    
}else{
    console.log("Usage: ignorebot install [name]");
    console.log("\tnote: names are case sensitive. ex: Node, CMake, Jekyll, Ruby, Java, Swift.");
    console.log("\tFull list can be found at https://github.com/github/gitignore");
}
