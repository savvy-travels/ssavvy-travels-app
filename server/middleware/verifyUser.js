module.exports = {
    isAuthenticated(req, res, next) {
    if(!req.session.user){
      res.status(403).send({err:'Please log in'})
    } else {
      return next()
    }
  }  
}