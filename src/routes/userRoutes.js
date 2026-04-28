import { Router } from 'express'
import userController from '../controllers/UserController.js'

const router = Router()

router.get('/', userController.getAllUsers.bind(userController))
router.post('/', userController.createUser.bind(userController))
router.put('/:id', userController.updateUser.bind(userController))
router.delete('/:id', userController.deleteUser.bind(userController))

export default router
