import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("post_views", (table)=>{
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.integer("post_id").unsigned().notNullable();
        table.foreign("user_id").references("users.id")
        table.foreign("post_id").references("posts.id")
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists('post_views')
}

