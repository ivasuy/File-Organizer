function helpFn(){
    console.log(`
    List Of All The Commands :
            node main.js tree “directoryPath”
            node main.js organize “directoryPath”
            node main.js help
            `);
}

module.exports={
    helpKey: helpFn
}