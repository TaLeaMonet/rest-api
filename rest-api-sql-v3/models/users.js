'use strict';	
	const Sequelize = require('sequelize');
	
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
	},
	lastName: {
	type: Sequelize.STRING,
	allowNull: false,
	},
	emailAddress: {
	type: Sequelize.STRING,
	allowNull: false,
	},
	password: {
	type: Sequelize.STRING,
	allowNull: false,
	},
	}, { sequelize });
	
    // TODO Add associations.
	User.associate = (models) => {
	User.hasMany(models.Course);
	};
	
	return Person;
	};

