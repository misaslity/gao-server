const connection = require("../database")
const bcrypt = require('bcryptjs');

const update_user_password_admin= async (req, res)=> {
    try {
        const {password, id}= req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.query("UPDATE user SET password= ? WHERE id= ?", [hashedPassword, id])
        return res.json({ok: true, message: "Cập nhật mật khẩu người dùng thành công"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, message: "Có lỗi bất ngờ xảy ra từ server"})
    }
}

module.exports= update_user_password_admin