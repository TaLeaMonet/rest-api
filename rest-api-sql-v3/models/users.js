'use strict';	
	const Sequelize = require('sequelize');
	var bcrypt = require('bcryptjs');
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync("B4c0/\/", salt);
	
	module.exports = (sequelize) => {
	class User extends Sequelize.Model {}
	User.init({
	id: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true,
	},
	firstName: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a valid value for first name',
        }
      },
	},
	lastName: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a valid value for last name',
        }
      },
	},
	emailAddress: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a valid value for email address',
        }
      },
	},
	password: {
	type: Sequelize.STRING,
	allowNull: false,
	hashedPassword: {
		type: DataTypes.STRING(64),
		validate: {
		notEmpty: {
		msg: 'Please provide a valid value password',
		},
		is: /^[0-9a-f]{64}$/i
		}
	  }
	},
	}, { sequelize });
	
    // TODO Add associations.
	User.associate = (models) => {
	User.hasMany(models.Course);
	};
	
	return Person;
	};

