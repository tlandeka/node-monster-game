import City from "../model/City";
import Monster from "../model/Monster";


export default class MonsterChallenge {

    constructor() {
        this.worldX = {};
        this.monsters = {};
    }

    async createWorldX(cities){
        for(let i = 0; i < cities.length; i++){
            try{
                let city = await City.createFromLine(cities[i]);
                this.worldX[city.getName()] = city;
            } catch (e) {
                //console.log(e);
            }
        }
    }

    async createMonsters(numberOfMonsters){
        if(numberOfMonsters <= 0){
            throw Error("Number of monsters must be higher than zero");
        }

        for(let i = 1; i <= numberOfMonsters; i++){
            let monster = await Monster.createFromNumber(i);
            this.monsters[monster.getName()] = monster;
        }
    }

    async addMonstersIntoCitiesRandomly(){
        let shuffeledCities = (Object.values(this.worldX)).shuffle();
        let shuffeledMonsters = (Object.values(this.monsters)).shuffle();

        for(let i = 0; i < shuffeledMonsters.length; i++){
            shuffeledMonsters[i].setCurrentCity(shuffeledCities[0]);
            shuffeledCities[0].addMonster(shuffeledMonsters[i]);

            shuffeledCities.shuffle();
        }
    }

    async run(){
        while (Object.values(this.monsters).length > 0){

            await this.moveMonstersToTheRelatedCities();

            await this.destroyCityWithTwoOrMoreMonster();

            await this.destroyMonsterWithExceedMoveLimits();
        }
    }

    async printLeftOverCities(){
        console.log("\n[Left Over Cities]");
        for(var cityName in this.worldX){
            console.log(this.worldX[cityName].getCityDetailsForFileWriting());
        }
    }

    async moveMonstersToTheRelatedCities(){
        for(var monsterName in this.monsters){
            /** @type Monster */
            let monster = this.monsters[monsterName];
            let nextMonsterCityName = monster.getCurrentCity().getNameOfOneRelatedCityRandomly();
            let nextMonsterCity = this.worldX[nextMonsterCityName];
            monster.moveToTheNextRelatedCity(nextMonsterCity);
        }
    }

    async destroyCityWithTwoOrMoreMonster() {
        for(var cityName in this.worldX){
            /** @type City */
            let city = this.worldX[cityName];

            if(city.getNumberOfMonstersInTheCity() >= 2){

                let namesOfRelatedCities = city.getNamesOfRelatedCities();

                //notify related cities that this one will be destroyed
                for(let i = 0; i < namesOfRelatedCities.length; i++){
                    this.worldX[namesOfRelatedCities[i]].removeOneRelatedCity(city.getName());
                }

                city.printDestroyMessage();

                let cityMonsters = city.getMonsters();

                for(var monsterName in cityMonsters){
                    //destroy monsters because of fight
                    delete this.monsters[monsterName];
                }

                delete this.worldX[city.getName()];
            }

        }
    }

    async destroyMonsterWithExceedMoveLimits(){
        for(var monsterName in this.monsters){
            /** @type Monster */
            let monster = this.monsters[monsterName];
            if(monster.getMoves() > 15){
                    //remove monster from the current city because the monster are going to be destroyed
                    monster.leaveCurrentCity();
                    delete this.monsters[monster.getName()];
            }
        }
    }

    /**
     * @return {Object}
     */
    getWorldX() {
        return this.worldX;
    }

    /**
     * @return {Object}
     */
    getMonsters(){
        return this.monsters;
    }
}