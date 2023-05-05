const admin = require("../models/admin");
const carsRepository = require("../repositories/carsRepository");
const {cloudinary} = require("../../utils/cloudinary");

module.exports = {
  async create(requestBody) {
    const id = requestBody.user.id;
    const result = await cloudinary.uploader.upload(requestBody.file.path);
    const name = requestBody.body.name;
    const price = requestBody.body.price;
    const size = requestBody.body.size;
    const image = requestBody.body.image;
    const x = false;

    const adminUser = await carsRepository.findEmailAdmin(requestBody.user.email);
    const superadminUser = await carsRepository.findEmailSuperadmin(requestBody.user.email);

    console.log(result);
    if(adminUser){
      return carsRepository.create({
        name,
        price,
        size,
        image: result.url,
        delete: x,
        created_by_admin: id
      });
    }

    if(superadminUser){
      return carsRepository.create({
        name,
        price,
        size,
        image: result.url,
        delete: x,
        created_by_superadmin: id
      });
    }

  },

  async update(id, requestBody) {
    const idUser = requestBody.user.id;
    const name = requestBody.body.name;
    const price = requestBody.body.price;
    const size = requestBody.body.size;
    const x = false;


    let new_img = '';

    if(requestBody.file == undefined){
        const findCars = await carsRepository.find(id);
        new_img = findCars.image;
    }else{
        const upload_img=  await cloudinary.uploader.upload(requestBody.file.path);
         new_img = upload_img.url;
    }

    const adminUser = await carsRepository.findEmailAdmin(requestBody.user.email);
    const superadminUser = await carsRepository.findEmailSuperadmin(requestBody.user.email);

    if(adminUser){
      return carsRepository.update(id, {
        name,
        price,
        size,
        image: new_img,
        delete: x,
        updated_by_admin: idUser
      });
    }
    
    if(superadminUser){
      return carsRepository.update(id, {
        name,
        price,
        size,
        image: new_img,
        delete: x,
        updated_by_superadmin: idUser
      });
    }
  },

  async delete(id, requestBody) {
    const x = true;
    const idUser = requestBody.id;

    const adminUser = await carsRepository.findEmailAdmin(requestBody.email);
    const superadminUser = await carsRepository.findEmailSuperadmin(requestBody.email);

    if(adminUser){
      return carsRepository.update(id, {
        delete: x,
        deleted_by_admin: idUser
      });
    }
    
    if(superadminUser){
      return carsRepository.update(id, {
        delete: x,
        deleted_by_superadmin: idUser
      });
    }

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
