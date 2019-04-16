"use strict";
const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: { msg: "Email number invalid." } }
      },
      coupon_code: DataTypes.STRING,
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE
      }
    },
    { timestamps: false, tableName: "clients" }
  );
  Model.associate = function(models) {
    // associations can be defined here
  };

  Model.prototype.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ id: this.id }, CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      })
    );
  };

  Model.prototype.toWeb = function(pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
