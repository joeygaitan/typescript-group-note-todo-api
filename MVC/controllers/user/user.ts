export {}
const userModels = require('../../models/user/user')
const jwt = require('jsonwebtoken')
const db = require('../../../db/knex')

function getPersonalData (req:any,res:any,next:any) {
    
    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return userModels.getPersonalData(id)
    .then((data:any)=>{
        delete data.password

        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log(err, "something went wrong. Maybe wrong url path?")
    })
}

function getUser (req:any,res:any,next:any){
    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    return userModels.getUser(id,Number(req.params.id))
    .then((data:any)=>{
        if (!data) throw {status:400, message:"something went wrong with the get request"}

        res.status(200).send(data)
    })
}

function userSearch(req:any, res:any, next:any) {   
    return userModels.getUsers(req.params.username)
    .then((data:any)=>{
        if (!data) throw {status:400, message:"something went wrong with the get request"}
               
        res.status(200).send(data)
    })
    .catch((err:any)=>{
        console.log("failed to get search user. Maybe you miss spelled the name?", err)
    })
}

function changePassword (req:any,res:any,next:any) {
    
    let {id, username} = req.claim

    if (!id) throw {status:401, message:"Unauthorized Please login"}

    if (!req.body.password || !req.body.newPassword || typeof req.body.password !== "string" || typeof req.body.newPassword !== "string") throw {status:400, message:"missing password, newPassword or passwords aren't of type string :/"}

    if (req.body.newPassword.length < 8) throw {status:400, message:"New password has to be longer than 8 characters"}

    if (Object.keys(req.body).length > 2) throw {status: "only takes in two parameters password and newPassword"}

    return userModels.changePassword(id, username, req.body.password,req.body.newPassword)
    .then(({id:Number,username:string}:any)=>{
        //create token
        const token = jwt.sign({id, username }, process.env.SECRET)

        return res.status(201).send({ token })
    })
    .catch((err:any)=>{
        console.log(err, "Error making new token from new password :(")
    })
}

function changeSecrets (req:any,res:any,next:any) {
    let user = req.claim

    if (!user.id) throw {status:401, message:"Unauthorized Please login"}

    return userModels.changeSecrets(user, req.body)
    .then((data:any)=>{
        if (!data) {
            throw {status: 400, message: "secrets failed to be updated"}
        }

        res.status(201).send(data)
    })
    .catch((err:any)=>{
        console.log(err, "failed to update secrets")
    })
}

function updateAccount (req:any,res:any,next:any) {
    let id = req.claim.id

    if (!id) throw {status:401, message:"Unauthorized Please login"}
    
    if (req.body.password || req.body.id) throw {status:401, message:"Not authorized to edit these >:["}

    if (req.body.personalsecret1 || req.body.personalsecret2 || req.body.personalsecret3) throw {status:401, message:"Not authorized to edit these >:["}

    return userModels.updateAccount(id, req.body)
    .then((data:any)=>{
        delete data[0].password
        delete data[0].personalsecret1
        delete data[0].personalsecret2
        delete data[0].personalsecret3
        delete data[0].created_at
        delete data[0].updated_at

        if (!data) throw {status:400, message:"something went wrong :/"}

        res.status(201).send(data[0])
    })
    .catch((err:any)=>{
        console.log(err, "could be email is already taken or username is already taken")
    })
}

module.exports = {
    getPersonalData,
    getUser,
    userSearch,
    changeSecrets,
    changePassword,
    updateAccount
}