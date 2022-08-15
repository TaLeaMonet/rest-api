'use strict';	
	const Sequelize = require('sequelize');
	
	module.exports = (sequelize) => {
	class Course extends Sequelize.Model {}
	Course.init({
	title: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a value for title',
        }
      },
	},
	description: {
	type: Sequelize.TEXT,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a value for description',
        }
      },
	},
	estimatedTime: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a value for estimated time',
        }
      },
	},
	materialsNeeded: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Please provide a value for materials needed',
        }
      },
	},
	}, { sequelize });
	
	Course.associate = (models) => {
	// TODO Add associations.
	Course.belongsTo(models.User);
	
	};
	
	return Course;
	};
