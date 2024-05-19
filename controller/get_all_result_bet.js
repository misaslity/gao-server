const connection = require("../database")

const get_all_result_bet = async (req, res)=> {
    try {
        const [rows]= await connection.query(`SELECT * FROM bet INNER JOIN user ON bet.user_id = user.id INNER JOIN session ON session.session_id = bet.session_id`)
        console.log(rows)
        return res.json({ok: true, data: rows})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}   

module.exports= get_all_result_bet 