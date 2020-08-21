export{};
const router = require('express').Router()
const personal_todosController = require('../../controllers/personal_todos/personal_todos')
const authMiddleWare = require('../../controllers/login')

// get all personal todos
router.get('/', authMiddleWare.isAuthenticated, personal_todosController.getAllPersonalTodos)

// get a personal todo
router.get('/:id', authMiddleWare.isAuthenticated, personal_todosController.getPersonalTodo)

// add a todo
router.post('/', authMiddleWare.isAuthenticated, personal_todosController.addPersonalTodo)

// update an todo by id
router.put('/:id', authMiddleWare.isAuthenticated, personal_todosController.updatePersonalTodo)

// remove a personal todo
router.delete('/:id', authMiddleWare.isAuthenticated, personal_todosController.removePersonalTodo)

module.exports = router;