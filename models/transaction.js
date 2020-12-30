module.exports = (sequelize, DataType) => {
  const Transaction = sequelize.define('transaction', {
      type: {
        type: DataType.STRING
      },
      value: {
        type: DataType.DOUBLE
      },
      date: {
        type: DataType.DATE
      }
    },
    {
      freezeTableName: true,
    }
  );

  return Transaction;
}