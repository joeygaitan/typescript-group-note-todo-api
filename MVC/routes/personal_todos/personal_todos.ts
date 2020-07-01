export{};
const router = require('express').Router()
const personal_todosController = require('../../controllers/personal_todos/personal_todos')
const authMiddleWare = require('../../controllers/login')

router.get('/', authMiddleWare.isAuthenticated, personal_todosController.getAllPersonalTodos)

router.get('/:id', authMiddleWare.isAuthenticated, personal_todosController.getPersonalTodo)

router.post('/', authMiddleWare.isAuthenticated, personal_todosController.addPersonalTodo)

router.put('/:id', authMiddleWare.isAuthenticated, personal_todosController.updatePersonalTodo)

router.delete('/:id', authMiddleWare.isAuthenticated, personal_todosController.removePersonalTodo)

module.exports = router;