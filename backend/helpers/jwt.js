const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_SECRET;
  //   const api=process.env.API_URL
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    //! затребование проверки токена при логине и регистрации  также при  получении информации общего характера для обычного не зарегестрированного пользователя, т.е. не зарегестрированный пользователь может просматривать продукты,искать их без регистрации, но не может делать действия "POST"
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      "/api/v1/users/login",
      "/api/v1/users/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
