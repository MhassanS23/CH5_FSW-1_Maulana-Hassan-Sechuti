const adminService = require("../../../services/adminService");

module.exports = {
  create(req, res) {
    adminService
      .create(req.body)
      .then((user) => {
        if(!user.data){
          res.status(422).json({
            status: user.status,
            message: user.message,
            data: null
          });
          return;
        }
        
        res.status(201).json({
          status: user.status,
          data: {user: user.data}
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  login(req, res) {
    adminService
      .login(req.body)
      .then((user) => {
        
        if(!user.data){
          res.status(403).json({
            status:"Failed",
            message: user.message,
            data: null
          });
          return;
        }

        res.status(201).json({
          status: "Success",
          data: {user: user.data},
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

};
