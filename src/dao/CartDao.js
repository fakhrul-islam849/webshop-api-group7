/* eslint-disable class-methods-use-this */
const SuperDao = require('./SuperDao');
const models = require('../models');

const Cart = models.cart;

class CartDao extends SuperDao {
    constructor() {
        super(Cart);
    }

    async getCartQuantity(where) {
        return Cart.findAll({
            where,
            attributes: [
                [models.sequelize.fn('sum', models.sequelize.col('quantity')), 'quantity'],
            ],
        });
    }
}

module.exports = CartDao;
