let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
    // let destPath;
    if (dirPath == undefined) {

        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        console.log(doesExist);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {

            console.log("Kindly enter the correct path");
            return;
        }
    }
}

function treeHelper(dirPath, indent) {
    // check whether is file or folder
    /* if file return file name but if folder go inside 
    folder and check again the above criteria*/

    // for file
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        // for folder
        let dirName = path.basename(dirPath)
        console.log(indent + "└──" + dirName);
        let childrens = fs.readdirSync(dirPath);
        for (let i = 0; i < childrens.length; i++) {
            let childPath = path.join(dirPath, childrens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}