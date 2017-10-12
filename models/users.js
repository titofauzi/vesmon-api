var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

passport.use(new Strategy(
  function(username, password, cb) {
    findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
  }));


var records = [
    { id: 1, username: 'tito', password: 'tito', displayName: 'Tito', emails: [ { value: 'tito.fauzi@gmail.com' } ] }
  , { id: 2, username: 'pertamina1', password: 'pertamina1', displayName: 'Pertamina', emails: [ { value: 'jill@example.com' } ] }
];

findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

module.exports = passport;