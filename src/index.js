const express = require('express')
const app = express()
const {PORT, CLIENT_URL} = require('./constants')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const cors = require('cors')

require('./middlewares/passport-middleware')

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:CLIENT_URL,credentials:true}))
app.use(passport.initialize())

const authRoutes = require('./routes/auth')
const sessionRoutes = require('./routes/session')

app.use('/api',authRoutes)
app.use('/api/authorized',sessionRoutes)

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`)
        })
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
    }
}

appStart()
