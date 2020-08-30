import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_lists").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_lists").insert([
                { user_id:1, personal_todo_board_id:1, title:"graphic card", private:true }
            ]);
        });
};
