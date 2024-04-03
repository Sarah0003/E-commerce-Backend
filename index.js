import 'dotenv/config.js'
import express from 'express'
import { connection } from './Database/connection.js';
import { allRoutes } from './src/modules/routes.js';
import { AppError } from './src/utils/AppError.js';
import cors from 'cors'


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use("/uploads",express.static("uploads"))

connection();

allRoutes(app);


// app.use("*",(req,res,next)=>{
//   // next(new Error(`Invalid url ${req.originalUrl}`))
//   next(new AppError(`Invalid url`,404))

//  })


app.use((err,req,res,next)=>{
  console.error(err);
  res.status(err.statusCode).json({message:err.message,stack:err.stack});
  // res.status(500).json({err:err.message,stack:err.stack});

})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))
