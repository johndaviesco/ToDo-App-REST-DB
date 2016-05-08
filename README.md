# ToDo-App-REST-DB

### Dependancies

* postgressql

  * Create a Database called todo

  * Create a user roll for the database and give it a password

* Node.js

### Steps

1. Clone repo

  ```shell
  git clone https://github.com/johndaviesco/ToDo-App-REST-DB.git
  ```
2. Install Node Packages

  ```shell
  cd ToDo-App-REST-DB
  npm install
  ```

3. Change Database connection string in following file to your connection string.

  * server/models/database.js

  * server/routes/index.js

  * the connection string variable should look similar to the following.
   ```javascript
   var connectionString = "postgres://username:password@localhost/todo";
   ```

4. Setup Database by running the following

  * node server/models/database.js

4. Run application
  ```shell
  npm start
  ```

### Curl Testing Scripts (please replace the values in angle brackets ie <Todo Name> to "Bob")
This is the Curl script which tests the Put method, put simply adds a new todo
```shell
curl -H "Content-Type: application/json" -X PUT -d '{"id": <ID Number>, "text": <Todo Name>, "complete": "false"}' http://ec2-54-206-41-25.ap-southeast-2.compute.amazonaws.com:3000/api/v1/todos
```
This is the Curl script which tests the Get method, gets all the todo's as and array of json data
```shell
curl -X GET http://ec2-54-206-41-25.ap-southeast-2.compute.amazonaws.com:3000/api/v1/todos/
```
This is the Curl script which tests the Post method, updates the specified todo to completed
```shell
curl -H "Content-Type: application/json" -X POST -d '{"id": <ID Number>, "text": <Todo Name>, "complete": "true"}' http://ec2-54-206-41-25.ap-southeast-2.compute.amazonaws.com:3000/api/v1/todos/30
```
This is the Curl script which tests the Delete method, deletes specified todo
```shell
curl -X DELETE http://ec2-54-206-41-25.ap-southeast-2.compute.amazonaws.com:3000/api/v1/todos/31
```

### Rest Interface

  My rest interfaces are located server/routes/index.js
  I have Implemented GET, PUT, POST and DELETE

  Definition: REST stands for Representational State Transfer. It relies on a stateless, client-server, cacheable communications protocol and in virtually all cases, the HTTP protocol is used. REST is an architecture style for designing networked applications.

### Error Handling

I did all my error handling in app.js at the root of the project. I cover all the major Http errors such as. I achieved this using expresses built in error handling library and a if else block.

  * 400 Bad Request

  * 401 Unauthorized

  * 403 Forbidden

  * 404 Not Found

  * 500 Internal Server Error

  * 502 Bad Gateway

  * 504 Gateway Timeout

### Cloud Hosting

  I had problems Hosting on heroku so I decided to host this web application on AWS.
  URL: http://ec2-54-206-41-25.ap-southeast-2.compute.amazonaws.com:3000/

### Github

https://github.com/johndaviesco/ToDo-App-REST-DB
