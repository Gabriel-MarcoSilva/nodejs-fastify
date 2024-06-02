const { authController, bookingController, authService } = require("../instancias")

const authorizationToken = { //verifica se a requisição tem o token
    preHandler: async (req, res) => {
        const token = req.headers.authorization?.replace('/Bearer /', '')
        if (!token) res.code(401).send({ message: 'Unauthorized: token missing' })

        const user = await authService.verifyToken(token)
        if (!user) res.code(404).send({ message: 'Unauthorized: invalid token' })

        req.user = user
    }
}

function setupRoutes(app) {

    app.get('/hello', (req, res) => {
        res.send({ message: 'hello world' })
    })

    app.get('/api/bookings', authorizationToken, async (req, res) => { //todos 
        const { code, body } = await bookingController.index(req)
        res.code(code).send(body)
    })

    app.post('/api/bookings', authorizationToken, async (req, res) => {
        const { code, body } = await bookingController.cadBooking(req)
        res.code(code).send(body)
    })

    app.post('/api/auth/register', async (req, res) => {
        const { code, body } = await authController.register(req)
        res.code(code).send(body)
    })

    app.post('/api/auth/login', async (req, res) => {
        const { code, body } = await authController.login(req)
        res.code(code).send(body)
    })
}

module.exports = { setupRoutes }