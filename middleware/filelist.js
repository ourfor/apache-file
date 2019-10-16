const fs = require('fs');
const path = require('path');

function list(dir){
    let base = path.join('/Users/sagit',dir);
    let filelist = fs.readdirSync(base,{withFileTypes: true});
    return filelist;
}

export default list;