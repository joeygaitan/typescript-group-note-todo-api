const signUpModel = require('../models/signup.ts')

//figure out why it was passed in the params rather the req.body
//add three secrets
function createUser(req:any,res:any,next:any){
    if(!req.body.username){
        return next({status: 400, message: 'username required'})
    } else if(req.body.username.length < 8) {
        return next({status: 400, message: 'username has to be at least 8 characters long'})
    } else if (req.body.username > 20){
        return next({status: 400, message: 'username is to long. It has to be shorter than 20 characters'})
    }
    
    return signUpModel.createUser(req.body.username, req.body.password, req.body.firstname, req.body.lastname, req.body.email)
    .then((user:any)=>{
        console.log("here in the singup controller in the then",user)
        return res.status(201).send({user})
    })
    .catch((err:any)=>{
        console.log("failed to create new user",err)
        next()
    })
}

module.exports = {
    createUser
}