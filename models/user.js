'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: 'このメールアドレスは既に登録されています'
      },
      validate: {
        notEmpty: {
          msg: 'email は必須です'
        },
        isEmail: {
          msg: '正しいメール形式で入力してください'
        },
        len: {
          args: [5, 255],
          msg: 'email は5〜255文字で入力してください'
        }
      }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name は必須です'
        },
        len: {
          args: [1, 50],
          msg: 'name は1〜50文字で入力してください'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'age は整数である必要があります'
        },
        min: {
          args: [0],
          msg: 'age は0以上である必要があります'
        },
        max: {
          args: [150],
          msg: '年齢は150以下で入力してください'
        }
      }
    },
    hobby: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        len: {
          args: [0, 100],
          msg: 'hobby は100文字以内で入力してください'
        }
      }
    },
    isTestData: { // ← ここに正しく配置！
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};