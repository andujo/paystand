'use strict';
module.exports = function (app) {
  var main = require('../controllers/main');
  app.route('/converter')
    .get(main.test)
    .post(main.convert);
};