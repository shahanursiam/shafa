var jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
   if (!req.headers['authorization']) return res.sendStatus(401).json({ error: 'No authorization header' });
   try {
       const authHeader = req.headers['authorization'];
       const token = authHeader && authHeader.split(' ')[1];
       if (token == null) return res.sendStatus(401).json({ error: 'No token provided' }); // if there isn't any token

       jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
           if (err) return res.sendStatus(403).json({ error: 'Invalid token' }); // if the token is no longer valid
           req.user = user;
           next();
       });
   } catch (error) {
       console.error(error);
       res.sendStatus(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { protect };
