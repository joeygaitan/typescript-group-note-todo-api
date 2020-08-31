export {}
const router = require('express').Router();

const authMiddleWare = require('../../../controllers/login')

const personalListsController = require('../../../controllers/personal_projects/personal_list_boards/personal_list')

// get all lists for the board
router.get('/:project_id/:board_id', authMiddleWare.isAuthenticated, personalListsController.getAllListItems)

// get one list for the board
router.get('/:project_id/:board_id/:id', authMiddleWare.isAuthenticated, personalListsController.getOneListItem)

// add one list item
router.post('/:project_id/:board_id', authMiddleWare.isAuthenticated, personalListsController.addOneListItem)

// update one list item
router.put('/:project_id/:board_id/:id', authMiddleWare.isAuthenticated, personalListsController.updateOneListItem)

// delete one list item
router.delete('/:project_id/:board_id/:id', authMiddleWare.isAuthenticated, personalListsController.removeOneListItem)

module.exports = router