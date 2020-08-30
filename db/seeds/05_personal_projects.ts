import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_projects").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_projects").insert([
                {user_id: 1, title:"c++ project", private:false},
                {user_id: 1, title:"english project", private:false},
                {user_id:1, title:"math test practice", private:true}
            ]);
        });
};
