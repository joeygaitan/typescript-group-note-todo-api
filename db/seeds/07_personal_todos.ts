import * as Knex from "knex";
// add start time and finish time
export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    return knex("personal_todos").del()
        .then(() => {
            // Inserts seed entries
            return knex("personal_todos").insert([
                { active:false,header:"Work", container_index:1,container_item_index:1,private:true, board_id:1, user_id: 1 },
                {user_id: 1,active:false,header:"Personal Work", container_index:2,container_item_index:1,private:true, board_id:1},
                {user_id: 1,active:false,header:"Work On Friends homework",body:"Finish problems 1-20", container_index:1,container_item_index:2,private:true, board_id:1}
            ]);
        });
};