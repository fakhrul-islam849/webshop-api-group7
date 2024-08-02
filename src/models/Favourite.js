const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favourite extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    Favourite.init(
        {
            user_uuid: DataTypes.UUID,
            brand_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'favourite',
            underscored: true,
        },
    );
    return Favourite;
};
