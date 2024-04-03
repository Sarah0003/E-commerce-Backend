import mongoose, { model } from 'mongoose';
import bcrypt  from 'bcrypt';
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
  },
  phone:String,
   
  role:{
    type:String,
    enums:["Admin","User"],
    default:"User"
  },
  password:{
    type:String,
    required:true,
  },
  changePasswordAt:Date,
  // loggedOutAt: Date,

  isActive:{
    type:Boolean,
    default:true
  },
  wishList:[{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"Product"
  }],
  isBlocked:{
    type:Boolean,
    default:false
  },
  isVerified:{
    type:Boolean,
    default:false
  },
},{
  timestamps:true
});

userSchema.pre("save",function(){
  console.log(this);
  this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALT_ROUNDS))
})

// userSchema.pre("findOneAndUpdate",function(){
//   console.log(this);
  
//   this._update.password=bcrypt.hashSync(this._update.password,parseInt(process.env.SALT_ROUNDS))
// })

userSchema.pre("findOneAndUpdate", async function(next) {
    const update = this.getUpdate();
    if (update.password) {
      update.password = await bcrypt.hash(update.password, parseInt(process.env.SALT_ROUNDS));
    }
    next();

});


const userModel=model("User",userSchema);

export default userModel;


