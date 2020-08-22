import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('notes',(table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.timestamps(true,true);
        // blobs for images.... raw mysql request?
        table.boolean('private').notNullable();
        table.string('title');
        // table.enu('draw_text_properties',['overlap','behind','no_effect']);
        // table.boolean('shared');
        // table.integer('group_id').unsigned();
        // table.integer('group_id').references('id').on('group_messages').onUpdate('CASCADE').onDelete('CASCADE');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('notes')
}

