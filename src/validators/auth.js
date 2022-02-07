const {check} = require('express-validator')
const db = require('../db')
const {compare} = require('bcrypt')

const password = check('password').isLength({min:6, max:15}).withMessage('Password has to be between 6 and 15 characters.')

const email = check('email').isEmail().withMessage('Must be a valid email.')

const emailExists = check('email').custom(async(value) => {
    const {rows} = await db.query('select * from users where email = $1', [value])

    if(rows.length > 0) {
        throw new Error('Email is already registered.')
    }
})

const loginFieldCheck = check('email').custom(async(value, {req}) => {
    const user = await db.query('select * from users  where email = $1', [value])
    if(!user.rows.length) {
        throw new Error('Email does not exists.')
    }

    const validPassword = await compare(req.body.password, user.rows[0].password)

    if(!validPassword) {
        throw new Error('Wrong password')
    }

    req.user = user.rows[0]
})

module.exports = {
    registerValidation: [password, email, emailExists],
    loginValidation: [loginFieldCheck]
}
