module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
    },

    {
      freezTableName: true,
    }
  );

  return cart;
};
