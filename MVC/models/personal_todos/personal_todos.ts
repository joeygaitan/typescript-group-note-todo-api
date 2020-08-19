export{};
const db = require('../../../db/knex')
const bcrypt = require('bcrypt')

function getAllPersonalTodos (id:number) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }

    return db('personal_todos')
    .where('user_id', id)
    // .where('user_id')
    // .rightJoin('personal_todos',`users.id`, `personal_todos.user_id`)
}

function getPersonalTodo (id:number,todo_id:number) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }

    return db('personal_todos')
    .where('user_id', id)
    .where('id',todo_id) 
}

function addPersonalTodo (id:number,body:any) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }
    if (!body){
        throw {status:400, message:"missing parameters in the post request"}
    }

    //add user_id to private_key column 
    body['user_id'] = id

    return db('personal_todos')
    .insert(body)
}


function updatePersonalTodo (id:number,todo_id:number,body:any) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }
    if (!body){
        throw {status:400, message:"missing parameters in the post request"}
    }

    if (body.id || body.user_id) throw {status:400, message: "you cant change these ids come on >:["}
    console.log(body.active)
    if (!body.container_index || !body.container_item_index) {
        throw {status:400, message:"missing active, container_index or container_item_index in the request.body :(. Those are required"}
    }
    
    return getPersonalTodo(id,todo_id)
    .then((data:any)=>{
        return db('personal_todos')
        .where('user_id', id)
        .where('id',todo_id)
        .update({
            "active":body.active || data.active,
            "start_time": body.start_time || data.start_time,
            "end_time": body.end_time || data.end_time,
            "header": body.header || data.header,
            "body": body.body || data.body,
            "container_index": data.container_index,
            "container_item_index": data.container_item_index
        })
    })
    //update this to a promise.all so that you can check if it is taken or not also to check if it is taken 
}

function removePersonalTodo ( id:number, todo_id:number) {
    return db('personal_todos')
    .where('user_id', id)
    .where('id',todo_id)
    .del()
}

module.exports = {
    getAllPersonalTodos, 
    getPersonalTodo,
    addPersonalTodo,
    updatePersonalTodo,
    removePersonalTodo
}