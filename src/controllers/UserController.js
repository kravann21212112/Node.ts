import User from '../models/User.js'

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await User.getAll()
      res.json({
        success: true,
        message: "All users retrieved successfully",
        data: users,
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async createUser(req, res) {
    try {
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ message: 'Name is required' })
      }

      const user = await User.create(name)
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name) {
        return res.status(400).json({ message: 'Name is required' })
      }

      const affectedRows = await User.update(id, name)

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ message: 'User updated' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      const affectedRows = await User.delete(id)

      if (affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ message: 'User deleted' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default new UserController()
