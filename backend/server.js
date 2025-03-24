import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const AUDIUS_API = 'https://discoveryprovider.audius.co/v1';

app.get('/musify/trending',async(req,res)=>{
    try {
        const response=await axios.get(`${AUDIUS_API}/tracks/trending?app_name=Musify`);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));


app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
