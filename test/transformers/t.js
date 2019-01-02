module.exports = {
    "id": "_id",
    "name": function (data) {
        return data.get('firstName') + ' ' + data.get('lastName')
    },
    "atter": {
        at: "info.arr"
    }
}