const app = require("./config/config.js")
require("./routes.js")

app.listen(3000, (err)=>{
  try{
    if(!err){
      console.log("Server is running on port 3000")
    }
  } catch(err){
    console.error("Error starting server", err)
  }
})