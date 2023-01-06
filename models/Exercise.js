// Gather Require Files to implement sequelize & connect
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');



// Create our User model
class Exercise extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }


  Exercise.init(
    {
        exerciseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        powerInfo: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {

        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'exercise'
    }
);

module.exports = Exercise;