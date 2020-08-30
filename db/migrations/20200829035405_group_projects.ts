import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('group_projects',(table)=>{
        table.increments('id').primary();
        table.integer('owner_id').unsigned().notNullable();
        table.foreign('owner_id').references('users.id');
        table.string('title').notNullable();
        table.timestamps( true, true);
        table.string('password').notNullable();
        table.boolean('private').notNullable();
        // future columns: image 
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('group_projects')
}

