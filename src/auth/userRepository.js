const db = require('../database')
const User = require('./User')

class UserRepository {
    constructor() {
        this.db = db
    }

    async findByEmail(email) {
        // return this.users.find((user) => email === user.email)

        //query q encontra o email
        const storedUser = await this.db.oneOrNone("SELECT * FROM Users WHERE email = $1", email) //encontra o usuário ou não
        return storedUser ? new User(storedUser) : null

    }

    async save(user) {
        // this.users.push(user)
        await this.db.none("INSERT INTO Users (id, name, email, password) VALUES ($1, $2, $3, $4)", [
            user.id,
            user.name,
            user.email,
            user.password
        ])
    }
}

module.exports = UserRepository