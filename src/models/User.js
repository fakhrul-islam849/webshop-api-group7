const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }

    User.init(
        {
            uuid: DataTypes.UUID,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            status: DataTypes.INTEGER,
            role: DataTypes.SMALLINT,
        },
        {
            sequelize,
            modelName: 'user',
            underscored: true,
        },
    );
    return User;
};
