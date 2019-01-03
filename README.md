# fractal-transformer

## Install

```bash
npm install fractal-transformer --save
```

## Test
```bash
npm test
```

## Basic Usage

```javascript
//import library
var fractal = require('fractal-transformer')();

//get data from database or ...
var dataDatabase = {
    "_id": "5a91c4547886436ed94e6326",
    "firstName": "John",
    "lastName": "Doe",
    "password": "$2a$10$VzJQsmaknGuafqXSfzDWg.zPshX..uY26Yn8X9TJnvjGqHex1FQ7S",
};

//transform data
var dataTransformed = fractal(dataDatabase,{
    "id": "_id",
    "name": function (data) {
         return data.get('firstName') + " " + data.get('lastName');
    }
});

console.log(dataTransformed);
```

The expected output
```javascript
{  
   "id": "5a91c4547886436ed94e6326",
   "name": "John Doe"
}
```

### Usage with others transformers

```javascript
//import library
var fractal = require('fractal-transformer')();

//get data from database or ...
var dataDatabase = {
    "_id": "5a91c4547886436ed94e6326",
    "firstName": "John",
    "lastName": "Doe",
    "password": "$2a$10$VzJQsmaknGuafqXSfzDWg.zPshX..uY26Yn8X9TJnvjGqHex1FQ7S",
    "role" : {
      "_id" : "5a93080d13592753b1146198",
      "name" : "admin",
      "permission" : 5
    }
};

//transform data
var dataTransformed = fractal(dataDatabase, {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + " " + data.get('lastName');
    },
    "role": {
        "id": "role._id",
        "name": "role.name"
    }
});


console.log(dataTransformed);
```

The expected output
```javascript
{  
   "id": "5a91c4547886436ed94e6326",
   "name": "John Doe",
   "role": {  
      "id": "5a93080d13592753b1146198",
      "name": "admin"
   }
}
```

### Usage with data arrays
```javascript
//import library
var fractal = require('fractal-transformer')();

//get data from database or ...
var dataDatabase = {
    "_id": "5a91c4547886436ed94e6326",
    "firstName": "John",
    "lastName": "Doe",
    "password": "$2a$10$VzJQsmaknGuafqXSfzDWg.zPshX..uY26Yn8X9TJnvjGqHex1FQ7S",
    "role" : {
      "_id" : "5a93080d13592753b1146198",
      "name" : "admin",
      "permission" : 5
    },
    "permissions" : [
      {
        "_id" : "5a9307b413592753b1146197",
        "name" : "create"
      },
      {
        "_id" : "5a93076510c0b653673e7264",
        "name" : "delete"
      }
    ]
};

//transform data
var dataTransformed = fractal(dataDatabase, {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + " " + data.get('lastName');
    },
    "role": {
        "id": "role._id",
        "name": "role.name"
    },
    "permissions": fractal(dataDatabase.permissions, {
        "name_permission": "name"
    })
});

console.log(dataTransformed);
```

The expected output
```javascript
{  
   "id":"5a91c4547886436ed94e6326",
   "name":"John Doe",
   "role":{  
      "id":"5a93080d13592753b1146198",
      "name":"admin"
   },
   "permissions":[  
      {  
         "name_permission":"create"
      },
      {  
         "name_permission":"delete"
      }
   ]
}
```

### Usage when data is a array

```javascript
//import library
var fractal = require('fractal-transformer')();

//get data from database or ...
var dataDatabase = [{
        "_id": "5a91c4547886436ed94e6326",
        "firstName": "John",
        "lastName": "Doe",
        "password": "$2a$10$VzJQsmaknGuafqXSfzDWg.zPshX..uY26Yn8X9TJnvjGqHex1FQ7S",
    },
    {
        "_id": "5a931bd3bac34d6aa90804dc",
        "firstName": "Homero",
        "lastName": "Simpson",
        "password": "$2a$10$B19Xg/peAH.BK4Z1gV/xJ.2OXvm9kO95W89SYzAxYP7GS26i9mOvy",
    }
];

//transform data
var dataTransformed = fractal(dataDatabase, {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + " " + data.get('lastName');
    }
});


console.log(dataTransformed);
```

The expected output
```javascript
[  
   {  
      "id":"5a91c4547886436ed94e6326",
      "name":"John Doe"
   },
   {  
      "id":"5a931bd3bac34d6aa90804dc",
      "name":"Homero Simpson"
   }
]
```

### Usage with config 

create a transformers folder and create a file `dataDatabase.js` in it.
```javascript
module.exports = {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + " " + data.get('lastName');
    }
}
```

```javascript
//import library
var fractal = require('fractal-transformer')();

//get data from database or ...
var dataDatabase = [{
        "_id": "5a91c4547886436ed94e6326",
        "firstName": "John",
        "lastName": "Doe",
        "password": "$2a$10$VzJQsmaknGuafqXSfzDWg.zPshX..uY26Yn8X9TJnvjGqHex1FQ7S",
    },
    {
        "_id": "5a931bd3bac34d6aa90804dc",
        "firstName": "Homero",
        "lastName": "Simpson",
        "password": "$2a$10$B19Xg/peAH.BK4Z1gV/xJ.2OXvm9kO95W89SYzAxYP7GS26i9mOvy",
    }
];

//transform data
var dataTransformed = fractal(dataDatabase,'dataDatabase');


console.log(dataTransformed);
```

The expected output
```javascript
[  
   {  
      "id":"5a91c4547886436ed94e6326",
      "name":"John Doe"
   },
   {  
      "id":"5a931bd3bac34d6aa90804dc",
      "name":"Homero Simpson"
   }
]
```


By default it searches for `dataDatabase.js` in `transformers` folder in the root
of the project.
You can overwrite its location by `transformerDir: 'path/to/dir'`

```javascript
    var fractal = require('fractal-transformer')({
        transformerDir: 'api/transformers'
    });
```
## License

MIT © [Riaz Laskar](https://github.com/riazXrazor/fractal-transformer/blob/master/LICENSE)

