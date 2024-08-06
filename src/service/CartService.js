/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const httpStatus = require('http-status');
const { Op } = require('sequelize');
const lodash = require('lodash');
const CartDao = require('../dao/CartDao');
const FavouriteDao = require('../dao/FavouriteDao');
const BrandDao = require('../dao/BrandDao');
const responseHandler = require('../helper/responseHandler');

class CartService {
    constructor() {
        this.cartDao = new CartDao();
        this.brandDao = new BrandDao();
        this.favouriteDao = new FavouriteDao();
    }

    getCarts = async (req) => {
        const { uuid } = req.user;
        try {
            // getAllWithGenericCategoryAndDoges
            const data = await this.cartDao.findByWhere({ user_uuid: uuid });
            const brandIds = [];
            if (data && data.length > 0) {
                for (const item of data) {
                    brandIds.push(item.brand_id);
                }
            }
            const brandData = await this.brandDao.getAllWithGenericCategoryAndDoges({
                id: brandIds,
            });

            if (brandData?.length > 0) {
                for (const key in brandData) {
                    brandData[key] = brandData[key].toJSON();
                    const singleCart = lodash.find(data, (singleData) => {
                        return singleData.brand_id == brandData[key].id;
                    });

                    brandData[key].quantity = singleCart?.quantity ? singleCart?.quantity : 0;
                }
            }

            const quantity = await this.cartDao.getCartQuantity({ user_uuid: uuid });

            return responseHandler.returnSuccess(httpStatus.OK, 'Message Send Successfully', {
                brandData,
                quantity: quantity[0].quantity,
            });
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    addToCart = async (req) => {
        try {
            const { uuid } = req.user;
            const { brand_id } = req.body;
            const where = {
                user_uuid: uuid,
                brand_id,
            };
            const brandWhere = { id: brand_id };

            const cartData = await this.cartDao.findOneByWhere(where);
            if (cartData) {
                await this.cartDao.updateById({ quantity: cartData.quantity + 1 }, cartData.id);
            } else {
                const brand = await this.brandDao.findOneByWhere(brandWhere);
                console.log(brand);
                const data = {
                    user_uuid: uuid,
                    brand_id,
                    quantity: 1,
                    unit_price: brand.unit_price,
                };

                await this.cartDao.create(data);
            }

            return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Add To Cart', {});
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    removeFromCart = async (req) => {
        try {
            const { uuid } = req.user;
            const { brand_id } = req.body;
            const where = {
                user_uuid: uuid,
                brand_id,
            };
            const cartData = await this.cartDao.findOneByWhere(where);
            if (cartData) {
                const checkQuantity = cartData.quantity - 1;
                if (checkQuantity <= 0) {
                    await this.cartDao.deleteByWhere(where);
                } else {
                    await this.cartDao.updateById({ quantity: checkQuantity }, cartData.id);
                }
            }

            return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Add To Cart', {});
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    cartItemDelete = async (req) => {
        try {
            const { uuid } = req.user;
            const { brand_id } = req.body;
            const where = {
                user_uuid: uuid,
                brand_id,
            };
            await this.cartDao.deleteByWhere(where);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Successfully remove from cartCart',
                {},
            );
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getAllFavoritesBrandIds = async (req) => {
        const { uuid } = req.user;
        try {
            // getAllWithGenericCategoryAndDoges
            const data = await this.favouriteDao.findByWhere({ user_uuid: uuid });
            const brandIds = [];
            if (data && data.length > 0) {
                for (const item of data) {
                    brandIds.push(item.brand_id);
                }
            }

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Message Send Successfully',
                brandIds,
            );
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    addToFavorite = async (req) => {
        try {
            const { uuid } = req.user;
            const { brand_id } = req.body;

            const data = {
                user_uuid: uuid,
                brand_id,
            };

            await this.favouriteDao.create(data);

            return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Add To Favorite', {});
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    removeFromFavorite = async (req) => {
        try {
            const { uuid } = req.user;
            const { brand_id } = req.body;
            const where = {
                user_uuid: uuid,
                brand_id,
            };
            const response = await this.favouriteDao.deleteByWhere(where);
            if (response) {
                return responseHandler.returnSuccess(
                    httpStatus.OK,
                    'Successfully Remove From Favorite',
                    {},
                );
            }
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    getWishList = async (req) => {
        const { uuid } = req.user;
        try {
            // getAllWithGenericCategoryAndDoges
            const data = await this.favouriteDao.findByWhere({ user_uuid: uuid });
            const brandIds = [];
            if (data && data.length > 0) {
                for (const item of data) {
                    brandIds.push(item.brand_id);
                }
            }
            const brandData = await this.brandDao.getAllWithGenericCategoryAndDoges({
                id: brandIds,
            });

            return responseHandler.returnSuccess(httpStatus.OK, 'Message Send Successfully', {
                brandData,
            });
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };
}

module.exports = CartService;
