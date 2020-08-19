export {}
const db = require('../../../db/knex')
const signUpModel = require('../signup')
const bcrypt = require('bcrypt')

function getPersonalData (id:number) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }

    return db('users')
    .select('username','first_name','last_name', 'gender','bio', 'email')
    .where('id', id)
    .first()
}

function getUser (id:number, user_id:number) {
    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }

    if (!user_id || typeof user_id !== "number") throw {status:401, message:"user id isn't there or it isn't a number"} 
    // select users and personal_todos
    return db('users')
    .select('first_name','last_name','username','email','age', 'bio','gender','active')
    .where('id', user_id)
}

function getUsers(username:string) {
    console.log(username)
    return db('users')
    .select('first_name','last_name','username','email','age', 'bio','gender','active')
    // .whereRaw('username LIKE \'%??%\'', [username])
    .where('username', 'LIKE', `%${username}%`)
}

function changePassword(id:number, username:string, password:string, newPassword:string) {
    let user:any

    if (!id || typeof id !== "number"){
        throw {status:401, message:"user_id isn't a number or it is missing"}
    }

    return signUpModel.getOneByUserName(username)
    .then((data:any)=>{

        if (!data) {
            throw {status: 400, message:"user not found"}
        }

        user = data

        return bcrypt.compare(password, data.password)
    })
    .then((status:boolean)=>{

        if (!status) {
            throw {status:400, message:"wrong password"}
        }

        if (newPassword == password) throw {status:400,message: "password and new password is the same"}

        return bcrypt.hash(newPassword, 10)
    })
    .then((hashedPassword:string)=>{

        return db('users')
        .where('id',id)
        .update({
            "password": hashedPassword
        })
    })
    .then((data:any)=>{
        //delete passwords
        delete data.password
        delete user.password

        // return/continue promise
        return user
    })
}

function changeSecrets (user:any, body:any) {
    if (!body) throw {status:400, message:"missing body information"} 

    return signUpModel.getOneByUserName(user.username)
    .then((data:any)=>{

        if (!data) {
            throw {status: 400, message:"user not found"}
        }

        user = data

        return bcrypt.compare(body.password, data.password)
    })
    .then((status:any)=>{

        if (!status) {
            throw {status:400, message:"wrong password"}
        }

        return Promise.all([bcrypt.hash(body.secret1),bcrypt.hash(body.secret2),bcrypt.hash(body.secret3)])
    })

}

function updateAccount (id:number, body:any) {
    
    return Promise.all([getPersonalData(id), signUpModel.getOneByUserName(body.username),signUpModel.getOneByEmail(body.email)])
    .then((values)=>{
        if (values[1]) throw {status:400, message:"username is already taken :/"}

        if (values[2]) throw {status:400, message:"email is already taken :("}
        
        if (values[0].username < 8) throw {status:400, message:"username is to short"}

        return db('users')
        .select('username','email','colorScheme',"friends_can_see_private")
        .where('id', id)
        .update({
            "username": body.username || values[0].username,
            "email":body.email || values[0].email,
            "colorScheme":body.colorScheme || values[0].colorScheme,
            "friends_can_see_private": values[0].friends_can_see_private
        })
    })
}


module.exports = {
    getPersonalData,
    getUser,
    getUsers,
    changeSecrets,
    changePassword,
    updateAccount
}