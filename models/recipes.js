"use strict";
const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "Recipes",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      photo: {
        type: DataTypes.STRING
      }
    },
    { timestamps: false, tableName: "recipes" }
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
