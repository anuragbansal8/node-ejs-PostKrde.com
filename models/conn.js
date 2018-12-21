const mongoose=require('mongoose')
const url="mongodb://localhost:27017/postkrde"
mongoose.connect(url)
const db=mongoose.connection
console.log('Connection done with mongoDB!!!')	
module.exports=db
