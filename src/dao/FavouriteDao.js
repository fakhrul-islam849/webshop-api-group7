/* eslint-disable class-methods-use-this */
const SuperDao = require('./SuperDao');
const models = require('../models');

const Favourite = models.favourite;

class FavouriteDao extends SuperDao {
    constructor() {
        super(Favourite);
    }
}

module.exports = FavouriteDao;
