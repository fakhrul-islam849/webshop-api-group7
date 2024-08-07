/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const httpStatus = require('http-status');
const { Op } = require('sequelize');
const fs = require('fs');
const CategoryDao = require('../dao/CategoryDao');
const BrandDao = require('../dao/BrandDao');
const DiagnosticTestDao = require('../dao/DiagnosticTestDao');
const logger = require('../config/logger');
const responseHandler = require('../helper/responseHandler');
const { commonStatus } = require('../config/constant');
const UploadFile = require('../helper/UploadFile');

class AuthService {
    constructor() {
        this.CategoryDao = new CategoryDao();
        this.brandDao = new BrandDao();
        this.diagnosticTestDao = new DiagnosticTestDao();
        this.uploadFile = new UploadFile();
    }

    CategoryDataTable = async (req) => {
        try {
            let where = {};
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 10;

            if (typeof req.query.search_key !== 'undefined' && req.query.search_key !== '') {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `%${req.query.search_key}%`,
                            },
                        },
                    ],
                };
            }

            const offset = page * limit;
            const data = await this.CategoryDao.getDataTableData(where, limit, offset);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Category Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    CategoryCreate = async (req) => {
        try {
            const bodyData = req.body;

            const data = {
                name: bodyData.name,
                status: commonStatus.STATUS_ACTIVE,
                description: bodyData.description,
            };

            const response = await this.CategoryDao.create(data);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.CREATED,
                    'Successfully Category Created',
                    response,
                );
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something Went Wrong!!');
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };

    CategoryUpdate = async (req) => {
        try {
            const { id } = req.params;
            const bodyData = req.body;
            const file = req.files?.logo ? req.files.logo : null;

            const exist = await this.CategoryDao.findOneByWhere(
                {
                    name: bodyData.name,
                },
                ['id'],
            );

            if (exist && exist.id != id) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Category Name Exist!!',
                );
            }
            let filePath = bodyData.old_logo;
            if (filePath && filePath !== 'null') {
                if (fs.existsSync(`./${filePath}`)) {
                    fs.unlinkSync(`./${filePath}`);
                }
            }

            const CategoryName = bodyData.name.trim();
            if (file != null) {
                const destination = 'Category';
                const fileName = CategoryName.replace(/\s/g, '-');
                const fileResponse = await this.uploadFile.uploadImage(file, destination, fileName);
                if (!fileResponse.status) {
                    return responseHandler.returnError(
                        httpStatus.BAD_REQUEST,
                        fileResponse.message,
                    );
                }
                filePath = fileResponse.destination;
            }
            const data = {
                name: bodyData.name,
                logo: filePath,
                status: bodyData.status,
                description: bodyData.description ? bodyData.description : null,
                established: bodyData.established ? bodyData.established : null,
                market_share: bodyData.market_share ? bodyData.market_share : 0,
                growth: bodyData.growth ? bodyData.growth : 0,
                total_generics: bodyData.total_generics ? bodyData.total_generics : 0,
                headquarter: bodyData.headquarter ? bodyData.headquarter : '',
                location: bodyData.location ? bodyData.location : '',
                contact_details: bodyData.contact_details ? bodyData.contact_details : '',
                fax: bodyData.fax ? bodyData.fax : '',
            };

            const response = await this.CategoryDao.updateById(data, id);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Successfully Category Updated',
                    data,
                );
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something Went Wrong!!');
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };

    getCategory = async (req) => {
        try {
            const { id } = req.params;

            const response = await this.CategoryDao.findById(id);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Successfully Get Category Data',
                    response,
                );
            }
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'Category Not Found');
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };

    deleteCategory = async (req) => {
        try {
            const { id } = req.params;

            const exist = await this.CategoryDao.findById(id);
            if (exist) {
                const used = await this.brandDao.findOneByWhere({
                    Category_id: id,
                });
                if (used) {
                    return responseHandler.returnSuccess(
                        httpStatus.BAD_GATEWAY,
                        'Unable to delete! Used in Brand',
                    );
                }
                const response = await this.CategoryDao.deleteByWhere({ id });
                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Successfully Delete Category',
                    response,
                );
            }
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'Category Not Found');
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };


    getAllCategory = async (req) => {
        try {
            const data = await this.CategoryDao.findAllOnlyIdName();

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Successfully Get All Category',
                data,
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, e.message);
        }
    };

    getCategoryList = async (req) => {
        try {
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 30;

            let where = { status: commonStatus.STATUS_ACTIVE };

            if (req.query.search_key !== '' && typeof req.query.search_key !== 'undefined') {
                where = {
                    ...where,
                    [Op.or]: [
                        {
                            name: {
                                [Op.like]: `${req.query.search_key}%`,
                            },
                        },
                    ],
                };
            }

            const offset = page * limit;
            const data = await this.CategoryDao.getDataTableData(where, limit, offset, [
                ['name', 'ASC'],
            ]);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Category Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getCategoryById = async (req) => {
        try {
            const { id } = req.params;
            const response = await this.CategoryDao.findById(id);

            return responseHandler.returnSuccess(httpStatus.OK, 'Get details', response);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

module.exports = AuthService;
