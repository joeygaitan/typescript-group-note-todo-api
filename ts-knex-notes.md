* returning doesn't work in knex mysql
* In your table schemas you must make an id first like this 
```js
table.integer('user_id').unsigned().notNullable(); 
table.foreign('user_id').references('users.id').onUpdate('CASCADE').onDelete('CASCADE');
```
* you have to tell mysql that the id is a primary unlike postgresql table.increments('id').primary();
* typescript won't let you have the same import names so you have to put this at the top of the page export{};

## commands to run knex

### make a migrations or table
```knex migrate:make table_name```

### migrate that local or remote table to your database
```knex migrate:latest```
### rollback your tables
```knex migrate:rollback```

### make a seeds file
```knex seed:make 01_table_name```

### run your seeds or update your database with seeds
```knex seed:run```

### I recommend this command since when you migrate:latest will increment the ids...
```knex migrate:rollback && knex migrate:latest && knex seed:run```


