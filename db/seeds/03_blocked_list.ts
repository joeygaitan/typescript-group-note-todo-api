import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("blocked_list").del()
        .then(() => {
            // Inserts seed entries
            return knex("blocked_list").insert([
                {user_id_one:3, user_id_two:1},
                {user_id_one:2, user_id_two:3}
            ]);
        });
};
