export {};
const router = require('express').Router()

// authentication middleware. checks if you are logged in or not and gives user id and username
const authMiddleWare = require('../../controllers/login')

const personal_projectsController = require('../../controllers/personal_projects/personal_projects')

// get one
// update one
// delete one

// get all 
router.get('/', authMiddleWare.isAuthenticated, personal_projectsController.getAllPersonalProjects)

// get one
router.get('/:id', authMiddleWare.isAuthenticated, personal_projectsController.getOnePersonalProject)

// get somebody elses non private personal_projects
// router.get('/:id', authMiddleWare.isAuthenticated, personal_projectsController.getAnotherUsersProject)

// view multiple non private personal_projects of a user 
// router.get('/:user_id', authMiddleWare.isAuthenticated, personal_projectsController.getAnotherUsersProject)

// add one
router.post('/', authMiddleWare.isAuthenticated, personal_projectsController.addOnePersonalProject)

// update one
router.put('/:id', authMiddleWare.isAuthenticated, personal_projectsController.updateOnePersonalProject)

// delete one
router.delete('/:id', authMiddleWare.isAuthenticated, personal_projectsController.removeOnePersonalProject)

module.exports = router
