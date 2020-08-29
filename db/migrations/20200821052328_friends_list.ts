import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('friends_list', (table)=>{
        table.increments('id').primary();
        table.integer('user_id_one').unsigned().notNullable()
        table.integer('user_id_two').unsigned().notNullable()
        table.foreign('user_id_one').references('users.id');
        table.foreign('user_id_two').references('users.id');
        table.enu('status', ['pending', 'declined', 'accepted', 'silent_decline']);
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('friends_list')
}

