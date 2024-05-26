const connection = require("../database")

const get_setting_bank= async (req, res)=> {
    try {
        const {uid }= req.user
        const [rows]= await connection.query("SELECT * FROM setting WHERE id= ?", [1])
        
        return res.json({ok: true, data: rows[0]})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false})
    }
}

module.exports= get_setting_bank