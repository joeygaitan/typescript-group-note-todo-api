import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('personal_notes',(table)=>{
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('personal_notes_board_id').unsigned().notNullable();

        table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('personal_notes_board_id').references('personal_note_boards.id');

        table.timestamps(true,true);
        // blobs for images.... raw mysql request?
        table.boolean('private').notNullable();
        table.string('title');
        // table.enu('draw_text_properties',['overlap','behind','no_effect']);
        // table.boolean('shared');
        // blob for drawing file
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('personal_notes')
}
