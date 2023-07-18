import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from 'sequelize'

import { sequelize } from '../connection'

import Question from './Question'

class Survey extends Model<
  InferAttributes<Survey>,
  InferCreationAttributes<Survey>
> {
  declare id: CreationOptional<number>

  declare name: string

  declare Questions: NonAttribute<Question[]>
}

Survey.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default Survey
