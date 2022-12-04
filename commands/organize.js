let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn(dirPath){
    console.log(" Organize command implemented for ", dirPath);
    // 1. input -> directory path
    let desPath;
    if (dirPath == undefined){
        desPath = process.cwd();
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist){

            // 2. create -> directory -> organized file 
            desPath = path.join(dirPath,"Organized-Files");
            if (fs.existsSync(desPath) == false){
                fs.mkdirSync(desPath);
            }
            

        } else {
            console.log("Kindly Enter The Correct Path ! ");
            return;
        }

    }
    organizeHelper ( dirPath, desPath);
    // 3. Identify category of file
    // 4. copy files to organized file directory 
}

function organizeHelper(src,dest){
    // 3. Identify category of file
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for ( let i = 0; i < childNames.length; i++ ){
        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i],"belongs to --->",category);
            // 4. copy files to organized file directory 
            /*now copy file from src folder and paste it 
            into it's category destination folder*/
            sendFiles(childAddress,dest,category);
        }
    }

}

function getCategory(name){
    let extension = path.extname(name);
    // to remove dot from extension name
    extension = extension.slice(1);
    // console.log(extension);
    for ( let type in types ){
        let currTypeArr = types[type];
        for ( i = 0; i < currTypeArr.length; i++ ){
            if(extension == currTypeArr[i] ){
                return type;
            }
        }

    }
    return "OTHERS";
}

function sendFiles(srcFilePath,dest,category){
    //inside organized-files --> you have copy and paste files
    let categoryPath = path.join(dest,category);
    if ( fs.existsSync(categoryPath) == false){
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    // to cut and paste orginal file  
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to",category);
}

module.exports = {
    organizeKey: organizeFn
}