import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("categories_posts").del()
        .then(() => {
            // Inserts seed entries
            return knex("categories_posts").insert([
                { post_id: 1, category_id:1},
                { post_id: 1, category_id:1},
                { post_id: 1, category_id:1}
            ]);
        });
};
