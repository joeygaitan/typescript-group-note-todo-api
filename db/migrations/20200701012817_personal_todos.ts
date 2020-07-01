import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_todos', (table)=>{
        table.increments('id');
        table.foreign('personal_todos').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
        table.boolean('active').notNullable();
        table.string('start_time');
        table.string('end_time');
        table.string('header');
        table.string('body');
        table.integer('container_index').notNullable();
        table.integer('container_item_index').notNullable();
        table.timestamps(true,true);
        table.boolean('private');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_todos');
}

