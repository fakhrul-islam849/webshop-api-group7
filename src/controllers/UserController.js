const httpStatus = require('http-status');
const UserAdminService = require('../service/UserAdminService');

class UserController {
    constructor() {
        this.userAdminService = new UserAdminService();
    }

    userDatatable = async (req, res) => {
        try {
            const response = await this.userAdminService.userDatatable(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getAllUser = async (req, res) => {
        try {
            const response = await this.userAdminService.getAllUser(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = UserController;
