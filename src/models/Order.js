const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    Order.init(
        {
            user_uuid: DataTypes.UUID,
            total: DataTypes.DECIMAL(10, 2),
            payment: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'order',
            underscored: true,
        },
    );
    return Order;
};
