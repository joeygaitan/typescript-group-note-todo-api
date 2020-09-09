import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_todo_boards").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_todo_boards").insert([
                { user_id:1, header: "c++ project", private:true,personal_project_id:1 },
                { user_id:1, header: "coding challenge practice", private:false,personal_project_id:1 },
            ]);
        });
};
