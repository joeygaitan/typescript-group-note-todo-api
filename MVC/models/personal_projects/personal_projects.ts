export {}
const db = require('../../../db/knex')

function getAllPersonalProjectsQuery(id:number) {
    return db('personal_projects')
    .select('id', 'private', 'title', 'updated_at')
    .where('user_id', id)
}

function getOnePersonalProjectQuery(user_id:number, id:number){
    return db('personal_projects')
    .select('title', 'private')
    .where('user_id', user_id)
    .where('id', id)
}

interface oneBodyPersonalProject {
    private?: boolean;
    title?: string;
} 

function addOnePersonalProjectQuery(user_id:number, body:oneBodyPersonalProject) {
    return db('personal_projects')
    .insert({user_id, private: body.private, title: body.title})
}

function updateOnePersonalProjectQuery(id: number, user_id:number, body:oneBodyPersonalProject) {
    return getOnePersonalProjectQuery(id, user_id)
    .then((data:any)=>{
        
            return db('personal_projects')
            .select('title', 'private')
            .where('user_id', user_id)
            .where('id',id)
            .update({
              private: body.private || data.private,
              title: body.title || data.title  
            })
    })
}

function removeOnePersonalProjectQuery (id:number) {
    return db('personal_projects')
    .where('id', id)
    .del()
}

module.exports = {
    getAllPersonalProjectsQuery,
    getOnePersonalProjectQuery,
    addOnePersonalProjectQuery,
    updateOnePersonalProjectQuery,
    removeOnePersonalProjectQuery
}