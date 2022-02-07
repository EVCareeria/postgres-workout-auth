const db = require('../db')
const { verify} = require('jsonwebtoken')
const {SECRET} = require('../constants')


exports.addExercise = async(req,res) => {
    const {exercise, sets, reps, weight, session} = req.body;
    if(!exercise || !sets || !reps || !weight || !session) {
        return res.status(500).json({
            error: "Something went wrong"
        })
    }
    try {
        await db.query('insert into exercise(exercise, sets, reps, weight, e_session) values ($1, $2, $3, $4, $5)',
         [exercise, sets, reps, weight, session])

        return res.status(201).json({
            success:true,
            message:'Exercise was added succesfully'
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        })
    }
}

exports.addSession = async(req,res) => {
    const {focus} = req.body;
    const decoded = verify(req.cookies['token'], SECRET)
    const userId = decoded.id
        try {
            await db.query('insert into session(focus, s_login) values ($1, $2)',
            [focus, userId])

            return res.status(200).json({session: focus + " Added"})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                error: error.message
            })
        }
}

exports.getSessions = async(req,res) => {
    const decoded = verify(req.cookies['token'], SECRET)
    const userId = decoded.id
    
    try {
        const {rows} = await db.query('select s_id, focus, s_date, s_login from session where s_login=($1)', [
            userId
        ])

        return res.status(200).json({
            success:true,
            sessions:rows
        })
    } catch (error) {
        console.log(error.message)
    }
    
}
