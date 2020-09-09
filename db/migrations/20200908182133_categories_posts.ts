import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("categories_posts", (table)=>{
        table.increments("id").primary();
        table.integer("post_id").unsigned().notNullable();
        table.integer("category_id").unsigned().notNullable();
        table.integer("parent_category_id").unsigned();

        table.foreign("post_id").references("posts.id");
        table.foreign("category_id").references("categories.id");
        table.foreign("parent_category_id").references("categories.id");
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists("categories_posts")
}

