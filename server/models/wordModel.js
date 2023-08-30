const createWordModel = (sequelize, DataTypes) => {
    return sequelize.define('Word', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      text: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
};

module.exports = createWordModel;