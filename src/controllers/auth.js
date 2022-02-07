const db = require('../db')
const {hash} = require('bcrypt')
const {sign, verify} = require('jsonwebtoken')
const {SECRET} = require('../constants')


exports.getUsers = async (req,res) => {
    try {
        const {rows} = await db.query('select user_id, email, name from users')

        return res.status(200).json({
            success:true,
            users:rows
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.protected = async (req,res) => {
    try {
        return res.status(200).json({
            info:'User is logged in',
            token: req.cookies['token']
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.register = async (req,res) => {
    const {email, password, name} = req.body;
    try {
        const hashedPassword = await hash(password, 10)
        await db.query('insert into users(email, password, name) values ($1, $2, $3)', [email, hashedPassword, name])

        return res.status(201).json({
            success:true,
            message:'The registration was succesfull'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.login = async (req,res) => {
    let user = req.user
    let payload = {
        id:user.user_id,
        email:user.email,
        username:user.username,
    }
    try {
        const token = sign(payload, SECRET)
        
        return res.status(200).cookie('token', token, {httpOnly:true}).json({
            success:true,
            message:'Logged in successfully',
            token: req.cookies['token'],
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.logout = async(req,res) => {
    try {
        return res.status(200).clearCookie('token',{httpOnly:true}).json({
            success:true,
            message:'Logged out succesfully.',
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}


