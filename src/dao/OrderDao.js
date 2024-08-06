const SuperDao = require('./SuperDao');
const models = require('../models');

const Order = models.order;

class OrderDao extends SuperDao {
    constructor() {
        super(Order);
    }
}

module.exports = OrderDao;
