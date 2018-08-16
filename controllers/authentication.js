const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// Take a users id and encode it with the secret
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had email and password auth'd
  // Supply token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
  // pull data out of the request object when it is a post request with req.body
  const email = req.body.email;
  const password = req.body.password;

  // Check if email and password exist
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'You must provide email and password' });
  }

  // See if a user with a given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with an email does exist throw error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use ' });
    }
    // If a user with an email doe NOT exist -> create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      // respond to request indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
};
