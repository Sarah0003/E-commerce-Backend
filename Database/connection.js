import mongoose from 'mongoose';

export function connection(){
  mongoose.connect(process.env.DB_ONLINE_CONNECTION)
  .then(()=>console.log("DB connected"))
  .catch((err)=>console.log("Db error",err));
}
