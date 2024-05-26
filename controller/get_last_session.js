const connection = require("../database")

const get_last_session= async (req, res)=> {
    try {
        const {uid }= req.user
        const [rows]= await connection.query("SELECT result, number, session_id AS id FROM session ORDER BY id DESC LIMIT 5")
        
        return res.json({ok: true, data: rows})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}

module.exports= get_last_session