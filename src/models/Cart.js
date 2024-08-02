const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    Cart.init(
        {
            user_uuid: DataTypes.UUID,
            brand_id: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            unit_price: DataTypes.DECIMAL(10, 2),
        },
        {
            sequelize,
            modelName: 'cart',
            underscored: true,
        },
    );
    return Cart;
};
