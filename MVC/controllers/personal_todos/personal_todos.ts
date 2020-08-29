const personalTodosModels = require('../../models/personal_todos/personal_todos') 

function getAllPersonalTodos (req:any,res:any,next:any) {

    let id = req.claim.id
    
    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.getAllPersonalTodos(id)
    .then((data:any)=>{
        console.log(data)
        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log(err, "inside of the catch of the getAll")
    })
}

function getAllPersonalTodoContainers (req:any,res:any,next:any) {
    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.getAllPersonalTodoContainers(id)
    .then((data:any)=>{
        if (!data) throw {status: 400, message:"data not found"}
        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log(err, "inside the catch of the controller of the getAllPersonalTodosContainer")
    })
}

function getPersonalTodo (req:any,res:any,next:any) {

    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.getPersonalTodo(id,req.params.id)
    .then((data:any)=>{
        if (!data) throw {status: 400, message:"data not found"}
        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log(err,"inside of the catch of the getOne for the personal todo tasks")
    })
}

function addPersonalTodo (req:any,res:any,next:any) {

    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.addPersonalTodo(id, req.body)
    .then((data:any)=>{
        if (!data) throw {status: 400, message:"data not found"}

        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log(err,"post failed. request body failed. Fields required are active(boolean),container_index(number),container_item_index(number),private(boolean)")
    })
}


function updatePersonalTodo (req:any,res:any,next:any) {

    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.updatePersonalTodo(id, req.params.id, req.body)
    .then((data:any)=>{
        if (!data) throw {status: 400, message:"data not found"}

        res.status(201).send(data)
        .catch((err:any)=>{
            console.log(err,"put failed. some field is missing. Fields required are, id in url path, token, and body wise active(boolean),container_index(number),container_item_index(number),private(boolean)")
        })
    })
}

function removePersonalTodo (req:any,res:any,next:any) {

    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personalTodosModels.removePersonalTodo(id, req.params.id)
    .then((data:any)=>{
        if (!data) throw {status: 400, message:"data not found"}

        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log(err,"delete failed. wrong id given in url path?")
    })
}

module.exports = {
    getAllPersonalTodos,
    getAllPersonalTodoContainers,
    getPersonalTodo,
    addPersonalTodo,
    updatePersonalTodo,
    removePersonalTodo
}