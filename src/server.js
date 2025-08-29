import express from 'express'; // imports
import cors from 'cors';
import 'dotenv/config';
import userRoutes from './routes/user.routes.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'API está no ar' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`servidor rodando na porta ${port}`);
});
