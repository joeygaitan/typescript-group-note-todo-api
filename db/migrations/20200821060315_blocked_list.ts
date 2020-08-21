import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('blocked_list', (table)=>{
        table.increments('id').primary();
        table.integer('user_id_one').unsigned().notNullable()
        table.integer('user_id_two').unsigned().notNullable()
        table.foreign('user_id_one').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('user_id_two').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamps(true,true);
    })
}


export async function down(knex: Knex): Promise<any> {
}

