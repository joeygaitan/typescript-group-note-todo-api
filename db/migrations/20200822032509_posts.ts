import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        
        table.string('title').notNullable();
        table.string('description');
        table.timestamps( true, true);
        table.boolean('private').notNullable();
        // header image
        // images for body
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('posts')
}


