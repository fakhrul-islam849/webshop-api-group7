/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
const httpStatus = require('http-status');
const { Op } = require('sequelize');
const lodash = require('lodash');
const OrderDao = require('../dao/OrderDao');
const OrderDetailDao = require('../dao/OrderDetailDao');
const CartDao = require('../dao/CartDao');
const BrandDao = require('../dao/BrandDao');
const responseHandler = require('../helper/responseHandler');

class OrderService {
    constructor() {
        this.orderDao = new OrderDao();
        this.orderDetailDao = new OrderDetailDao();
        this.cartDao = new CartDao();
        this.brandDao = new BrandDao();
    }

    orderDataTable = async (req) => {
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
            const data = await this.orderDao.getDataTableData(where, limit, offset);

            return responseHandler.returnSuccess(
                httpStatus.OK,
                'Order Data',
                responseHandler.getPaginationData(data, page, limit),
            );
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    save = async (req) => {
        try {
            const { uuid } = req.user;
            const where = { user_uuid: uuid };
            const carts = await this.cartDao.findByWhere(where);
            let total = 0;
            for (const item of carts) {
                total = item.quantity * item.unit_price + total;
            }
            const order = {
                user_uuid: uuid,
                total,
                payment: 'VISA',
            };

            const saveOrder = await this.orderDao.create(order);

            for (const details of carts) {
                const orderDetails = {
                    user_uuid: uuid,
                    order_id: saveOrder.id,
                    brand_id: details.brand_id,
                    quantity: details.quantity,
                    price: details.unit_price,
                };
                await this.brandDao.decrementCountInFieldByWhere(['quantity'], {
                    id: details.brand_id,
                });
                await this.orderDetailDao.create(orderDetails);
            }
            await this.cartDao.deleteByWhere(where);
            return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Create Order', {});
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, 'Something went wrong!');
        }
    };

    orderDetailsById = async (req) => {
        try {
            const { id } = req.params;
            const where = { order_id: id };
            const data = await this.orderDetailDao.getOrderWithInclude(where, ['brand']);
            if (data) {
                return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Get ', data);
            }
            return responseHandler.returnSuccess(httpStatus.BAD_REQUEST, 'Sorry invalid ID', data);
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, e.message);
        }
    };

    userBasedOrder = async (req) => {
        try {
            const { uuid } = req.user;
            const where = { user_uuid: uuid };
            const data = await this.orderDetailDao.getOrderWithInclude(where, ['brand']);
            if (data) {
                return responseHandler.returnSuccess(httpStatus.OK, 'Successfully Get ', data);
            }
            return responseHandler.returnSuccess(httpStatus.BAD_REQUEST, 'Sorry invalid ID', data);
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_GATEWAY, e.message);
        }
    };
}

module.exports = OrderService;
