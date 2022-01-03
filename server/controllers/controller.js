const fetch = require('node-fetch')

const BASE_API_URL = 'https://idfg.idaho.gov/ifwis/huntplanner/api/1.1/';

class Controller {
    async list(req, res) {
        try {
            const listedHunts = await fetch(`${BASE_API_URL}/list?limit=1000`);
            res.json(await listedHunts.json());
        } catch(e) {
            console.error(e.stack);
        }
    }
}


module.exports = new Controller;