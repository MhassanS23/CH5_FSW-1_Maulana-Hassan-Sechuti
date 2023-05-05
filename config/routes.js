const express = require("express");
const controllers = require("../app/controllers");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const uploadPhoto = require('../utils/multer')
const multer = require('multer');
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images');
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + '--' + file.originalname)
  },
});
const upload = multer({storage: fileStorageEngine})

const apiRouter = express.Router();

apiRouter.post('/single', uploadPhoto.single('images'),(req, res)=> {
  res.send("single file upload sukses");
});
apiRouter.use('/api-docs', swaggerUi.serve);
apiRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

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
apiRouter.post("/api/v1/users/register", controllers.api.v1.userController.register);
apiRouter.post("/api/v1/superadmin/register", controllers.api.v1.superadminController.register);
apiRouter.post("/api/v1/users/login", controllers.api.v1.userController.login);

//SUPERADMIN 
apiRouter.post("/api/v1/superadmin/login", controllers.api.v1.superadminController.login);
apiRouter.post("/api/v1/superadmin/createAdmin", controllers.api.v1.authController.authorizeSuperadmin, controllers.api.v1.adminController.create);
apiRouter.post("/api/v1/superadmin/cekstatus", controllers.api.v1.authController.authorizeSuperadmin, controllers.api.v1.authController.whoAmI);

//ADMIN
apiRouter.post("/api/v1/admin/login", controllers.api.v1.adminController.login);
apiRouter.post("/api/v1/admin/cekstatus", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.authController.whoAmI);


// CARS CRUD ADMIN SUPERADMIN
apiRouter.get("/api/v1/cars", controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.carsController.list);
apiRouter.post("/api/v1/cars", controllers.api.v1.authController.authorizeAdmin,uploadPhoto.single('image'), controllers.api.v1.carsController.create);
apiRouter.put("/api/v1/cars/:id", controllers.api.v1.authController.authorizeAdmin, uploadPhoto.single('image'), controllers.api.v1.carsController.update);
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
