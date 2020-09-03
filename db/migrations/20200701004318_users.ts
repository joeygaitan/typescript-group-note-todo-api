import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('users', (table)=>{
        table.increments('id').primary();
        table.string('firstname', 30);
        table.string('lastname', 30);
        table.string('username', 20).notNullable();
        table.string('email', 40);
        table.string('password').notNullable();
        table.boolean('display_username');
        table.integer('age', 140);
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

