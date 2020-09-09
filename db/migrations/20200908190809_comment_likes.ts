import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("comment_likes", (table)=>{
        table.increments("id").primary();
        table.integer("user_id").unsigned().notNullable();
        table.integer("post_id").unsigned().notNullable();

        table.foreign("user_id").references("users.id");
        table.foreign("post_id").references("posts.id");
        table.enum("emoji", ["thumbs up", "thumbs down", "fire", "bullzeye","100"]).notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists("comment_likes")
}

