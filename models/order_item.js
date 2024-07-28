module.exports = (sequelize, DataTypes) => {
  const order_item = sequelize.define(
    "order_item",
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

  return order_item;
};
