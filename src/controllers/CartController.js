const httpStatus = require('http-status');
const CartService = require('../service/CartService');

class CartController {
    constructor() {
        this.cartService = new CartService();
    }

    getCarts = async (req, res) => {
        try {
            const response = await this.cartService.getCarts(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addToCart = async (req, res) => {
        try {
            const response = await this.cartService.addToCart(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    removeFromCart = async (req, res) => {
        try {
            const response = await this.cartService.removeFromCart(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    cartItemDelete = async (req, res) => {
        try {
            const response = await this.cartService.cartItemDelete(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getAllFavoritesBrandIds = async (req, res) => {
        try {
            const response = await this.cartService.getAllFavoritesBrandIds(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    addToFavorite = async (req, res) => {
        try {
            const response = await this.cartService.addToFavorite(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    removeFromFavorite = async (req, res) => {
        try {
            const response = await this.cartService.removeFromFavorite(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };

    getWishList = async (req, res) => {
        try {
            const response = await this.cartService.getWishList(req);
            res.status(response.statusCode).send(response.response);
        } catch (e) {
            // logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}

module.exports = CartController;
