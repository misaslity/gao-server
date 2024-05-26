const connection = require("../database")

const delete_user_admin = async (req, res)=> {
    try {
        const {id}= req.body
        await connection.query("DELETE FROM user WHERE id= ?", [id])
        return res.json({ok: true, message: "Đã xoá người dùng thành công"})
    } catch (error) {
        return res.json({ok: false, message: "Có lỗi bất ngờ xảy ra ở server"})
    }
}

module.exports= delete_user_admin 