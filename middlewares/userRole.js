function Admin(req, res, next) {
  req.userRole = 'admin';
  next();
}

function Customer(req, res, next) {
  req.userRole = 'customer';
  next();
}

module.exports = {
  Customer,
  Admin
}
