
process.on('uncaughtException', function(err) {
    console.log('[UNCAUGHT_EXCEPTION]');
    console.log(err);
});


let numberOfMonsters = parseInt(process.argv.slice(2)[0]);

if(!numberOfMonsters){
    console.log("[ERROR] number of monster must be positive integer");
    process.exit(0);
}

import MonsterChallenge from "./service/MonsterChallenge";
import FileReader from "./utils/FileReader";
require('./utils/helper');

async function main() {

    var filerReader = new FileReader();
    var cities = await filerReader.getCitiesFromFile();

    var monsterGame = new MonsterChallenge();

    await monsterGame.createWorldX(cities);
    await monsterGame.createMonsters(numberOfMonsters);
    await monsterGame.addMonstersIntoCitiesRandomly();

    await monsterGame.run();

    await monsterGame.printLeftOverCities();
    //await filerReader.writeCitiesIntoFile(monsterGame.getWorldX());
}

main().catch((e) => {
    console.log(`error! ${e}`);
});
