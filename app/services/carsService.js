const carsRepository = require("../repositories/carsRepository");

module.exports = {
  create(requestBody) {
    const cars = {
      name: requestBody.body.name,
      price: requestBody.body.price,
      size: requestBody.body.size,
      image: requestBody.body.image,
      delete: false,
      created_by: requestBody.user.email
    }

    return carsRepository.create(cars);
  },

  update(id, requestBody) {
    const cars = {
      name: requestBody.body.name,
      price: requestBody.body.price,
      size: requestBody.body.size,
      image: requestBody.body.image,
      delete: false,
      updated_by: requestBody.user.email
    }

    return carsRepository.update(id, cars);
  },

  delete(id, requestBody) {
    const cars = {
      delete: true,
      deleted_by: requestBody.email
    }

    return carsRepository.update(id, cars);
  },

  async list() {
    try {
      const cars = await carsRepository.findAll();
      const carsCount = await carsRepository.getTotalCars();

      return {
        data: cars,
        count: carsCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return postRepository.find(id);
  },
};
