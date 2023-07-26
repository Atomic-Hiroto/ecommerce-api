const jwt = require('jsonwebtoken');

// Custom authentication middleware function to check for JWT token
function protect(req, res, next){
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if(!token) {
    return res.status(401).json({message: 'Not authorized to access this route'});
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({message: 'Not authorized to access this route'});
  }
}

module.exports = { protect };