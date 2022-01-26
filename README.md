# replacements-warehouse
This is an API based on a replacements warehouse, acting as Business Manager. The project is mainly made using expressJS and mongoDB. 

## prerequisites
Add file _.env_ and copy the variables on  _prod.env_ , then set values for "MONGODB_CNN" (connection MONGODB atlas) and "SECRETKEY" (Whatever you want to sign your JWT).

## to start

        npm start


_or_


        node app


## endpoints
The root for the all the endpoint is _http://localhost:8000/api_
### checking server
* /ok

### Auth
*       (POST) /api/auth/login.
        get user and token =>body: { email, password }
*       (GET) /api/auth/me.
        get user by token => headers: access-token = token

### User
*       (GET) /api/user.
        get all users (this endpoint can resive query params)
*       (GET) /api/user/:id.
        get user by id
*       PUT) /api/user.
        update user data => body: {name,img,role,state}
*       (POST) /api/user.
        create user => body: { name, email, password, role }
*       (DELETE) /api/user/:id (recomended).
        switch the state of an user to false (this user won´t be able to log in)
*       (DELETE) /api/user/delete/id.
        delete user in our database


