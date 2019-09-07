const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secret");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
      } catch (error) {
      //  console.log(req.headers);
        res.status(401).json({
          message: 'Auth failed',
        });
      }
}