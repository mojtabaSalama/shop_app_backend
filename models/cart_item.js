module.exports = (sequelize, DataTypes) => {
  const cart_item = sequelize.define(
    "cart_item",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      amount: {
        type: DataTypes.INTEGER,
      },

      totalPrice: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezTableName: true,
    }
  );

  return cart_item;
};
