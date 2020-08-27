import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_posts").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_posts").insert([
                {user_id:1, private:true, title:"the boy"},
                {user_id:2, private:true, title:"How to win the spelling bee!"},
                {user_id:3, private:false, title:"bring back the iron man"},
                {user_id:1, private:false, title:"Space mining is on the way!", description:"Soon space dwarf the tech industry 3 times"},
                {user_id:1, private:true, title:"The only real post on this platform", description:"this post was awesome"}
            ]);
        });
};
