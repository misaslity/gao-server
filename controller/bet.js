const connection = require("../database")

const postbet= async (req, res)=> {
    try {
        const {uid }= req.user
        const {val1, val2, session_id, betMoney }= req.body
        const timeCreated= new Date().toString()
        const [rows]= await connection.query("SELECT balance FROM user WHERE id= ?", [uid])
        const userBalance= parseInt(rows[0].balance)
        const realBetMoney= parseInt(betMoney)
        console.log(userBalance, realBetMoney)
        if(userBalance < realBetMoney) {
            return res.json({ok: false, message: "Số dư của bạn nhỏ hơn số tiền đặt cược, vui lòng nạp thêm tiền hoặc chỉnh sửa số tiền cược phù hợp"})
        }
        await connection.query("INSERT INTO bet(user_id, val1, val2, session_id, betMoney, time_created) VALUES(?, ?, ?, ?, ?, ?)", [uid, val1, val2, parseInt(session_id) + parseInt(1), betMoney, timeCreated])
        return res.json({ok: true, message: "Đã đặt cược thành công."})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false, message: "Có lỗi bất ngờ xảy ra."})
    }
}

module.exports= postbet