const httpStatus = require('http-status');
const BrandService = require('../service/BrandService');

class BrandController {
    constructor() {
        this.brandService = new BrandService();
    }

    brandDataTable = async (req, res) => {
        try {
            const isExists = await this.brandService.brandDataTable(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    brandDetails = async (req, res) => {
        try {
            const isExists = await this.brandService.brandDetails(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    brandCreate = async (req, res) => {
        try {
            const isExists = await this.brandService.brandCreate(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    brandUpdate = async (req, res) => {
        try {
            const isExists = await this.brandService.brandUpdate(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    brandTopVisitor = async (req, res) => {
        try {
            const isExists = await this.brandService.brandTopVisitor(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getBrandList = async (req, res) => {
        try {
            const isExists = await this.brandService.getBrandList(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    lowStock = async (req, res) => {
        try {
            const isExists = await this.brandService.lowStock(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getAllBrandList = async (req, res) => {
        try {
            const isExists = await this.brandService.getAllBrandList(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getBrandListByPharmaId = async (req, res) => {
        try {
            const isExists = await this.brandService.getBrandListByPharmaId(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getBrandDetails = async (req, res) => {
        try {
            const isExists = await this.brandService.getBrandDetails(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = BrandController;
