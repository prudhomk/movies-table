import express from 'express';
import cors from 'cors';
import movieController from './lib/controllers/movie.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());


app.use('/movies', movieController);

export default app;
