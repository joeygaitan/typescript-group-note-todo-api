export{};
const db = require('../../db/knex')
const bcrypt = require('bcrypt')

// Create a user
// 1. Check to see if user already exists
//   a. if so, return a 400 with appropriate error message
// 2. Hash password
// 3. Insert record into database
// 4. strip hashed password away from object
// 5. "return/continue" promise

// check if username is already there
function getOneByUserName(username:string){
    return (
        db('users')
        .where({username})
        .first()
    )
}

function getOneByEmail (email:string) {
    return db('users')
    .where('email',email)
    .first()
}

//create the user
function createUser(username:string,password:string){
   //check if user is inside of users table by looking for a username. The query returns a promise and it worked
    return getOneByUserName(username)
    .then((data:any)=>{
        if (data) {
            throw { status: 400, message: "Username Already exists"}
        }
        
        // returns promise
        return bcrypt.hash(password, 10)
    })
    .then((hashedPassword:string)=>{
        
        return (db('users')
        .insert({username, password: hashedPassword})
        .returning("*")
        )
    })
    .then(([data]:any)=>{
        // delete hash so that password is now hidden
        delete data.password

        // return/continue promise
        return data
    })
}

module.exports = {
    createUser,
    getOneByUserName,
    getOneByEmail
}