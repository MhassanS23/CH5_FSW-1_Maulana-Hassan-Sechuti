const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "secret"

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    return error;
  }
}

const checkPassword = async (password, encryptedPassword) =>{
  try {
    const resultCompare = await bcrypt.compare(password, encryptedPassword);
    return resultCompare;
  } catch (error) {
    return error;
  }
}

const createToken = async (payload) => {
  try {
    const token = await jwt.sign({payload}, secretKey);
    return token;
  } catch (error) {
    return error;
  }
}

const verifyToken = async (payload) =>{
  try {
    const tokenPayload = jwt.verify(payload, secretKey);
    return tokenPayload;
  } catch (error) {
    return error;
  }
}


module.exports = {
  async create(requestBody) {
    const name = requestBody.name;
    const email = requestBody.email;
    const encryptedPassword = await encryptPassword(requestBody.encryptedPassword);

    const userEmail = await userRepository.findEmail(email);

    if(userEmail){
      return{
        data: null,
        message: "Email has been taken !!!",
        status: "Failed"
      };
    }

    newUser = await userRepository.create({ name, email, encryptedPassword });
    if(!userEmail){
      return{
        data: newUser,
        status: "Success"
      }
    }

  },

  async login(requestBody) {
    const email = requestBody.email;
    const password = requestBody.encryptedPassword;

    const user = await userRepository.findEmail(email);

    if(!user){
      return{
        data: null,
        message: "Wrong Email, Please Try Again",
        valid: false
      }
    }

    const isPasswordCorrect = await checkPassword(password, user.encryptedPassword);

    if(!isPasswordCorrect){
      return{
        data: null,
        message: "Wrong Password, Please Try Again!",
        valid: false
      }
    }

    const jwtToken = await createToken(user)

    if(isPasswordCorrect){
      return{
        data: { 
          id: user.id,
          role: "user",
          name: user.name,
          email: user.email,
          jwtToken,
          encryptedPassword: user.encryptedPassword,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        message: "Login Succes",
        valid: true
      }
    }

  },

  async update(id, requestBody) {
    const data = await userRepository.find(id);
    const name = requestBody.name;
    const email = requestBody.email;
    const encryptedPassword = await encryptPassword(requestBody.encryptedPassword);
    const dataUpdate = userRepository.update(id, { name, email, encryptedPassword });

    if(!data){
      return{
        data: null,
        message: "Update Failed, Data Not Found!",
        valid: false
      }
    }

    if(data){
      return {
        data: dataUpdate,
        message: "Update Succes!!!",
        valid: true
      }
    }
  },

  async authorize(requestHeader){
    const bearerToken = requestHeader;
    const token = bearerToken.split(" ")[1];

    const tokenPayload = await verifyToken(token);

    userData = await userRepository.find(tokenPayload.payload.id);
    return{
      data: userData
    };
  },

  delete(id) {
    return userRepository.delete(id);
  },

  async list() {
    try {
      const users = await userRepository.findAll();
      const userCount = await userRepository.getTotalUser();

      return {
        data: users,
        count: userCount,
      };
    } catch (err) {
      throw err;
    }
  },

  get(id) {
    return userRepository.find(id);
  },
};
