const connection = require("../database")

const reject_withdraw= async (req, res)=> {
    try {
        const {uid }= req.user
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {amount, name, info, id }= req.body
        await connection.query("UPDATE withdraw_history SET status= 2 WHERE id= ?", [id])

        return res.json({ok: true, message: "Đã xác nhận"})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false, message: "Có lỗi xảy ra"})
    }
}

module.exports= reject_withdraw