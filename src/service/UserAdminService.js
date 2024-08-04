const { Op } = require('sequelize');
const httpStatus = require('http-status');
const responseHandler = require('../helper/responseHandler');
const UserDao = require('../dao/UserDao');
const BrandDao = require('../dao/BrandDao');

class UserAdminService {
    constructor() {
        this.userDao = new UserDao();
        this.brandDao = new BrandDao();
    }

    userDatatable = async (req) => {
        try {
            let where = { role: userConstant.ROLE_USER };
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 10;

            if (req.query.search_key !== '' && typeof req.query.search_key !== 'undefined') {
                where = {
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.search_key}%`,
                            },
                        },
                    ],
                    role: userConstant.ROLE_USER,
                };
            }

            const offset = page * limit;
            const data = await this.userDao.getDataTableData(where, limit, offset);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Data Table',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, e.message);
        }
    };

    getAllUser = async (req) => {
        try {
            const data = await this.userDao.findAll();
            return responseHandler.returnSuccess(httpStatus.OK, 'Data', data);
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, e.message);
        }
    };
}

module.exports = UserAdminService;
