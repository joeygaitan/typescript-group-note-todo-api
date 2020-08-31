export {}
const db = require('../../../../db/knex')

function getAllListBoardsQuery(user_id:number,project_id:number) {

    return db('personal_list_boards')
    .where('project_id', project_id)
}

function getOneListBoardQuery(user_id:number, project_id:number, board_id:number) {
    return db('personal_list_boards')
    .where('user_id', user_id)
    .where('personal_project_id', project_id)
    .where('id', board_id)
}

interface ListBoard {
    title:string;
    small_description?:string;
    private: boolean;
}

function addOneListBoardQuery(user_id:number, project_id:number, body:ListBoard) {
    return db('personal_list_boards')
    .insert({
        user_id,
        personal_project_id: project_id,
        private: body.private,
        title: body.title,
        small_description: body.small_description
    })    
}

function updateOneListBoardQuery (user_id:number, project_id:number, board_id:number, body:ListBoard) {
    return getOneListBoardQuery(user_id, project_id, board_id).then((data:any)=>{
        
        return db('personal_list_boards')
        .select('title', 'small_description', 'private')
        .where('user_id', user_id)
        .where('personal_project_id', project_id)
        .where('id', board_id)
        .update({
            private: body.private || data.private,
            title: body.title || data.title,
            small_description: body.small_description || data.small_description
        })
    })
}

function deleteOneListBoardQuery (user_id:number, project_id:number, board_id:number) {
    return db('personal_list_boards')
    .where('user_id', user_id)
    .where('personal_project_id', project_id)
    .where('id', board_id)
    .del()
}


module.exports = {
    getAllListBoardsQuery,
    getOneListBoardQuery,
    addOneListBoardQuery,
    updateOneListBoardQuery,
    deleteOneListBoardQuery
}