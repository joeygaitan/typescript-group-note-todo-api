import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_todos', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.boolean('active').notNullable();
        table.string('start_time');
        table.string('end_time');
        table.string('header');
        table.string('body');
        table.integer('container_index').notNullable();
        table.integer('container_item_index');
        table.timestamps(true,true);
        table.boolean('private');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_todos');
}
