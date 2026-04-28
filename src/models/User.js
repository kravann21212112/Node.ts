import db from '../config/db.js'

class User {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
  }

  static async create(name) {
    const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name])
    return { id: result.insertId, name }
  }

  static async update(id, name) {
    const [result] = await db.query('UPDATE users SET name = ? WHERE id = ?', [name, id])
    return result.affectedRows
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result.affectedRows
  }
}

export default User
