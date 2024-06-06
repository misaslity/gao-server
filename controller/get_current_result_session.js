const connection = require("../database")

const get_current_result_session= async (req, res)=> {
    try {
        const [rows]= await connection.query("SELECT * FROM session ORDER BY id DESC LIMIT 2")
        return res.json({ok: true, data: rows[1]})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}

module.exports= get_current_result_session