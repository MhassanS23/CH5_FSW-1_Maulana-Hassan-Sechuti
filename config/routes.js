const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();

// CARS CRUD
apiRouter.get("/api/v1/cars", controllers.api.v1.carsController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.carsController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.carsController.update);
apiRouter.get("/api/v1/cars/:id", controllers.api.v1.carsController.show);
apiRouter.delete(
  "/api/v1/cars/:id",
  controllers.api.v1.carsController.destroy
);


//USER
apiRouter.get("/api/v1/users", controllers.api.v1.userController.list);
apiRouter.get("/api/v1/users/:id", controllers.api.v1.userController.show);
apiRouter.put("/api/v1/users/:id", controllers.api.v1.userController.update);
apiRouter.delete(
  "/api/v1/users/:id",
  controllers.api.v1.userController.destroy
);

//USER AUTHENTICATION
apiRouter.get("/api/v1/whoami", controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);
apiRouter.post("/api/v1/register", controllers.api.v1.authController.register);
apiRouter.post("/api/v1/login", controllers.api.v1.authController.login);


apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
