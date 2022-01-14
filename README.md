# replacements-warehouse
This is an API based on a replacements warehouse, acting as Business Manager. The project is mainly made using expressJS and mongoDB. 

## prerequisites
On _.prod.env_, set values for "MONGODB_CNN" (connection MONGODB atlas) and "SECRETKEY" (Whatever you want to sign your JWT).

## to start
...
npm start
...

_or_

...
node app
...

## endpints
The root for the all the endpoint is _http://localhost:8000/api]_
_checking server_
* /ok

_Auth_
*   (POST) /api/auth/login _:_ 
    _get user and token =>body: { email, password }_
*   (GET) /api/auth/me _:_ 
    _get user by token => headers: access-token = token_

_User_
*   (GET) /api/user _:_
    _get all users (this endpoint can resive query params)_
*   (GET) /api/user/:id _:_
    _get user by id_
*   PUT) /api/user _:_
    _update user data => body: {name,img,role,state}_
*   (POST) /api/user _:_
    _create user => body: { name, email, password, role }_
*   (DELETE) /api/user/:id (recomended) _:_
    _switch the state of an user to false (this user won´t be able to log in)_
*   (DELETE) /api/user/delete/id _:_
    _delete user in our database_
