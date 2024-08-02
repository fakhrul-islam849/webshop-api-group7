const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            // CampaignSend.belongsTo(models.client, { foreignKey: 'client_id', targetKey: 'id' });
            Brand.belongsTo(models.dosage_type, {
                foreignKey: 'dosage_type_id',
                targetKey: 'id',
            });
            Brand.belongsTo(models.generic, {
                foreignKey: 'generic_id',
                targetKey: 'id',
            });
            Brand.belongsTo(models.Category, {
                foreignKey: 'Category_id',
                targetKey: 'id',
            });
        }
    }

    Brand.init(
        {
            name: DataTypes.STRING,
            Category_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            unit_price: DataTypes.DECIMAL(10, 2),
        },
        {
            sequelize,
            modelName: 'brand',
            underscored: true,
        },
    );
    return Brand;
};
