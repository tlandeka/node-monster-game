
const fs = require('fs');

export default class FileReader {

    /**
     * Return cities from the file as a array
     * @return {Promise<any>}
     */
    async getCitiesFromFile() {
        return new Promise((resolve, reject) => {
                fs.readFile("./resources/world_map_small.txt", 'utf8', (err, data) => {
                    if (err) reject(err)
                    else resolve(data.split(/\r?\n/))
                })
            })
    }


    /**
     * Write cities into the file
     * @param cities - Object with left over cities
     */
    async writeCitiesIntoFile(cities){
        let fileContent = "";
        for(var cityName in cities){
            fileContent += cities[cityName].getCityDetailsForFileWriting() + "\n";
        }

        return new Promise((resolve, reject) => {
            fs.writeFile('./resources/destroyed_world_map.txt', fileContent, function (err) {
                if (err) throw reject(err);
                else resolve()
            });
        })

    }
}
