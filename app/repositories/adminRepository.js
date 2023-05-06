const { Admin } = require("../models");

module.exports = {
  create(createArgs) {
    return Admin.create(createArgs);
  },

  findEmail(email){
    return Admin.findOne({
      where : {email}
    })
  },

  find(id) {
    return Admin.findByPk(id);
  },
};
