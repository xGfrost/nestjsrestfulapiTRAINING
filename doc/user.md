# User API Spec

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "Khanedy",
    "password" : "rahasia",
    "name"     : "Eko Khanedy" 
}
```

Response Body  :

```json
{
    "data" : {
        "username" : "Khanedy",
        "name" : "Eko Khanedy"
    }
}

```

Response Body (failed)  :

```json
{
    "errors" : "Username already registered"
    
}

```
## Register User

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "Khanedy",
    "password" : "rahasia",
    "name"     : "Eko Khanedy" 
}
```

Response Body  :

```json
{
    "data" : {
        "username" : "Khanedy",
        "name" : "Eko Khanedy"
    }
}

```

Response Body (failed)  :

```json
{
    "errors" : "Username already registered"
    
}

```

## Login User

Endpoint : POST /api/users/login

Request Body :
```json
{
    "username" : "Khanedy",
    "password" : "rahasia",
}
```

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Khanedy",
        "name" : "Eko Khanedy",
        "token" : "session_id_generated"
    }
}

```

Response Body (failed)  :

```json
{
    "errors" : "Username or password is wrong"
    
}

```

## Get User

Endpoint : GET /api/users/current

Headers :
- authorization: token

Response Body (Success) :

```json
{
    "data" : {
        "username" : "Khanedy",
        "name" : "Eko Khanedy",
    }
}

```

Response Body (failed)  :

```json
{
    "errors" : "Unauthorized"
    
}

```

## Update User

Endpoint : PATCH /api/users/current

Headers :
-Authorization : token

Request Body :
```json
{
    "password" : "rahasia",//optional
    "name"     : "Eko Khanedy"//optional 
}
```

Response Body  :

```json
{
    "data" : {
        "username" : "Khanedy",
        "name" : "Eko Khanedy"
    }
}

```


## Logout User

Endpoint : DELETE /api/users/current

Headers :
-Authorization : token

Response Body  :

```json
{
    "data" : true
}

```