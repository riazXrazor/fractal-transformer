var fractal = require('../index')({
    transformerDir: 'test/transformers'
});

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

//create transformer and define output properties
var dataTransformed = fractal(dataDatabase, {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + " " + data.get('lastName');
    }
});

//transform data
console.log(dataTransformed);