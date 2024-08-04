/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const UserDao = require("../dao/UserDao");
const responseHandler = require("../helper/responseHandler");

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  /**
   * Create a user
   * @param {Object} userBody
   * @returns {Object}
   */
  createUser = async (userBody) => {
    try {
      let message =
        "Successfully Registered the account! Please Verify your email.";
      if (await this.userDao.isEmailExists(userBody.email)) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Email already taken"
        );
      }
      const uuid = uuidv4();
      userBody.email = userBody.email.toLowerCase();
      userBody.password = bcrypt.hashSync(userBody.password, 8);
      userBody.uuid = uuid;
      userBody.name = userBody.name ? userBody.name : "";
      userBody.phone_number = userBody.phone_number
        ? userBody.phone_number
        : "";
      userBody.address = userBody.address ? userBody.address : "";

      let userData = await this.userDao.create(userBody);

      if (!userData) {
        message = "Registration Failed! Please Try again.";
        return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
      }
      // await this.sendVerificationEmail(uuid, userBody.first_name, userBody.email);
      userData = userData.toJSON();
      delete userData.password;

      return responseHandler.returnSuccess(
        httpStatus.CREATED,
        message,
        userData
      );
    } catch (e) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Something went wrong!"
      );
    }
  };

  

  /**
   * Get user
   * @param {String} email
   * @returns {Object}
   */

  isEmailExists = async (email) => {
    const message = "Email found!";
    if (!(await this.userDao.isEmailExists(email))) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email not Found!!"
      );
    }
    return responseHandler.returnSuccess(httpStatus.OK, message);
  };

  getUserByUuid = async (uuid) => {
    return this.userDao.findOneByWhere({ uuid });
  };

  
  

  // eslint-disable-next-line class-methods-use-this
  getDetails = async (req) => {
    try {
      return responseHandler.returnSuccess(
        httpStatus.OK,
        "user data",
        req.user
      );
    } catch (e) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Password Update Failed!"
      );
    }
  };

 
}

module.exports = UserService;
