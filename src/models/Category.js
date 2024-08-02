const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    Category.init(
        {
            name: DataTypes.STRING,
            logo: DataTypes.STRING,
            status: DataTypes.SMALLINT,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Category',
            underscored: true,
        },
    );
    return Category;
};
