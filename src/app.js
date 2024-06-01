const fastify = require('fastify')
const BookingController = require('./bookings/bookingController')
const BookingRepository = require('./bookings/bookingRepository')
const BookingSevice = require('./bookings/bookingServices')
const AuthService = require('./auth/authServices')
const UserRepository = require('./auth/userRepository')
const AuthController = require('./auth/authController')

const app = fastify({ logger: true })

const bookingRepository = new BookingRepository()
const bookingService = new BookingSevice(bookingRepository)
const bookingController = new BookingController(bookingService)
const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService)

const authorizationToken = { //verifica se a requisição tem o token
    preHandler: (req, res, done) => {
        const token = req.headers.authorization?.replace('/Bearer /', '')
        if (!token) res.code(401).send({ message: 'Unauthorized: token missing' })

        const user = authService.verifyToken(token)
        if (!user) res.code(404).send({ message: 'Unauthorized: invalid token' })

        req.user = user
        done()
    }
}

app.get('/hello', (req, res) => {
    res.send({ message: 'hello world' })
})

app.get('/api/bookings', authorizationToken, (req, res) => { //todos 
    const { code, body } = bookingController.index(req)
    res.code(code).send(body)
})

app.post('/api/bookings', authorizationToken, (req, res) => {
    const { code, body } = bookingController.cadBooking(req)
    res.code(code).send(body)
})

app.post('/api/auth/register', (req, res) => {
    const { code, body } = authController.register(req)
    res.code(code).send(body)
})

app.post('/api/auth/login', (req, res) => {
    const { code, body } = authController.login(req)
    res.code(code).send(body)
})

module.exports = app