const { v4 } = require("uuid")

class User {
    constructor ({ id, name, email, password }) {
        this.id = id ?? v4()
        this.name = name
        this.email = email
        this.password = password
    }
}

module.exports = User