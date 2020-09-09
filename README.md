# Group Todo and Note API

## todo <br>
1. Figure out what to return after you sign up?
2. Figure out how to encrypt the user information so nobody can access their information if the database is compromised
3. Salt the passwords of the users
4. make a route where users can request to make a route, and moderator can make one
5. make a moderator user who can delete peoples accounts, and remove users posts, putting them on probation period where they can only view posts, and work on their personal projects.........
## backlog

1. hash the secrets, then have the user guess them if they get them right then they can change the password if they remember the secrets
2. or send an email to their personal email
3. add in two step authentication (text, or phone call)

----

## How to run locally
### How to setup database

1. Add an .env file then add your secret like this ```SECRET=secret```
2. Make sure your mysql is running. 
3. Then change the dbname in knexfile.ts to your choice of local database name. Also, make this db inside of your mysql ```const dbname = 'db_todo_note_together'```
4. Then in the knexfile.ts change the user and password here ``` connection: process.env.DATABASE_URL || { user: 'sam',password:'123', database: dbname } ``` to your databases username and password 
mysql
5. then you must run ```npm run knex migrate:latest```
6. If you want to get the seeds use this command ./utils/reset_knex.sh (if permission denied then do chmod 775 ./utils/reset_knex.sh) 

### build your own knexfile.ts
```

const path = require('path')
const dbname: string = 'typescript_group_todo_list_api'



module.exports = {
    development: {
        client: 'mysql',
        connection: process.env.DATABASE_URL || {host : '127.0.0.1', user: 'sam',password:'123', database: dbname },
        migrations: {
            extension: "ts",
            directory: path.join(__dirname, 'db', 'migrations')
        },
        seeds: {
            extension: "ts",
            directory: path.join(__dirname, 'db', 'seeds')
        }
    }
```

### How to application running and test it with postman
1. ```npm i```
2. make sure you are in the same folder (directory) as the server.js file
3. then run in the command line (terminal, command prompt or anything with node installed properly)``` npm run dev```
4. Then use Insomnia or postman and use ```localhost:5000``` and read the Routes sections to do local api requests
5. Add in a copy to database section where it will copy all the todos to the database
----

## Routes


### authentication Routes
----

#### signup route /signup

 ```js
post request '/signup'
{
    "username": "stringlongerthan8characters",
    "password": "same as above"
}
```
##### returned signup

It will return the newly created username, but not the password or the secrets


#### login route /login

 ```js
 post request '/login'
{
    "username": "stringlongerthan8characters",
    "password": "same as above"
}
```

##### returned /login
```js
    "token": "somerandomtext"
```

* login will give you token which will be required in the headers. Header called to get your personal information. Mostly everything requires your personal token......


* check if logged in with token (so you can easily logout the user out by erasing the token and calling the api post again)

#### logout route basically /login/token
```js
get request 'login/token' headers:{authorization:"token given from login"}
```

##### returned /login/token

```js
either authorized 401 or success 200
```
----
### logged in Routes /user
----

#### Get Your information route get /user 
```js
get request '/user'
"headers": {
"authentication" "your_token"
}
```

##### returned self search /user
```js
{
    "username": "jamesonthree",
    "first_name": null,
    "last_name": null,
    "gender": null,
    "bio": null,
    "email": null
}
```

#### change password route /user
```js
put request '/user'
 {
     "headers" : {"authorization": "personal_token"},
     "body": {
         "password": "old_password",
         "newPassword: "new_password"
     }
 }
```
##### returned token from password change route 
```js
if correct password and token then {"token":"new_token"} or false then return 401 error and remove the token
```

#### search username route /user/search/:username
It is using express so it isn't a query parameters
```js
get request '/user/search/:username'
{
    "headers":{"authorization": "personal_token"},
    "url": "url/user/search/user_name_you_are_looking_for"
}
```
##### returned search from user search route
```js
[
    {
        "first_name": null,
        "last_name": null,
        "username": "jamesontwo",
        "email": null,
        "age": null,
        "bio": null,
        "gender": null,
        "active": true
    },
    {
        "first_name": null,
        "last_name": null,
        "username": "jamesonthree",
        "email": null,
        "age": null,
        "bio": null,
        "gender": null,
        "active": true
    }
]
```
#### get a one other user user/:id route
It is using express so it isn't a query parameters
```js
get request user/:id
{
    "headers":{"authorization": "personal_token"},
    "url": "url/user/user id that you are looking for"
}
```
##### returned find one user by :id route
```js
[
    {
        "first_name": "sam",
        "last_name": "smith",
        "username": "samtheman",
        "email": "samsmith@gmail.com",
        "age": 22,
        "bio": "lorem ipsem blah de dah",
        "gender": "non-binary",
        "active": true
    }
]
```
#### update certain user information

```js
put request '/user/update/'
{
    "username": "new_username",
    "email": "new email",
    "colorScheme": "new color",
    "friends_can_see_private": true or false value
}
```
##### returned updated user route
```js
{
    "first_name": "sam",
    "last_name": "smith",
    "username": "samthefran",
    "email": "blobsnail@gmail.com",
    "age": 22,
    "bio": "lorem ipsem blah de dah",
    "gender": "male",
    "img": null,
    "colorScheme": "red",
    "payed": false,
    "active": true,
    "friends_can_see_private": true
}
```

----
### personal todo routes
----
#### get all personal todos
```js
get request '/personal_todos/'
{
     "headers":{"authorization": "personal_token"}
}
```

##### returned personal todos
```js
[
    {
        "id": 1,
        "user_id": 1,
        "active": false,
        "start_time": null,
        "end_time": null,
        "header": "Work",
        "body": null,
        "container_index": 1,
        "container_item_index": 1,
        "created_at": "2020-06-17T04:05:36.460Z",
        "updated_at": "2020-06-17T04:05:36.460Z",
        "private": true
    },
    {
        "id": 2,
        "user_id": 1,
        "active": false,
        "start_time": null,
        "end_time": null,
        "header": "Personal Work",
        "body": null,
        "container_index": 2,
        "container_item_index": 1,
        "created_at": "2020-06-17T04:05:36.460Z",
        "updated_at": "2020-06-17T04:05:36.460Z",
        "private": true
    }
]
```
#### get one personal todo route
It is using express so it isn't a query parameters
```js
get request '/personal_todos/:id
{
    "headers":{"authorization": "personal_token"},
    "url_path/personal_todos/:id"
}
```

##### returned get one personal todo
```js
[
    {
        "id": 1,
        "user_id": 1,
        "active": false,
        "start_time": null,
        "end_time": null,
        "header": "Work",
        "body": null,
        "container_index": 1,
        "container_item_index": 1,
        "created_at": "2020-06-17T04:05:36.460Z",
        "updated_at": "2020-06-17T04:05:36.460Z",
        "private": true
    }
]
```
#### add personal todo route
```js
post request '/personal_todos/'
{
    "headers":{"authorization": "personal_token"},
    body: {
        "header": string,
        "body": string,
        "active": boolean,
        "start_time":string,
        "end_time":string,
        "container_index":number,
        "container_item_index":number,
        "private":boolean
    }
}
```
##### returned post todo route
```js
201 successful
[
    {
        "id": 4,
        "user_id": 1,
        "active": false,
        "start_time": "10:00am",
        "end_time": "12:00pm",
        "header": "header",
        "body": "body",
        "container_index": 1,
        "container_item_index": 2,
        "created_at": "2020-06-21T05:55:09.421Z",
        "updated_at": "2020-06-21T05:55:09.421Z",
        "private": true
    }
]
```
#### update todo post route
It is using express so it isn't a query parameter
```js
put request 'personal_todos/:id'
{	
	"header": "newHeader",
	"body": "stuff",
	"active": false,
	"start_time": "10:00am",
	"end_time":"12:00pm",
	"container_index":1,
	"container_item_index":2,
	"private": true
}
```
##### returned updated todo 
```js
{	
	"header": "IwasChanged",
	"body": "stuff",
	"active": false,
	"start_time": "10:00am",
	"end_time":"12:00pm",
	"container_index":1,
	"container_item_index":2,
	"private": true
}
```
#### delete route
```js
delete request 'personal_todos/:id'
{
    "headers":{"authorization": "personal_token"},
    "url_path/personal_todos/:id"
}
```
##### returned delete personal_todo 
```js
{
    200 or 401
}
```