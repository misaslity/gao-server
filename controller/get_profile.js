const connection = require("../database")

const get_profile= async (req, res)=> {
    try {
        const {uid }= req.user
        const [rows]= await connection.query("SELECT account, balance, username FROM user WHERE id= ?", [uid])
        
        return res.json({ok: true, data: rows[0]})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}

module.exports= get_profile