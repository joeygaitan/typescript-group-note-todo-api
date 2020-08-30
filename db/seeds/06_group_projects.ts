import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("group_projects").del()
        .then(() => {
            // Inserts seed entries
            return knex("group_projects").insert([
                {owner_id:1, private:true,password:"need to hash and salt this later", title:"Project Fusion"}
            ]);
        });
};
