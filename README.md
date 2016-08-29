#Ignorebot
- Downloads .gitignore files from https://github.com/github/gitignore
- They are appended to your current .gitignore file. If the file isn't there, it'll create one.

##Installing
[https://www.npmjs.com/package/ignorebot](https://www.npmjs.com/package/ignorebot)
```bash
npm install -g ignorebot
```

##Usage
```bash
ignorebot install [name] #installs a gitignore template
ignorebot preview [name] #lists ignore patterns to be added
ignorebot list #shows list of currently available templates
```

##Some examples
```bash
ignorebot install Swift
```

```bash
ignorebot install Java
```

####Note
The `ignorebot list` command is only provided as a convenience and may not up-to date. if it isn't, use the `update-list.sh` script and send a PR, or open an issue.  
