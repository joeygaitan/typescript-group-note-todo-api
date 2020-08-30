export {}
const db = require('../../../../db/knex')

function getAllListBoardsQuery(user_id:number,project_id:number) {

    return db('personal_list_boards')
    .where('project_id', project_id)
}

function getOneListBoardQuery(user_id:number, project_id:number, board_id:number) {
    return db('personal_list_boards')
    .where('id', board_id)
    .where('project_id', project_id)
}

function addOneListBoardQuery(user_id:number, project_id:number, board_id:number) {
    
}

module.exports = {
    getAllListBoardsQuery,
    getOneListBoardQuery
}