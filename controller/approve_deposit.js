const connection = require("../database")

const approve_deposit= async (req, res)=> {
    let conn;
    try {
        conn = await connection.getConnection();
        const {uid }= req.user
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const {amount, name, info, id, user_id }= req.body
        const realAmount= parseInt(amount) * 1000
        await conn.beginTransaction()
        await conn.query("UPDATE deposit_history SET status= 1 WHERE id= ?", [id])
        await conn.query("UPDATE user SET balance = balance + ? WHERE id = ?", [realAmount, user_id]);
        await conn.commit();

        return res.json({ok: true, message: "Đã xác nhận"})
        
    } catch (error) {
        console.log(error)
        await conn.rollback();
        return res.json({ok: false, message: "Có lỗi xảy ra"})
    }
}

module.exports= approve_deposit