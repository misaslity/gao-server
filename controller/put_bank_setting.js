const connection = require("../database")

const put_bank_setting= async (req, res)=> {
    try {
        const {accountName, bankName, accountNumber}= req.body
        await connection.query("UPDATE setting SET account_number= ?, account_name= ?, bank_name= ? WHERE id= 1", [accountNumber, accountName, bankName])
        return res.json({ok: true})
    } catch (error) {
        return res.json({ok: false})
    }
}

module.exports= put_bank_setting