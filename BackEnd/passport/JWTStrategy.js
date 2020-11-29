const passport = require("passport");
const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");

const User = require("../models/User");

module.exports = () => {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      function (jwtPayload, done) {
        return User.findOne({ id: jwtPayload.id })
          .then((user) => {
            return done(null, user);
          })
          .catch((err) => {
            return done(err);
          });
      }
    )
  );
};
