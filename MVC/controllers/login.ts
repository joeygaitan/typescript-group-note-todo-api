const loginModel = require('../models/login')
const jwt = require('jsonwebtoken')
const db = require('../../db/knex')

// Login Controller
//
// 1. Make sure that request is good
// 2. Attempt Login
// 3. Create token
// 4. Send back token

function isActive (username: string,bool: boolean) {
  return db ('users')
  .where({username})
  .update({
    "active": bool
  })
  .then((data:any)=>{
    if (data.active == true) {
      return true
    } else if (data.active == false) {
      return false
    }
  })
}

function login (req:any, res:any, next:any):any {
  
    if (!req.body.username) {
        return next({status:400, message: 'missing username'})
    }
    if (!req.body.password) {
        return next({status:400, message: 'missing password'})
    }

    loginModel.checkUser(req.body.username, req.body.password)
    .then((user:any)=>{
        const {id, username } = user
        //create token
        const token = jwt.sign({id, username }, process.env.SECRET)

        isActive(username,true)

        return res.status(200).send({ token })
    })
    .catch((err:any)=>{
      console.log(err, "error making a new token")
    })
}

function getAuthStatus (req:any,res:any,next:any) {
    res.status(200).send(req.claim)
}

function isAuthenticated(req:any, res:any, next:any) {
  if(!req.headers.authorization){
    
    isActive(req.claim.username,false)
    
    return next({ status: 401, message: 'missing token' })
  }
  
  
    const [scheme, credentials] = req.headers.authorization.split(' ')
    // 
    // const credentials = req.headers['authorization']

    jwt.verify(credentials, process.env.SECRET, (err:any, payload:object)=>{
    
    if(err){
      isActive(req.claim.username, false)

      return next({ status: 401, message: 'Please give the right credentials' })
    }
    req.claim = payload

    isActive(req.claim.username,true)

    next()
  })
}

function isSelf (req:any, res:any, next:any) {
  if(parseInt(req.params.userId) !== req.claim.id){
    return next({ status: 401, message: 'Unauthorized please login' })
  }

  next()

}

module.exports = {
    login,
    getAuthStatus,
    isAuthenticated,
    isSelf
}