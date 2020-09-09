import * as Knex from "knex";
import { table } from "console";


export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable("categories", (table)=> {
        table.increments("id").primary();
        table.string('category').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTableIfExists("categories")
}

