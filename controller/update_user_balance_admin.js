const connection = require("../database")

const update_user_balance_admin = async (req, res)=> {
    try {
        const {balance, id}= req.body
        const balanceNumber = parseInt(balance)
        await connection.query("UPDATE user SET balance= ? WHERE id= ?", [balanceNumber, id])
        return res.json({ok: true, message: "Cập nhật số dư người dùng thành công"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, message: "Có lỗi bất ngờ xảy ra từ server"})
    }
}

module.exports= update_user_balance_admin 