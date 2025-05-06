const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
    "User",
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    
    }, { tableName: 'user',
        schema: 'articles',
        timestamps: false
     });

     const DEFAULT_SALT_ROUNDS = 10;

     User.addHook("beforeCreate", async (user) => {
       const encryptedPassword = await bcrypt.hash(user.password, DEFAULT_SALT_ROUNDS);
       user.password = encryptedPassword;
     });
     
     User.addHook("beforeUpdate", async (user) => {
       if (user.changed("password")) {
         const encryptedPassword = await bcrypt.hash(user.password, DEFAULT_SALT_ROUNDS);
         user.password = encryptedPassword;
       }
     });
     
      

    
      User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());
        delete values.password;
        return values;
      };
      
     

module.exports = User;
