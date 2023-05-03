const userService = require("../../../services/userService");
const superadminService = require("../../../services/superadminService");
const adminService = require("../../../services/adminService");

module.exports = {

  authorize(req, res, next) {
    userService
      .authorize(req.header("authorization"))
      .then((user) => {
        req.user = user.data;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          message: "Unauthorized",
        })
      });
  },

  authorizeSuperadmin(req, res, next) {
    superadminService
      .authorize(req.header("authorization"))
      .then((user) => {
        if(user.data.role !== "Superadmin"){
          throw new Error();
        }
        req.user = user.data
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          message: "Unauthorized",
        })
      });
  },

  authorizeAdmin(req, res, next) {
    adminService
      .authorize(req.header("authorization"))
      .then((user) => {
        if(user.data.role === "Superadmin"){
          req.user = user.data.payload;
        }else if(user.data.role === "Admin"){
          req.user = user.data.payload;
        }else{
          throw new Error();
        }
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json({
          message: "Unauthorized",
        })
      });
  },

  whoAmI(req, res){
    const user = req.user;
    res.status(200).json(user);
  }

};
