import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_lists', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('project_id').unsigned().notNullable();
        table.integer('personal_list_board_id').unsigned().notNullable();
        
        table.foreign('user_id').references('users.id');
        table.foreign('project_id').references('personal_projects.id');
        table.foreign('personal_list_board_id').references('personal_todo_boards.id');

        table.boolean('private').notNullable();
        table.string('title').notNullable();
        table.string('description');
        table.timestamps( true, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_lists');
}

