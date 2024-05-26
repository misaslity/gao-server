const connection = require("../database")

const deposit= async (req, res)=> {
    try {
        const {uid }= req.user
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {amount, name, info }= req.body
        const timeCreated= new Date().toString()
        const timeUpdated= new Date().toString()
        const status= 0
        await connection.query("INSERT INTO deposit_history(user_id, amount, name, note, time_created, time_updated, status, ip) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [uid, amount, name, info, timeCreated, timeUpdated, status, ip])

        return res.json({ok: true, message: "Đã xác nhận"})
        
    } catch (error) {
        console.log(error)
        return res.json({ok: false, message: "Có lỗi xảy ra"})
    }
}

module.exports= deposit