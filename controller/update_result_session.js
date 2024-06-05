const connection = require("../database")

const update_result_session= async (req, res)=> {
    try {
        const {result, session_id}= req.body
        await connection.query("UPDATE session SET result= ? WHERE id= ?", [result, session_id])
        return res.json({ok: true, message: "Cập nhật kết quả thành công"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, message: "Có lỗi bất ngờ xảy ra từ server"})
    }
}

module.exports= update_result_session