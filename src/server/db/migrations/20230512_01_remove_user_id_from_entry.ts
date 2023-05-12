import { DataTypes } from 'sequelize'

import { Migration } from '../connection'

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('entries', 'user_id')
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('entries', 'user_id', {
    type: DataTypes.STRING,
    allowNull: true,
  })
}
