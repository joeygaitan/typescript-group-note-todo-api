import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table)=>{
        table.increments('id').primary();
        table.string('firstname');
        table.string('lastname');
        table.string('username').notNullable();
        table.string('email');
        table.string('password').notNullable();
        table.integer('age');
        table.string('bio');
        table.string('gender');
        table.string('personalsecret1');
        table.string('personalsecret2');
        table.string('personalsecret3');
        table.binary('img');
        table.string('colorScheme');
        table.timestamps(true,true);
        table.boolean('payed');
        table.boolean('active');
        table.boolean('friends_can_see_private');
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('users')
}

