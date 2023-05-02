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

  list(req, res) {
    userService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "Success",
          data: { users: data },
          meta: { total: count },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  update(req, res) {
    userService
      .update(req.params.id, req.body)
      .then((user) => {

        if(!user.data){
          res.status(422).json({
            status:"Failed",
            message: user.message,
            data: null
          });
          return;
        }

        res.status(200).json({
          status: "Success",
          message: user.message
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  show(req, res) {
    userService
      .get(req.params.id)
      .then((user) => {
        res.status(200).json({
          status: "Success",
          data: user,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  destroy(req, res) {
    userService
      .delete(req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },
};
