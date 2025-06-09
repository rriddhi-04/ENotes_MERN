const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [/\.onrender\.com$/, /\.render\.com$/] // Allow all onrender.com and render.com subdomains
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'ENotes API is running!', status: 'healthy' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
}).catch(err=>console.log(err))