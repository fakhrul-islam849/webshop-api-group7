/* eslint-disable class-methods-use-this */
const { Op, Sequelize } = require('sequelize');
const SuperDao = require('./SuperDao');
const models = require('../models');

const Brand = models.brand;

class BrandDao extends SuperDao {
    constructor() {
        super(Brand);
    }

    async getBrandFullSearch(searchQuery, limit = 10) {
        try {
            return Brand.findAndCountAll({
                attributes: ['name', 'strength'],
                limit: parseInt(limit, 10),
                where: {
                    name: {
                        [Op.like]: `%${searchQuery}%`,
                    },
                },
                order: [
                    [
                        Sequelize.literal(
                            `CASE WHEN name='${searchQuery}' THEN 0 WHEN name LIKE '${searchQuery}%' THEN 1 WHEN name LIKE '%${searchQuery}%' THEN 2 ELSE 3 END`,
                        ),
                    ],
                    [Sequelize.literal(`ABS(CHAR_LENGTH(name) - CHAR_LENGTH('${searchQuery}'))`)],
                ],
            });
        } catch (e) {
            console.log(e);
        }
    }

    async getBrandsWithInclude(where, include = []) {
        try {
            return Brand.findAll({
                include,
                where,
            });
        } catch (e) {}
    }

    async findByIdWithInclude(id, include = []) {
        return Brand.findOne({
            where: { id },
            include,
        })
            .then((result) => {
                return result;
            })
            .catch((e) => {});
    }
}

module.exports = BrandDao;
