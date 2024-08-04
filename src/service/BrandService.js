/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const httpStatus = require('http-status');
const { Op } = require('sequelize');
const BrandDao = require('../dao/BrandDao');

const responseHandler = require('../helper/responseHandler');
const { arrayObjectDuplicateRemove } = require('../utility/helperFunction');
const UploadFile = require('../helper/UploadFile');

class BrandService {
    constructor() {
        this.brandDao = new BrandDao();
        this.CategoryDao = new CategoryDao();
        this.uploadFile = new UploadFile();
    }

    brandDataTable = async (req) => {
        try {
            let where = {};
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
                };
            }

            const offset = page * limit;
            const data = await this.brandDao.getDataTableData(where, limit, offset);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Brand Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    brandDetails = async (req) => {
        try {
            const brandInfo = await this.brandDao.findById(req.params.id);
            if (brandInfo) {
                const genericInfo = await this.genericDao.findById(brandInfo.generic_id);
                const CategoryInfo = await this.CategoryDao.findById(
                    brandInfo.Category_id,
                );
                const dosageTypeInfo = await this.dosageTypeDao.findById(brandInfo.dosage_type_id);
                return responseHandler.returnSuccess(
                    httpStatus.CREATED,
                    'Successfully Found Brand Details',
                    {
                        data: {
                            brand: brandInfo,
                            generic: genericInfo,
                            Category: CategoryInfo,
                            dosage: dosageTypeInfo,
                        },
                    },
                );
            }
            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Sorry Generic do not found!!',
            );
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something Went Wrong!!');
        }
    };

    brandCreate = async (req) => {
        console.log('Brand create');
        try {
            const bodyData = req.body;
            const file = req.files?.image ? req.files.image : null;
            let filePath = null;

            if (file != null) {
                const destination = 'blog';
                const fileName = 'blog';
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
                Category_id: bodyData.Category_id,
                name: bodyData.name,
                unit_price: bodyData.unit_price,
                quantity: bodyData.quantity,
                package_info: bodyData.package_info,
                medicine_type: 1,
                medicine_for: 1,
                image: filePath,
            };
            console.log(data);
            const response = await this.brandDao.create(data);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.CREATED,
                    'Successfully Created Brand',
                    response,
                );
            }

            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Unable to save Brand Please Check Data',
            );
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, err.message);
        }
    };

    brandUpdate = async (req) => {
        try {
            const { id } = req.params;
            const bodyData = req.body;

            const where = {
                name: bodyData.name,
                strength: bodyData.strength,
            };
            const checkExist = await this.brandDao.findOneByWhere(where, ['id']);
            if (checkExist && checkExist.id != id) {
                return responseHandler.returnError(
                    httpStatus.BAD_REQUEST,
                    'Unable to update Brand Name & Strength Already Exist',
                );
            }
            const data = {
                name: bodyData.name,
                unit_price: bodyData.unit_price,
                strength: bodyData.strength,
                Category_id: bodyData.Category_id,
                status: bodyData.status,
            };

            const response = await this.brandDao.updateById(data, id);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.CREATED,
                    'Successfully Updated Brand',
                    response,
                );
            }

            return responseHandler.returnError(
                httpStatus.BAD_REQUEST,
                'Unable to update Brand Please Check Data',
            );
        } catch (err) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, err.message);
        }
    };

    getBrandList = async (req) => {
        try {
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 30;
            const type =
                req.query.type !== undefined
                    ? req.query.type
                    : brandConstant.MEDICINE_TYPE_ALLOPATHIC;

            let where = {
                medicine_type: type,
                status: commonStatus.STATUS_ACTIVE,
            };

            const medicineFor = req.query.mfor;
            if (req.query.mfor !== undefined) {
                where = {
                    medicine_for: medicineFor,
                    status: commonStatus.STATUS_ACTIVE,
                };
            }

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
            const data = await this.brandDao.getDataTableWithGenericCategoryAndDoges(
                where,
                limit,
                offset,
                [['name', 'ASC']],
            );
            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Brand Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    lowStock = async (req) => {
        try {
            let where = {
                quantity: {
                    [Op.lt]: 20, // Greater than 20
                },
            };
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 10;

            if (req.query.search_key !== '' && typeof req.query.search_key !== 'undefined') {
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
            const data = await this.brandDao.getDataTableData(where, limit, offset);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Brand Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getAllBrandList = async (req) => {
        const data = await this.brandDao.findAllOnlyIdName();
        try {
            return responseHandler.returnSuccess(httpStatus.OK, 'Brand Data', data);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getBrandListById = async (req) => {
        try {
            const page = req.query.page !== undefined ? req.query.page : 0;
            const limit = req.query.limit !== undefined ? req.query.limit : 30;
            const { Category_id } = req.query;

            let where = {
                Category_id,
            };

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
            const data = await this.brandDao.getDataTableWithGenericCategoryAndDoges(
                where,
                limit,
                offset,
                [['name', 'ASC']],
            );

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Brand Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getBrandDetails = async (req) => {
        try {
            const { brandId } = req.params || {};
            let mfgName = null;

            const brand = await this.brandDao.findByIdWithInclude(brandId, [
                'generic',
                'Category',
                'dosage_type',
            ]);
            if (brand) {
                await this.brandDao.incrementCountInFieldByWhere(['total_visitor'], {
                    id: brandId,
                });
                await this.totalVisitorDao.incrementCountInFieldByWhere(['brand'], {
                    id: 1,
                });
                if (brand.mfg_id) {
                    mfgName = await this.CategoryDao.findOneByWhere({ id: brand.mfg_id }, [
                        'id',
                        'name',
                    ]);
                }
                const where = {
                    [Op.or]: [
                        {
                            name: brand.name,
                        },
                    ],
                    id: {
                        [Op.notIn]: [brand.id],
                    },
                };
                const alsoAvailable = await this.brandDao.getBrandsWithInclude(where, [
                    'generic',
                    'Category',
                    'dosage_type',
                ]);

                const allAds = await this.GenericService.getAddForGeneric(brand.generic_id);
                return responseHandler.returnSuccess(httpStatus.OK, 'Brand Data', {
                    brand,
                    mfgName,
                    alsoAvailable,
                    allAds,
                });
            }
            return responseHandler.returnError(httpStatus.NOT_FOUND, 'No Data Found');
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };
}

module.exports = BrandService;
