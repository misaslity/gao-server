const connection = require("../database")

const get_current_bet_user= async (req, res)=> {
    try {
        const {uid }= req.user
        const {session_id }= req.query
        const [rows]= await connection.query(`SELECT * FROM bet WHERE user_id= ? AND session_id= ?`, [uid, parseInt(session_id) + parseInt(1)])
        console.log(rows)
        return res.json({ok: true, data: rows[0]})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}   

module.exports= get_current_bet_user