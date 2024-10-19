const mysql = require("mysql2")

async function MySQL(){
  const connection = await mysql.createPool({
    uri: "mysql://root:sduedroEguUNdcbzZyLWbRqjoSgiYmPI@junction.proxy.rlwy.net:37617/railway"
  })
  const pool = connection.promise()
  return pool
}

module.exports = MySQL
