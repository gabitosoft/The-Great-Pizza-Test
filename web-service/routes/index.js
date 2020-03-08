/* global require module __dirname __filename*/
/* jshint esversion: 6 */
const fs = require('fs');
const path = require('path');

module.exports = function(app, notifyCallback) {
  fs.readdirSync(__dirname).forEach(function(file) {
    // Avoid to read this file
    if (file === path.basename(__filename)) {
      return;
    }

    // Load the route file
    const pathFile = path.join(__dirname, file);
    require(pathFile)(app, notifyCallback);
  });
};
