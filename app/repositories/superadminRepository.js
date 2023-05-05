const { Superadmin } = require("../models");

module.exports = {
  create(createArgs) {
    return Superadmin.create(createArgs);
  },

  findEmail(email){
    return Superadmin.findOne({
      where : {email}
    })
  },

  find(id) {
    return Superadmin.findByPk(id);
  },
};
