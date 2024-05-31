const connection = require("../database")

const test3 = async (req, res) => {
    const [rows]= await connection.query("SELECT COUNT(*) FROM districts")
    return res.json({data: rows[0]})
}

module.exports= test3