#!/usr/bin/env node
var request = require('request');
var fs = require('fs');
var templates = require('./templates.json');
var colors = require('colors');
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
    console.log("Downloading from:".blue, url.blue);
    
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
}else if(process.argv[2] == "list"){
    console.log(templates.length + " supported templates:");
    console.log("  - ".gray + templates.join("\n  - ".gray)); //print list indented 4 spaces
}else if(process.argv[2] == "preview"){
    var name = process.argv[3]; //Get name
    
    //Generate url
    var url = 'https://raw.githubusercontent.com/github/gitignore/master/' + name + '.gitignore';
    
    //print download message
    console.log("Downloading from:".blue, url.blue);
    
    //request item
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          
        //Add a message to before the gitignore
        var message = "### " + name + " GitIgnore Entries - https://github.com/github/gitignore ###";
        body = repeat("#", message.length) + "\n" + body;
        body = message + "\n"  + body;
        body = repeat("#", message.length) + "\n"  + body;
        body = body.split("\n");

        var files = [];
        var currentChildren = [];
        var currentKind = "???";

        //iterate over the lines
        for(var i = 0; i < body.length; i++){
            var e = body[i];

            //if it is a comment
            if(e.trim().indexOf("#") == 0){

                //push any previous files and their kind to the list
                if(currentChildren.length > 0){
                    files.push({
                        "kind" : currentKind,
                        "files" : currentChildren
                    });
                    //reset children
                    currentChildren = [];
                }

                //remove leading/trailing spaces and first #
                currentKind = e.trim().replace("#","").trim();
            }else if(e.trim() == ""){
                continue; //nothing, skip
            }else{
                currentChildren.push(e.trim()); //add file without leading/trailing spaces
            }
        }

        //print info to user
        console.log("The following paths will be added to your .gitignore".white.bold);
        for(var i = 0; i < files.length; i++){
            console.log("    " + files[i].kind.white + ":"); //print kind

            for(var j = 0; j < files[i].files.length; j++){
                console.log("       - ".gray + files[i].files[j].green); //print filename
            }
        }
      }else{
          //Error
          console.log("Could not find ignore file. Did you spell it right?");
          console.log(error, body);
      }
    });       
    
}else{
    //Print usage
    console.log("Usage: ignorebot install [name] - install template");
    console.log("Usage: ignorebot preview [name] - print template to console");
    console.log("Usage: ignorebot list - List template names");
    console.log("\tnote: names are case sensitive. ex: Node, CMake, Jekyll, Ruby, Java, Swift.");
    console.log("\tFull list can be found at https://github.com/github/gitignore or by typing 'ignorebot list'");
}
