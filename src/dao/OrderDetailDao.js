const SuperDao = require('./SuperDao');
const models = require('../models');

const OrderDetail = models.order_detail;

class OrderDetailDao extends SuperDao {
    constructor() {
        super(OrderDetail);
    }

    async getOrderWithInclude(where, include = []) {
        try {
            return OrderDetail.findAll({
                include,
                where,
            });
        } catch (e) {}
    }
}

module.exports = OrderDetailDao;
