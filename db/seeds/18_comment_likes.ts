import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("comment_likes").del()
        .then(() => {
            // Inserts seed entries
            return knex("comment_likes").insert([
                { id: 1, colName: "rowValue1" },
                { id: 2, colName: "rowValue2" },
                { id: 3, colName: "rowValue3" }
            ]);
        });
};
