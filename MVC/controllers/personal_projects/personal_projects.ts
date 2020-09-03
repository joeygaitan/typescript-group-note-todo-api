export {}
const db = require('../../../db/knex')
const personal_projectsModels = require('../../models/personal_projects/personal_projects')

function getAllPersonalProjects (req:any,res:any,next:any) {
    
    let id = req.claim.id
    
    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return personal_projectsModels.getAllPersonalProjectsQuery(id)
    .then((data:any)=>{
        console.log("get all")
        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log("something went wrong with getting all personal projects. Possibly wrong url?", err)
    })
}

function getOnePersonalProject (req:any,res:any,next:any) {
    let user_id = req.claim.id

    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personal_projectsModels.getOnePersonalProjectQuery(user_id, Number(req.params.id))
    .then((data:any)=>{

        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log("error getting one user. Possibly invalid id was given in the parameters?", err)
    })
}

function addOnePersonalProject (req:any,res:any,next:any) {
    let user_id = req.claim.id

    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personal_projectsModels.addOnePersonalProjectQuery(user_id, req.body)
    .then((data:any)=>{
        
        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to add one. Possibly a missing or extra field?", err)
    })
}

function updateOnePersonalProject (req:any, res:any, next:any) {
    let user_id = req.claim.id

    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personal_projectsModels.updateOnePersonalProjectQuery(Number(req.params.id), user_id, req.body)
    .then((data:any)=>{
        
        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log("error updating personal_project", err)
    })
}

function removeOnePersonalProject (req:any, res:any, next:any) {
    let user_id = req.claim.id

    if (!user_id) throw {status:401, message:"Unauthorized Please login"}

    return personal_projectsModels.removeOnePersonalProjectQuery(Number(req.params.id))
    .then((data:any)=>{
        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to delete a personal project", err)
    })
}

module.exports = {
    getAllPersonalProjects,
    getOnePersonalProject,
    addOnePersonalProject,
    updateOnePersonalProject,
    removeOnePersonalProject
}