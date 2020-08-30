import * as Knex from "knex";

//"if container index is 1 and container item index is then that is main outside container"
// everything else is a child container
// where ever container item index is 1 then that is a parent?

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_todos', (table)=>{
        table.increments('id').primary();
        
        table.integer('user_id').unsigned().notNullable();
        table.integer('board_id').unsigned().notNullable();

    table.foreign('user_id').references('users.id');
    table.foreign('board_id').references('personal_todo_boards.id');
        
        table.boolean('active').notNullable();
        table.string('start_time');
        table.string('end_time');
        table.string('header');
        table.string('body');
        table.integer('container_index').notNullable();
        table.integer('container_item_index');
        table.timestamps(true,true);
        table.boolean('private').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_todos');
}