import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from './user.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RefreshToken extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare userId: string

  @column()
  declare token: string

  @column()
  declare isRevoked: boolean

  @column.dateTime()
  declare revokedAt: DateTime | null

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(user: RefreshToken) {
    user.id = randomUUID()
  }
}
