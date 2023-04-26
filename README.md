# NodejsProject

A demo project of Node.js, express.js and PostgreSQL.

## How to start PostgreSQL with docker
```
1. Install and open docker.
2. Open your Terminal.
2. Type command: docker-compose up.
```

## How to start express.js
```
npm start
```

## How to connect
You can use pgAdmin to connect.

## How to create table
```
1. Open docker.
2. If database is closed, please open your terminal and type command: "docker-compose up".
3. Open another terminal tab and go to project folder.
4. Type command "node ./dataBase/user.js".
5. Confirm system response is "Table created successfully!".
```

## How to get and post data.
Using user table for example.
```
1. Using postman (https://www.postman.com/)
2. Select Post method and type url as localhost:3000/users.
3. Click Body and select x-www-form-urlencord format, then fill values for name, email, and password keys.
2. Open a new tabl, select Get method and type url localhost:3000/users.
3. Check response.
```

```
Response data as following
[
    {
        "id": 4,
        "name": "Test",
        "email": "Test@gmail.com",
        "password": "TestPassword",
        "created_at": "2023-04-26T14:50:22.368Z"
    },
    {
        "id": 5,
        "name": "Test1",
        "email": "Test1@gmail.com",
        "password": "TestPassword1",
        "created_at": "2023-04-26T15:27:40.985Z"
    }
]
```
