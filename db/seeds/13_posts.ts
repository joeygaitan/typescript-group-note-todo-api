import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("posts").del()
        .then(() => {
            // Inserts seed entries
            return knex("posts").insert([
                {user_id:1, private:true, title:"the boy"},
                {user_id:2, private:true, title:"How to win the spelling bee!", views: 0},
                {user_id:3, private:false, title:"bring back the iron man", views: 0},
                {user_id:1, private:false, title:"Space mining is on the way!", description:"Soon space dwarf the tech industry 3 times", views: 0},
                {user_id:1, private:true, title:"The only real post on this platform", description:"this post was awesome", views: 0}
            ]);
        });
};
