import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_notes").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_notes").insert([
                {user_id:1,private:true,title:"the boy",personal_notes_board_id:1},
                {user_id:1,private:true,title:"stuff",personal_notes_board_id:1},
                {user_id:1,private:true,title:"hello",personal_notes_board_id:1}
            ]);
        });
};
