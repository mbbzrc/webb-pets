function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "Please log in to complete this.",
    });
  }
  
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "Please log in to complete this.",
    });
  } else if (!req.user.isAdmin) {
    next({
      name: "IsNotAdminError",
      message: "You must be an admin user to complete this.",
    });
  }

  next();
}

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    next({
      name: "UnauthenticatedUserError",
      message: "You must log in as admin user to complete this.",
    });
  }

  next();
}

module.exports = {
  requireUser,
  requireAdmin,
  isAdmin,
};
