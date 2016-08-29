#Setup temp dir
rm -rf gitignore
mkdir gitignore
cd gitignore

#Download archive & open it
curl -LOk "https://github.com/github/gitignore/archive/master.zip"
unzip master.zip
cd gitignore-master

#Inline script to read file names
read -r -d '' VARIABLE << EOM
    var fs = require('fs');

    //list files
    var files = fs.readdirSync("./");
    var global_files = fs.readdirSync("./Global");

    //filter files and format them
    files = files.filter(function(e){
        return e.indexOf(".gitignore") > -1;
    });
    files = files.map(function(e){
        return e.replace(".gitignore", "")
    });
    global_files = global_files.filter(function(e){
        return e.indexOf(".gitignore") > -1;
    });
    global_files = global_files.map(function(e){
        return e = "Global/" + e.replace(".gitignore", "");
    });

    //combine into one array
    files = files.concat(global_files);
    console.log("Found", files.length, "templates");
    fs.writeFileSync("../../templates.json", JSON.stringify(files, null, 4));
EOM

#Execute code
node -e "$VARIABLE"