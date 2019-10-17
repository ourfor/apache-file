const fileIcons = require('./fileIcons');
const folderIcons = require('./folderIcons');
const langIcons = require('./languageIcons');
const fs = require('fs');
const path = require('path');

let fileMap = {};
fileIcons.icons.forEach(v => {
    let name = v.name;
    let ext = v.fileExtensions;
    let names = v.fileNames;
    if(ext) {
        ext.forEach(v => {
            fileMap[v] = name;
        });
    }

    if(names) {
        names.forEach(v => {
            fileMap[v] = name;
        });
    }
});

let folderMap = {};
folderIcons[0].icons.forEach(v => {
    let name = v.name;
    let folders = v.folderNames;

    folders.forEach(v => {
        folderMap[v] = name;
    });
});

let langMap = {};
langIcons.forEach(v => {
    let name = v.icon.name;
    let ids = v.ids;
    ids.forEach(v => {
        langMap[v] = name;
    });
});

fs.writeFileSync(path.join(__dirname,'../data/fileMap.json'),JSON.stringify(fileMap));
fs.writeFileSync(path.join(__dirname,'../data/folderMap.json'),JSON.stringify(folderMap));
fs.writeFileSync(path.join(__dirname,'../data/langMap.json'),JSON.stringify(langMap))