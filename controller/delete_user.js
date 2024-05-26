const connection = require("../database")

const delete_user = async (req, res)=> {
    try {
        const {uid }= req.user
        await connection.query("DELETE FROM userWHERE id= ", [uid])
        return res.json({ok: true})
    } catch (error) {
        return res.json({ok: false})
    }
}

module.exports= delete_user 