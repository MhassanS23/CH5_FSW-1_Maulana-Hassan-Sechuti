const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

//USER
apiRouter.get("/api/v1/users", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.list);
apiRouter.get("/api/v1/users/:id", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.show);
apiRouter.put("/api/v1/users/:id", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.update);
apiRouter.delete(
  "/api/v1/users/:id",
  controllers.api.v1.authController.authorizeAdmin,
  controllers.api.v1.userController.destroy
);

//USER AUTHENTICATION
apiRouter.get("/api/v1/whoami", controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);
apiRouter.post("/api/v1/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.userController.login);

//SUPERADMIN 
apiRouter.post("/api/v1/superadmin/login", controllers.api.v1.superadminController.login);
apiRouter.post("/api/v1/superadmin/addAdmin", controllers.api.v1.authController.authorizeSuperadmin, controllers.api.v1.adminController.create);
apiRouter.post("/api/v1/superadmin/cekstatus", controllers.api.v1.authController.authorizeSuperadmin, controllers.api.v1.authController.whoAmI);

//ADMIN
apiRouter.post("/api/v1/admin/login", controllers.api.v1.adminController.login);
apiRouter.post("/api/v1/admin/cekstatus", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.authController.whoAmI);


// CARS CRUD ADMIN SUPERADMIN
apiRouter.get("/api/v1/cars", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.carsController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.carsController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.carsController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.carsController.show);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.authController.authorizeAdmin,
  controllers.api.v1.carsController.destroy
);


apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
