const userService = require("../../../services/userService");

module.exports = {

  register(req, res) {
    userService
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
    userService
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

  whoAmI(req, res){
    const user = req.user;
    res.status(200).json(user);
  }

};
