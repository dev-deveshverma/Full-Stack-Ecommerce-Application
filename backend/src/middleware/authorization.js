module.exports = function (permittedRoles) {
  return function (req, res, next) {
    // first get the user from the req
    const user = req.user;

    // check if user has any of the permittedRoles
    let isPermitted = false;
    permittedRoles.map((role) => {
      if (user.role?.split(" ")?.includes(role)) {
        isPermitted = true;
      }
    });

    // if not then throw an error
    if (!isPermitted) {
      return res.status(403).send({ message: "Permission denied" });
    }
    // if yes then return next
    return next();
  };
};
