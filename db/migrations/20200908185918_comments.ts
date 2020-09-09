import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("comments", (table)=>{
        table.increments("id").primary()
        table.integer("parent_comment_id").unsigned();
        table.integer("user_id").unsigned().notNullable();
        table.integer("post_id").unsigned().notNullable();

        table.foreign("parent_comment_id").references("comments.id");
        table.foreign("user_id").references("users.id");
        table.foreign("post_id").references("posts.id");
        
        table.string("comment").notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists("comments")
}

