const carsService = require("../../../services/carsService");

module.exports = {
  list(req, res) {
    carsService
      .list()
      .then(({ data, count }) => {
        res.status(200).json({
          status: "Success",
          data: { posts: data },
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

  create(req, res) {
    carsService
      .create(req.body)
      .then((cars) => {
        res.status(201).json({
          status: "Success",
          data: cars,
        });
      })
      .catch((err) => {
        res.status(422).json({
          status: "Failed",
          message: err.message,
        });
      });
  },

  update(req, res) {
    carsService
      .update(req.params.id, req.body)
      .then(() => {
        res.status(200).json({
          status: "Success",
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
    carsService
      .get(req.params.id)
      .then((cars) => {
        res.status(200).json({
          status: "Success",
          data: cars,
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
    carsService
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
