import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_list_boards', (table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('personal_project_id').unsigned().notNullable();
        
        table.foreign('user_id').references('users.id');
        table.foreign('personal_project_id').references('personal_projects.id');

        table.string('title').notNullable();
        table.string('small_description');
        table.timestamps( true, true);
        table.boolean('private').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_list_boards')
}

