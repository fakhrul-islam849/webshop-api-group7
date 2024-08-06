const SuperDao = require('./SuperDao');
const models = require('../models');

const { Category } = models;

class CategoryDao extends SuperDao {
    constructor() {
        super(Category);
    }
}

module.exports = CategoryDao;
