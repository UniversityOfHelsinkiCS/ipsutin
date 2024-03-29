import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'

import { sequelize } from '../connection'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string

  declare username: string

  declare firstName: string

  declare lastName: string

  declare email: string

  declare language: string

  declare lastLoggedIn: Date

  declare isAdmin: boolean

  declare preferredFaculty: string
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
    lastLoggedIn: {
      type: DataTypes.DATE,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    preferredFaculty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default User
