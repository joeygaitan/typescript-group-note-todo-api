export {}
const router = require('express').Router();

// list board and list routes
router.use('/lists', require('./personal_list_boards/personal_list_boards'))
router.use('/lists/item', require('./personal_list_boards/personal_list_items'))
// todo board and todo routes
// router.use('/todos', require('./personal_todo_boards/personal_todo_boards'))
// note board and notes routes
// router.use('/notes', require('./personal_note_boards/personal_note_boards'))

router.use('/', require('./personal_project'))

module.exports = router