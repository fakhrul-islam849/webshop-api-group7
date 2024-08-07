const httpStatus = require('http-status');
const CategoryService = require('../service/CategoryService');

class CategoryController {
    constructor() {
        this.CategoryService = new CategoryService();
    }

    CategoryDataTable = async (req, res) => {
        try {
            const isExists = await this.CategoryService.CategoryDataTable(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    CategoryCreate = async (req, res) => {
        try {
            const isExists = await this.CategoryService.CategoryCreate(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    CategoryUpdate = async (req, res) => {
        try {
            const isExists = await this.CategoryService.CategoryUpdate(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getCategory = async (req, res) => {
        try {
            const isExists = await this.CategoryService.getCategory(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    deleteCategory = async (req, res) => {
        try {
            const isExists = await this.CategoryService.deleteCategory(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    brandCountUpdate = async (req, res) => {
        try {
            const isExists = await this.CategoryService.brandCountUpdate(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getAllCategory = async (req, res) => {
        try {
            const isExists = await this.CategoryService.getAllCategory(req);
            res.status(isExists.statusCode).send(isExists.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getCategoryList = async (req, res) => {
        try {
            const response = await this.CategoryService.getCategoryList(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getCategoryById = async (req, res) => {
        try {
            const response = await this.CategoryService.getCategoryById(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getDashboardData = async (req, res) => {
        try {
            const response = await this.CategoryService.getDashboardData(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = CategoryController;
