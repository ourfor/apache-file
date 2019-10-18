const fs = require('fs');
const path = require('path');

function list(dir){
    let base = path.join('/Users/Sagit',dir);
    let filelist = fs.readdirSync(base,{withFileTypes: true});
    let children = filelist.map(v => {
        return {name: v.name,type: v.isFile()?1:2}
    });
    return {base: dir, children};
}

export default list;