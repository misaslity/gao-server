const connection = require("../database")

const delete_withdraw= async (req, res)=> {
    try {
        const {uid }= req.user
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {amount, name, info, id }= req.body
        await connection.query("DELETE FROM withdraw_history WHERE id= ?", [id])

        return res.json({ok: true, message: "Đã xác nhận"})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false, message: "Có lỗi xảy ra"})
    }
}

module.exports= delete_withdraw