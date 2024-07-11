//check if autentificated, not? then go to login page
function authenticateMiddleware(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    next();
  }