const controller = require('../controllers/controller');

function routes(app) {
    app.route('/list').get(controller.list)
}

module.exports = routes;
