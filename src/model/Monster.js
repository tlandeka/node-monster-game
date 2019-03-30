export default class Monster{

    constructor(name){
        this.name = name;
        this.moves = 0;

        /** @type {City} */
        this.currentCity = {};
    }

    leaveCurrentCity(){
        this.currentCity.removeMonsterFromTheCity(this.name);
        this.currentCity = undefined;
    }

    /**
     * @param {City} city
     */
    moveToTheNextRelatedCity(city){
        //console.log(this.name + " is moving into city " + city.getName());

        this.moves++;
        this.leaveCurrentCity();
        this.setCurrentCity(city);
        city.addMonster(this);
    }

    /**
     * @param {City} city
     */
    setCurrentCity(city){
        this.currentCity = city;
    }

    getName(){
        return this.name;
    }

    /**
     * @return {City}
     */
    getCurrentCity(){
        return this.currentCity;
    }

    getMoves(){
        return this.moves;
    }

    /**
     * @param {number} i
     * @return {Monster}
     */
    static async createFromNumber(i) {
        return new this("monster_" + i);
    }
}