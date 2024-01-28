import express from 'express';
import cors from 'cors';
import connectToDatabase from './DataBase/db.js';
import router from './Router/route.js';

const app = express();
const PORT = 8082;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 