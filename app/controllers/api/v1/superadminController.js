const superadminService = require("../../../services/superadminService");

module.exports = {

  login(req, res) {
    superadminService
      .login(req.body)
      .then((user) => {
        
        if(!user.data){
          res.status(401).json({
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

  register(req, res) {
    superadminService
      .create(req.body)
      .then((user) => {
        
        res.status(201).json({
          data: user
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
