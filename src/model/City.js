export default class City {

    /**
     * @param {String} name
     * @param {Object} relatedCities
     */
    constructor(name, relatedCities) {
        this.name = name;
        this.relatedCities = relatedCities;

        /** @type {Object} */
        this.monsters = {};
    }

    getName() {
        return this.name;
    }

    /**
     * @param {Monster} monster
     */
    addMonster(monster) {
        //One city may have more than 2 monster
        this.monsters[monster.getName()] = monster;
    }

    /**
     * @param {string} monster
     */
    removeMonsterFromTheCity(monsterName){
        delete this.monsters[monsterName];
    }

    /**
     * @param {string} cityName
     */
    removeOneRelatedCity(cityName){
        delete this.relatedCities[cityName];
    }

    getMonsters(){
        return this.monsters;
    }

    getNameOfOneRelatedCityRandomly(){
        let shuffeledRelatedCities = Object.keys(this.relatedCities).shuffle();

        //if an city do not have any related city then He is related to itself
        //So it means that an Monster cannot change the city if He stuck in city like this one
        if(shuffeledRelatedCities.length == 0){
            return this.name;
        }

        return shuffeledRelatedCities[0];
    }

    getNumberOfMonstersInTheCity(){
        return Object.values(this.monsters).length;
    }

    /**
     * @return {string[]}
     */
    getNamesOfRelatedCities(){
        return Object.keys(this.relatedCities);
    }

    printDestroyMessage(){
        let destroyMessage = this.name + "has been destroyed by";
        for(var monsterName in this.monsters){
            destroyMessage += " [" + this.monsters[monsterName].getName() + "] and";
        }

        console.log(destroyMessage.substring(0, destroyMessage.length - 3));
    }

    getCityDetailsForFileWriting(){
        let details = this.name;

        for(var cityName in this.relatedCities){
            details += " " + this.relatedCities[cityName] + "=" + cityName;
        }

        return details;
    }

    /**
     * Parse line from world_map txt file and create city
     * @param {String} cityTxtLine - one line from world_map txt file
     * @return {City}
     */
    static async createFromLine(cityTxtLine) {

        if (!cityTxtLine) {
            throw new Error("Invalid text line");
        }
        //after splitting [E, north=Mu, south=Aninige, east=Dimilu, west=Asmismu]
        let cityDetails = cityTxtLine.split(" ");
        let cityName = cityDetails[0];

        //remove name from array for easier parsing related cities
        //after shifting [north=Mu, south=Aninige, east=Dimilu, west=Asmismu]
        cityDetails.shift();
        let relatedCities = {};
        for (let i = 0; i < cityDetails.length; i++) {
            let relatedCityDetails = cityDetails[i].split("=");
            let relatedCityDirection = relatedCityDetails[0];
            let relatedCityName = relatedCityDetails[1];
            relatedCities[relatedCityName] = relatedCityDirection;
        }

        return new this(cityName, relatedCities);
    }
}