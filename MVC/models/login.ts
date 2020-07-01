export {};
const db = require('../../db/knex')
const bcrypt = require('bcrypt')
const signUpModel = require('./signup')

// Login
//
// 1. Check to see if user already exists
//   a. if not, return a 400 with appropriate error message
// 2. compare password in the database with the password provided by user
// 3. If the passwords do not match, respond with 401 Unauthorized
// 4. strip hashed password away from object
// 5. "return/continue" promise


function checkUser (username:string,password:string) {
    let user:any

    return signUpModel.getOneByUserName(username)
    .then((data:any)=>{
        if (!data) {
            throw {status: 400, message:"user not found"}
        }
        
        user = data
        
        return bcrypt.compare(password,data.password)
    })
    .then((status:boolean)=>{
        if (!status) {
            throw {status:400, message:"wrong password"}
        }

        delete user.password

        return user
    })
}

module.exports = {
    checkUser
}