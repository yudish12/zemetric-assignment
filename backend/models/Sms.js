const { DataTypes } = require("sequelize");
const { SMS_STATUSES } = require("../config");
const User = require("./User");
const { sequelizeClient } = require("../utils/db");

const Sms = sequelizeClient.define(
  "Sms",
  {
    // Model attributes are defined here
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User, // Reference the User table
        key: "phone_number", // Use phone_number as the foreign key
      },
      onDelete: "CASCADE", // Optional: cascade delete when the user is deleted
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        SMS_STATUSES.SENT,
        SMS_STATUSES.FAILED,
        SMS_STATUSES.DELIVERED,
        SMS_STATUSES.RATE_LIMITED
      ),
      allowNull: false,
    },
  },
  { timestamps: true }
);

// Define association
User.hasMany(Sms, { foreignKey: "phone_number", sourceKey: "phone_number" });
Sms.belongsTo(User, { foreignKey: "phone_number", targetKey: "phone_number" });

Sms.sync();

module.exports = Sms;
