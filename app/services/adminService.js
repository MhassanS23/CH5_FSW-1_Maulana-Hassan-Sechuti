const adminRepository = require("../repositories/adminRepository");
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
    const token = await jwt.sign({
      payload,
      role: "Admin",
    }, secretKey);
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
    const password = await encryptPassword(requestBody.password);

    const userEmail = await adminRepository.findEmail(email);

    if(userEmail){
      return{
        data: null,
        message: "Email has been taken !!!",
        status: "Failed"
      };
    }

    newUser = await adminRepository.create({ name, email, password });
    if(!userEmail){
      return{
        data: newUser,
        status: "Success"
      }
    }

  },

  async login(requestBody) {
    const email = requestBody.email;
    const password = requestBody.password;

    const user = await adminRepository.findEmail(email);

    if(!user){
      return{
        data: null,
        message: "Wrong Email, Admin not Found!",
        valid: false
      }
    }

    const isPasswordCorrect = await checkPassword(password, user.password);

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
          role: "Admin",
          name: user.name,
          email: user.email,
          jwtToken,
          password: user.password,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        message: "Login Succes",
        valid: true
      }
    }

  },

  async authorize(requestHeader){
    const bearerToken = requestHeader;
    const token = bearerToken.split(" ")[1];

    const tokenPayload = await verifyToken(token);

    return{
      data: tokenPayload
    };
  },

};
