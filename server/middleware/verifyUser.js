module.exports = {
    isAuthenticated(req, res, next) {
    if(req.session.user && req.session.user.isAuthenticated){
      return next()
    } else {
      res.status(403).send({err:'Please log in'})
    }
  }  
}