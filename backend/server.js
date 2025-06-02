const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(5000, ()=> console.log('Server running at 5000'))
}).catch(err=>console.log(err))
