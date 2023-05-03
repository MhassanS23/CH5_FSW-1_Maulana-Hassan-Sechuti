const { cars_data } = require("../models");

module.exports = {
  create(createArgs) {
    return cars_data.create(createArgs);
  },

  update(id, updateArgs) {
    return cars_data.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return cars_data.destroy({
      where: {
        id,
      },
    });
  },

  find(id) {
    return cars_data.findByPk(id);
  },

  findAll() {
    return cars_data.findAll({
      where: {
        delete : false
      }
    });
  },

  getTotalCars() {
    return cars_data.count({
      where: {
        delete : false
      }
    });
  },
};
