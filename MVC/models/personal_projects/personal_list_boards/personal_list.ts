export {}
const db = require('../../../../db/knex')

function getAllListItemsQuery(user_id:number, personal_list_board_id:number) {
    return db('personal_lists')
    .where('user_id', user_id)
    .where('personal_list_board_id', personal_list_board_id)
}

function getOneListItemQuery(user_id:number, personal_list_board_id:number, id:number) {
    return db('personal_lists')
    .where('user_id', user_id)
    .where('personal_list_board_id', personal_list_board_id)
    .where('id', id)
}

interface listItem {
    private:boolean;
    title:string;
    description?:string;
}

function addOneListItemQuery(user_id:number, personal_list_board_id:number,body:listItem) {

    return db('personal_lists')
    .insert({
        user_id,
        personal_list_board_id,
        private:body.private,
        title: body.title,
        description: body.description
    })
}

function updateOneListItem (user_id:number, personal_list_board_id:number, id:number, body:listItem) {
    return getOneListItemQuery(user_id, personal_list_board_id, id)
    .then((data:any)=>{

        return db('personal_lists')
        .select('private', 'title', 'description')
        .where('user_id', user_id)
        .where('personal_list_board_id', personal_list_board_id)
        .where('id', id)
        .update({
            private: body.private || data.private,
            title: body.title || data.title,
            description: body.description || data.description   
        })
    })
}

function removeOneListItemQuery(user_id:number, personal_list_board_id:number, id:number) {
    return db('personal_lists')
    .where('user_id', user_id)
    .where('personal_list_board_id', personal_list_board_id)
    .where('id', id)
    .del()
}

module.exports = {
    getAllListItemsQuery,
    getOneListItemQuery,
    addOneListItemQuery,
    updateOneListItem
}