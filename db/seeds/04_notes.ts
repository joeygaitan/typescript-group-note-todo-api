import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("notes").del()
        .then(() => {
            // Inserts seed entries
            return knex("notes").insert([
                {user_id:1,private:true,title:"the boy"},
                {user_id:1,private:true,title:"stuff",},
                {user_id:2,private:true,title:"hello",}
            ]);
        });
};
