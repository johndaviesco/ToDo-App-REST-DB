# ToDo-App-REST-DB

### Dependancies

* postgressql

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

4. Run application
  ```shell
  npm start
  ```
