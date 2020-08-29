import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('todo_boards', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.string('header').notNullable();
        table.string('last_active');
        table.string('small_description');
        table.timestamps( true, true);
        table.boolean('private').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('todo_boards')
}
