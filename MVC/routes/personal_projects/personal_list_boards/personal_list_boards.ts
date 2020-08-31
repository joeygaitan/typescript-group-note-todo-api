export {}
const router = require('express').Router();

const authMiddleWare = require('../../../controllers/login')

const personalListBoardController = require('../../../controllers/personal_projects/personal_list_boards/personal_list_board')

const personalListsController = require('../../../controllers/personal_projects/personal_list_boards/personal_list')

// get all lists boards
router.get('/:project_id', authMiddleWare.isAuthenticated, personalListBoardController.getAllListBoards)

// get one list board
router.get('/:project_id/:board_id', authMiddleWare.isAuthenticated, personalListBoardController.getOneListBoard)

// add one list board
router.post('/:project_id', authMiddleWare.isAuthenticated, personalListBoardController.addOneListBoard)

// update one list board
router.put('/::project_id:board_id', authMiddleWare.isAuthenticated, personalListBoardController.updateOneListBoard)

// remove one list board
router.delete('/:project_id/:board_id', authMiddleWare.isAuthenticated, personalListBoardController.deleteOneListBoard)

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