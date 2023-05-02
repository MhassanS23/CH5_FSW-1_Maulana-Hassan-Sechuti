const { Superadmin } = require("../models");

module.exports = {
  findEmail(email){
    return Superadmin.findOne({
      where : {email}
    })
  },

  find(id) {
    return Superadmin.findByPk(id);
  },
};
