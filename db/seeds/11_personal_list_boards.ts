import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_list_boards").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_list_boards").insert([
                { user_id:1, personal_project_id:1, title:"parts list for school computer", private:true }
            ]);
        });
};
