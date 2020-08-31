export {}
const personalListBoardModels = require('../../../models/personal_projects/personal_list_boards/personal_list_boards')

function getAllListBoards (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    console.log(user_id)
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}
    console.log(req.params.project_id)
    return personalListBoardModels.getAllListBoardsQuery(user_id,Number(req.params.project_id))
    .then((data:any)=>{
        res.sendStatus(200).send(data)
    })
    .catch((err:any)=>{
        console.log("failed get all list boards probably a wrong id or project id", err)
    })
}

function getOneListBoard (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}
    return personalListBoardModels.getOneListBoardQuery(user_id,Number(req.params.project_id),Number(req.params.board_id))
    .then((data:any)=>{

        res.sendStatus(200).send(data)
    })
}

function addOneListBoard (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListBoardModels.addOneListBoardQuery(user_id, Number(req.params.project_id))
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
}

function updateOneListBoard (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personalListBoardModels.updateOneListBoardQuery(user_id, Number(req.params.project_id), Number(req.params.board_id))
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
}

function deleteOneListBoard (req:any, res:any, next:any) {
    let user_id = req.claim.user_id
    
    if (!user_id) throw {status:401, message:"Unauthorized Please login"}
    return personalListBoardModels.deleteOneListBoardQuery(user_id, Number(req.params.project_id), Number(req.params.board_id))
    .then((data:any)=>{

        res.sendStatus(201).send(data)
    })
}

module.exports = {
    getAllListBoards,
    getOneListBoard,
    addOneListBoard,
    updateOneListBoard,
    deleteOneListBoard
}