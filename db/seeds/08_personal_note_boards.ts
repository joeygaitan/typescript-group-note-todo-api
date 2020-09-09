import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_note_boards").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_note_boards").insert([
                {user_id:1,personal_project_board_id:1, title:"c++ array and objects syntax", private:false}
            ]);
        });
};
