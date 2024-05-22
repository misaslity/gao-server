const connection = require("../database")

const postbet= async (req, res)=> {
    try {
        const {uid }= req.user
        const {val1, val2, session_id }= req.body
        const timeCreated= new Date().toString()
        await connection.query("INSERT INTO bet(user_id, val1, val2, session_id, time_created) VALUES(?, ?, ?, ?, ?)", [uid, val1, val2, parseInt(session_id) + parseInt(1), timeCreated])
        return res.json({ok: true})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}

module.exports= postbet