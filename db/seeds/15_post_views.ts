import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("post_views").del()
        .then(() => {
            // Inserts seed entries
            return knex("post_views").insert([
               {user_id:1, post_id:1}
            ]);
        });
};
