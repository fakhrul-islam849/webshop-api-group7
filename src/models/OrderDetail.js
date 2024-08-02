const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        static associate(models) {
            // CampaignSend.belongsTo(models.client, { foreignKey: 'client_id', targetKey: 'id' });
            OrderDetail.belongsTo(models.brand, {
                foreignKey: 'brand_id',
                targetKey: 'id',
            });
        }
    }

    OrderDetail.init(
        {
            user_uuid: DataTypes.UUID,
            order_id: DataTypes.INTEGER,
            brand_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            price: DataTypes.DECIMAL(10, 2),
        },
        {
            sequelize,
            modelName: 'order_detail',
            underscored: true,
        },
    );
    return OrderDetail;
};
