import db from '../config/db.js'
import BaseModel from './BaseModel.js'

class Product extends BaseModel {
  static tableName = 'products'

  static async get() {
    const [rows] = await db.query(`SELECT * FROM ${this.tableName}`)
    return rows
  }

  static async find(id) {
    const [rows] = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`,
      [id]
    )

    return rows[0] || null
  }

  static async create(data) {
    const entries = Object.entries(data ?? {})

    if (entries.length === 0) {
      throw new Error('Product.create requires at least one field')
    }

    const columns = entries.map(([key]) => key)
    const placeholders = columns.map(() => '?').join(', ')
    const values = entries.map(([, value]) => value)

    const [result] = await db.query(
      `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
      values
    )

    return this.find(result.insertId)
  }

  static async update(id, data) {
    const entries = Object.entries(data ?? {})

    if (entries.length === 0) {
      throw new Error('Product.update requires at least one field')
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ')
    const values = entries.map(([, value]) => value)

    const [result] = await db.query(
      `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
      [...values, id]
    )

    if (result.affectedRows === 0) {
      return null
    }

    return this.find(id)
  }

  static async delete(id) {
    const [result] = await db.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    )

    return result.affectedRows > 0
  }
}

export default Product
