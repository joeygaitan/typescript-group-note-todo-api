export {}

const personalListModels = require('../../../models/personal_projects/personal_list_boards/personal_list')

function getAllListItems (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListModels.getAllListItemsQuery(user_id, Number(req.params.project_id),Number(req.params.board_id))
    .then((data:any)=>{

        res.sendStatus(200).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to get all list items", err)
    })
}

function getOneListItem (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListModels.getOneListItemQuery(user_id, Number(req.params.project_id),Number(req.params.board_id), Number(req.params.id))
    .then((data:any)=>{

        res.sendStatus(200).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to get one list item", err)
    })
}

function addOneListItem (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}
    
    return personalListModels.addOneListItemQuery(user_id, Number(req.params.project_id), req.body)
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to add one item", err)
    })
}

function updateOneListItem (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListModels.updateOneListItemQuery(user_id, Number(req.params.project_id),Number(req.params.board_id), Number(req.params.id))
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to update one list item", err)
    })
}

function removeOneListItem (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListModels.removeOneListItemQuery(user_id, Number(req.params.project_id),Number(req.params.board_id), Number(req.params.id))
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to remove one list item", err)
    })
}

module.exports = {
    getAllListItems,
    getOneListItem,
    addOneListItem,
    updateOneListItem,
    removeOneListItem
}