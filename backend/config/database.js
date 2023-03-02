const mongoose = require("mongoose")
mongoose.set('strictQuery', false)

async function startDB(){
    await mongoose.connect(process.env.DB_URI + process.env.DB_NAME)
}
  
module.exports = startDB