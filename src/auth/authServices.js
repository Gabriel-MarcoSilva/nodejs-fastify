const User = require("./User")
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthService {
    constructor ( repository ) {
        this.repository = repository
    }

    register (name, email, password) {
        
        const userExists = this.repository.findByEmail(email)
        if (userExists) {
            throw new Error('This emai was already used by another user')
        }

        const newuser = new User({ name, email, password })
        newuser.password = bcrypt.hashSync(newuser.password, 10)
        this.repository.save(newuser)
        return newuser
    }

    login (email, password) {

        const user = this.repository.findByEmail(email)
        if (!user) throw new Error('User not found') 
        
        const isSamePassword = bcrypt.compareSync(password, user.password)
        if (!isSamePassword) throw new Error('Wrong password')

        // autenticação por token
        user.password = undefined
        const token = jwt.sign({ id: user.id, email: user.email }, "segredo", { expiresIn: '1d' })
        return {token, user}
    }

    verifyToken(token) {
        const decodedToken = jwt.verify(token, "segredo")
        const user = this.repository.findByEmail(decodedToken.email)
        return user
    }
}

module.exports = AuthService