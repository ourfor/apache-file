const fs = require('fs');
const path = require('path');

let base = path.join('/Users/sagit','');

let filelist = fs.readdirSync(base,{withFileTypes: true});
console.log(filelist);
