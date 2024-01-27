import express from 'express'
import { CompleteTodo, addTodo, deleteTodo, getAllTodo, updateTodo } from '../controllers/todoController.js'

const router = express.Router()

router.post('/',addTodo)
router.get('/',getAllTodo)
router.put('/:id',updateTodo)
router.delete('/:id',deleteTodo)
router.patch('/:id',CompleteTodo)
export default router