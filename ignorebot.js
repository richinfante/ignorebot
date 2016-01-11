#!/usr/bin/env node
var request = require('request');
var fs = require('fs');

/*
Repeat char into a string of a certain length
*/
function repeat(char, length){
    var str = "";
    while(str.length < length){
        str += char;
    }
    return str;
}

if(process.argv[2] == "install"){
    var name = process.argv[3]; //Get name
    
    //Generate url
    var url = 'https://raw.githubusercontent.com/github/gitignore/master/' + name + '.gitignore';
    
    //print download message
    console.log("Downloading from:", url);
    
    //request item
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          
        //Add a message to before the gitignore
        var message = "### " + name + " GitIgnore Entries - https://github.com/github/gitignore ###";
        body = repeat("#", message.length) + "\n" + body;
        body = message + "\n"  + body;
        body = repeat("#", message.length) + "\n"  + body;
        body = "\n\n" + body;
        
        //Append it to the file
        fs.appendFile('.gitignore', body, (err) => {
          if (err) throw err;
          
          //Print install message
          console.log('Installed!');
        });
      }else{
          //Error
          console.log("Could not find ignore file. Did you spell it right?");
          console.log(error, body);
      }
    });    
}else{
    //Print usage
    console.log("Usage: ignorebot install [name]");
    console.log("\tnote: names are case sensitive. ex: Node, CMake, Jekyll, Ruby, Java, Swift.");
    console.log("\tFull list can be found at https://github.com/github/gitignore");
}
