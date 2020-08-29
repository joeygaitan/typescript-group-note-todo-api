import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_todo_board").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_todo_board").insert([
               { user_id:1, private:true, header:"C++ project"}
            ]);
        });
};
