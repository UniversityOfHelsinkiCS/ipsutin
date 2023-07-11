import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize'

import { sequelize } from '../connection'

import { Locales } from '../../types'

interface Option {
  id: string
  label: Locales
}

interface OptionData {
  type: 'singleChoice' | 'multipleChoice' | 'dimensions' | 'text' | 'info'
  options: Array<Option>
}

interface Visibility {
  options?: Array<string>
}

class Question extends Model<
  InferAttributes<Question>,
  InferCreationAttributes<Question>
> {
  declare id: CreationOptional<number>

  declare surveyId: number

  declare parentId: number

  declare priority: number

  declare title: Locales

  declare text: Locales

  declare optionData: OptionData

  declare visibility: Visibility
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    text: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    optionData: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    visibility: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    underscored: true,
    sequelize,
  }
)

export default Question
