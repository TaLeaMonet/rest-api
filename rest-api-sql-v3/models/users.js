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
          msg: 'First name is required'
        }
      },
	},
	lastName: {
	type: Sequelize.STRING,
	allowNull: false,
	validate: {
        notEmpty: {
          msg: 'Last name is required'
        }
      },
	},
	emailAddress: {
	type: Sequelize.STRING,
	allowNull: false,
	unique: {
		msg: 'The email you entered already exists'
	},
	validate: {
        notEmpty: {
          msg: 'An email is required'
        },
		isEmail: {
			msg: 'Please provide a valid value for email address'
		}
      }
	},
	confirmedPassword: {
	type: Sequelize.VIRTUAL,
	allowNull: false,
	set(val) {
			if ( val === this.password ) {
				const hashedPassword = bcrypt.hashSync(val, 10);
				this.setDataValue('confirmedPassword', hashedPassword);
			}
		},
	validate: {
		notNull: {
			msg: 'Both passwords must match'
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

