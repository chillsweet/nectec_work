var db = require('../database');
exports.getDepart = function (call) {
  db.setTable('plant');
  db.getAll(call);
};
