import * as Knex from "knex";
import { table } from "console";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_note_boards', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('personal_project_board_id').unsigned().notNullable();

        table.foreign('user_id').references('users.id');
        table.foreign('personal_project_board_id').references('personal_projects.id');
        
        table.boolean('private').notNullable();
        table.string('title').notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_note_boards')
}

