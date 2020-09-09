import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("categories").del()
        .then(() => {
            // Inserts seed entries
            return knex("categories").insert([
                { category: "computer science" },
                { category: "tutoring" },
                { category: "politics" },
                {category: "looking for a friend"},
                {category: "gaming"},
                {category: "40k"},
                {category: "halo"}
            ]);
        });
};
