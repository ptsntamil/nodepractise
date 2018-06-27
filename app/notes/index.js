const noteRoutes = require('./routes/routes.js');
module.exports = function(app, db) {
    noteRoutes(app, db);
};