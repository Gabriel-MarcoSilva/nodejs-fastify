class AuthController {
    constructor(service) {
        this.service = service
    }

    async register (req) {
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return {code: 400, body: {message: 'All fields are required'}}
        }
        
        try {
            const user = await this.service.register(name, email, password)
            return {code: 200, body: user}
        } catch (error) {
            return {code: 400, body: error.message}
        }
    }

    async login (req) {
        const { email, password } = req.body

        if(!email || !password) throw new Error({message: 'The fields are required'})
        
        try {
            const user = await this.service.login(email, password)
            return {code: 200, body: user}
        } catch (error) {
            return {code: 400, body: error.message}
        }
    }
}

module.exports = AuthController