const userController = require('./user-controller')

module.exports = (app) => {
    userController(app);
}