module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      totalAmount: {
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

  return order;
};
